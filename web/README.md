## Setup MVP boilerplate

```

// init nextjs project
yarn create next-app mvp-next    


// add typescript
yarn add typescript @types/node @types/react -D


// add tailwind
yarn add tailwindcss postcss autoprefixer -D

// add tailwind global styles (create a global.css file):
@tailwind base;
@tailwind components;
@tailwind utilities;

// setup tailwind
npx tailwind init -p

// add paths to pages/components into tailwind.config.js
// './src/components/**/*.tsx',
// './src/page/**/*.tsx',

// add tailwind forms plugin, and add into plugins at tailwind.config.js
yarn add @tailwindcss/forms -D
require('@tailwindcss/forms'), // tailwind.config.js


// add auth with next auth
// yarn add next-auth   


// config prisma
yarn add prisma -D 
yarn add @prisma/client
yarn prisma init

// create the models in schema.prisma file
//after, generate migrations:

yarn prisma migrate dev

// open prisma studio to see data
yarn prisma studio

// create new db into planetscale
// login at pscale CLI

pscale auth login
pscale branch create <database-name> initial-setup
pscale branch create <database-name> shadow

// connect into databases
pscale connect <database-name> initial-setup --port 3309
pscale connect <database-name> shadow --port 3310



// after that, run migration exactly like this:
npx prisma migrate dev --name init 

//If all goes well, we should see a success message in our terminal, as well as a new migrations folder in our project. Now, it's time to open a deploy-request to bring these changes over to our main database branch.

pscale deploy-request create <database-name> <deploy-request-name> // send a name for "commit" a deploy request

// if database is not em production, set this in planetscale
// PS.: Production branches are protected from direct schema changes, allow non-blocking deploy requests for schema changes with branches, utilize automated backups, and are made highly available.

click in promote branch to production into app.planetscale.com dashboard


//Woohoo! We've just created our first PlanetScale deploy request. If we head back over to our dashboard and navigate to our deploy requests tab, we should see an open deploy request for our schema changes.

//Click on the Deploy changes button and if all goes well, our changes will be deployed to the main database branch!


//Now that we have our main branch updated, go ahead and shut down both terminals that have been connected to PlanetScale, and let's rerun a command to open a connection to our main branch on port 3309, so we can add a Post record to our database

// PS: this will connect into main db branch (production database)
pscale connect <database-name> main --port 3309  








```