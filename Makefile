# Makefile for building and releasing the addon with the iframe
#
#
# Most important tasks:
#
# "make release" revs the version, pushes the new version tag to github,
#                zips a new .xpi, and pushes it to Jared's people acct at:
#                https://people.mozilla.org/~jhirsch/3f14d2b2a3637801ad4ff939ac95d275/universal-search-addon.xpi
# "make build" fetches updates to the iframe and rebuilds that code.
#
#
# If you hack on this file, a few things to note about make:
#   1. use && to prevent trying to do something if the preceding step failed
#   2. each line runs in a separate subshell, so to 'cd foo', use ; or && to
#      join the chdir with the stuff you do inside that dir
#   3. make expects real tabs, not spaces, so make sure your editor detects
#      and does the right thing with Makefiles (if you edit this file)
#   4. .PHONY is used to tell make to ignore filenames; otherwise 'make build'
#      will do nothing if a file named 'build' is found in the root dir. See also
#      https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
#
# Some bits borrowed from
#   https://andreypopp.com/posts/2013-05-16-makefile-recipes-for-node-js.html

.PHONY: build release version-patch release-github xpi push

# build mostly means updating and building the iframe.
#
# - pull updates via git subtree
# - chdir and run updates / build steps as needed
build:
	git subtree pull --prefix iframe https://github.com/mozilla/universal-search-content.git ampersand-refactor
	cd iframe && npm install && npm run build

# release steps:
# - bump semver patch level using npm, mark as git tag
# - push to github
# - build the xpi file
# - push to people
release: version-patch release-github xpi push

version-patch:
	npm version patch -m "Bump version to %s"

release-github:
	git push --tags origin HEAD:master

xpi:
	rm -rf dist && \
	mkdir dist && \
	zip dist/universal-search-addon.xpi *

push:
	# about the obscure dirname: md5 -s "everything is awesome" = 3f14d2b2a3637801ad4ff939ac95d275
	# obviously this step fails unless you're jared or have his private key
	scp dist/universal-search-addon.xpi jhirsch@people.mozilla.org:public_html/3f14d2b2a3637801ad4ff939ac95d275/
