**this project is in it's initial phases, so please keep any cool ideas or formatting fixes for yourself until we hit a stable version**

# R6DB Desktop [![Build Status](https://dev.azure.com/R6DB/app/_apis/build/status/r6db.app)](https://dev.azure.com/R6DB/app/_build/latest?definitionId=2)

a rainbow six stat tracker app.

## feature ideas:

-   [ ] per-match tracking (as far as possible)
-   [ ] timeline view of own profile
-   [ ] personal stats (all-time and/or timeframe)

### goals:

-   tracking your own stats often and accurately
-   host _everything_ locally
-   allow for management of local data

### non-goals:

-   leaderboard
-   tracking everyone you ever came across
-   plugins

## How to run

-   install node & yarn
-   install all build tools needed for node-gyp (windows users can use [this](https://www.npmjs.com/package/windows-build-tools))
-   run `yarn global add lerna` to install the [lerna monorepo tool](https://lernajs.io/)
-   run `lerna bootstrap` to install all dependencies and crosslink packages
-   run `lerna run build` to build all packages. You might want to ignore the desktop app for that though: `lerna run build --ignore @r6db/desktop`

### in packages/desktop:

-   `yarn build` compiles all files into the `build` directory
-   `yarn electron` runs the latest build
-   `yarn start` build and then run

### in packages/core:

-   TODO

### in packages/r6api:

-   TODO
