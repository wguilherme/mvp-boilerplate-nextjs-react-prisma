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

```