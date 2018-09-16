**this project is in it's initial phases, so please keep any cool ideas or formatting fixes for yourself until we hit a stable version**

# R6DB Desktop [![Build Status](https://dev.azure.com/R6DB/app/_apis/build/status/r6db.app)](https://dev.azure.com/R6DB/app/_build/latest?definitionId=2)

a rainbow six stat tracker app.

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
-   run `yarn` in the project directory to install all dependencies
-   run any of the other scripts

    -   `yarn build` compiles all files into the `build` directory
    -   `yarn electron` runs the latest build
    -   `yarn start` build and then run
    -   `yarn migration` generate a new migration containing all pending schema changes (taken from entities dir). Check `src/main/db/README.md` for more info
