# universal-search-addon

Universal Search desktop experiments in addon format

[![Build Status](https://travis-ci.org/mozilla/universal-search-addon.svg?branch=master)](https://travis-ci.org/mozilla/universal-search-addon)

## Developer setup



### Basic addon environment
These steps come from the [extension dev page](https://developer.mozilla.org/en-US/Add-ons/Setting_up_extension_development_environment) on MDN. Look there for lots more detail.

1. Make some changes to your Firefox profile, or create a separate profile.
  - It's nice to create a separate addon profile, but not necessary.
  - In either case, there are some prefs used for addon development; you can easily add them by installing the [devprefs addon](https://addons.mozilla.org/en-US/firefox/addon/devprefs/).
1. Create a proxy file to link your local addon code to your addon profile.
  - The proxy file is just a file inside your addon profile's `extensions` directory, where the file name matches the addon's name (in our case, `universal-search-addon@mozilla.com`), and the file contains the absolute path to the code, with a trailing slash.
  - Example:
    - proxy file: `/path/to/ff/Profiles/6h6ygzlo.addon-dev/extensions/universal-search-addon@mozilla.com`
    - proxy file contents: `/Users/jhirsch/codez/github/mozilla-universal-search-addon/src/`
1. When you want to hack on the addon, start Firefox from the command line:
  - `/Applications/Firefox.app/Contents/MacOS/firefox -purgecaches -P "addon-dev"`
    - `-P "addon-dev"` specifies which profile to use
    - `-purgecaches` stops FF from caching files, so you can instantly (?) see changes

### Setup specific to this addon
1. If you're hacking on the [iframe](https://github.com/mozilla/universal-search-content), then configure your profile to use a local copy:
  - Set these two prefs in about:config:
  - `services.universalSearch.frameURL`: the complete iframe URL
    - default is 'https://d1fnkpeapwua2i.cloudfront.net/index.html'
  - `services.universalSearch.baseURL`: the iframe's base URL
    - default is 'https://d1fnkpeapwua2i.cloudfront.net'
1. The first time you use a local iframe, you'll probably be serving it from `https://localhost:8080/`. You will get a security warning, it'll look something like this: ![](https://www.dropbox.com/s/9ieyvpimtfkmqo4/Screenshot%202015-07-21%2014.52.10.png?dl=0&raw=true)
To work around this:
  - Surf to the iframe URL (**the enter key won't work**. You will have to click the Go Button, the little right arrow at the edge of the address bar)
  - Once you load the page, add a security exception for the self-signed cert provided by the local content server.
1. Restart the browser, and you're in business.

## Release process:
  1. Manually bump the version number in `src/install.rdf` and `src/update.rdf`.
  1. Bump the version number in package.json using `npm version patch`. This will generate a git tag, too.
  1. Zip up a new addon: `gulp build`.
  1. Release the addon to people: `scp dist/addon.xpi jhirsch@people.mozilla.org:public_html/universal-search-addon/addon.xpi`
  1. Release the src/update.rdf file to people: `scp src/update.rdf jhirsch@people.mozilla.org:public_html/universal-search-addon/update.rdf`
  1. Probably email the universal-search list?

## Useful Snippets

#### Force the popup to stay open
Note: By design, this only works on one window at a time.
  - Enable & open the Browser Toolkit (see [MDN docs](https://developer.mozilla.org/en-US/docs/Tools/Browser_Toolbox#Enabling_the_Browser_Toolbox), it's easy)
  - At the console, type: `window.US.popup.isPinned = true`
  - Next time the popup opens, it'll stay open.
  - Set `window.US.popup.isPinned` to `false` when you're done - or just close the window.
  - Note: the Browser Toolkit slows performance down a lot. Close it if you don't need to actively debug stuff, and the iframe will be much snappier.
