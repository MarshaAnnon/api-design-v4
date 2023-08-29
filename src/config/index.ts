import merge from 'lodash/merge';

//make sure NODE_ENV is set to 'development' if it doesn't exist already
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConfig

if (stage === 'production') {
  envConfig = require('./prod').default; //because you're using require and the prod.ts file is exporting a default object you need to access the default property of the object to get the object itself.
} else if ( stage === 'testing') {
  envConfig = require('./testing').default;
} else {    
    envConfig = require('./local').default;
}

const defaultConfig = {
    //all the shared config goes here
    stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DB_URL,
    logging: false,
}

export default merge(defaultConfig, envConfig); //merge the defaultConfig with the envConfig and export it as the default export of this file.

// It is highly recommended that your application be driven by some type of configuration that's bound to environment variables so it remains dynamic

// A single-threaded language is a language that uses only one thread. In other words, it executes one thing at a time. JavaScript is single-threaded, so it executes the current line of code before moving to the next.