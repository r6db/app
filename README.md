**this project is in it's initial phases, so please keep any cool ideas or formatting fixes for yourself until we hit a stable version**

# R6DB Desktop [![Build Status](https://travis-ci.org/r6db/app.svg?branch=master)](https://travis-ci.org/r6db/app)

a rainbow six stat tracker app.  
this is set up as monorepo. please check the readmes of the individual packages for more info.

## feature ideas:

-   [ ] timeline view of own profile
-   [ ] searching for other players and seeing total stats
-   [ ] 'following' people to update those profiles regularly
-   [ ] 'recently played with' list
-   [ ] api to allow integration with other tools

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
-   run `yarn` in the project directory to install all
-   run any of the other scripts

    -   `yarn build` compiles all files into the `build` directory
    -   `yarn electron` runs the latest build
    -   `yarn start` build and then run
