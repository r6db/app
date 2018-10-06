**do not touch anthing in `migrations`. these files are auto-generated.**

## Create a new Entity:

-   create file in entities and export the class.
-   run `yarn migration` to generate a migration matching the new entity.
-   (optional) rename the Migration and its exported class to something more telling
-   run the app. this runs the migration and ensures that new migrations don't contain duplicate code

## DB locations

in `NODE_ENV=development`, we'll use a file in the project root, called `dev.sqlite`.
We'll also use this db to generate migrations against its schema.

for `NODE_ENV=production`, the db is stored in `~/Documents/r6db/data.sqlite`. This must NOT be touched during development, to ensure that this and the `dev.sqlite` are in sync with each other.
