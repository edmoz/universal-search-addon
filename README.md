# universal-search-addon
universal search desktop experiments in addon format

TODO:
  - we just added the iframe repo as a git subtree under the /iframe dir.
    this means it looks like it's part of this repo, but it's not.
    - use `make build` to pull down updates.
    - be careful not to commit changes to the iframe repo into this repo.
  - we also added `make release` to rev the version, push a tag to github,
    rebuild the .xpi, and push the result to a special spot on people.m.o.
  - TODO: insert all this stuff into the docs. Sorry, dear reader.

Installation / how to hack on this?
- set up https on your local machine
  - here's a gist with how I got this working (yosemite / built-in apache): https://gist.github.com/6a68/40b5eda14c82a25e253b
- add a proxy file to the FF profile you will use for addon development
  - See MDN for more: https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment#Firefox_extension_proxy_file
- major TODO: the iframe path needs to be specified using prefs, but using https makes this a bit of a headache.
  - I'm (Jared) currently using a local file with all the scripts/styles inlined, to avoid setting up a virtualhost.
    That's the hardcoded localhost path inside lib/ui/Popup.
