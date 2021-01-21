# node-website-template
Use this template to initialize your MongoDB, Express, and Node.js website with a basic structure and starter code stylized with Tailwind CSS.

*Work In Progress*

## Installation Details
Download Node: https://nodejs.org/en/download/
Download MongoDB: https://www.mongodb.com/try/download/community  
Run `npm install` in the root directory to install packages.  
Run `npm run build` to compile CSS and Javascript from the `src` folder.  
Run `npm run build:css` to compile Tailwind CSS from the `src` folder.  
Run `npm run build:js` to compile (w/ browserify) JavaScript libraries from the `src` folder.  
Create a `.env` file to hold environment variables. ([dotenv module](https://www.npmjs.com/package/dotenv))
1. The `dist` directory contains the front-end.
2. The `models` directory contains Mongoose models.
3. The `routes` directory contains routes for endpoints and API calls.
4. The `src` directory contains pre-compiled CSS and JS that is to be bundled into front-end (`dist`) using the
   scripts mentioned above in the Installation Details.
5. The `views` directory contains the ejs to be rendered by Express.

## Usage/Workflow Details
1. Ensure that your MongoDB server is running locally for database functionality. (MongoDB Compass)  
2. Run `nodemon` in your terminal while testing to automatically refresh your back-end after editing it.  
3. Edit CSS in `src/style.css` and compile it with `npm run build:css` to update `dist/styles/style.css`.
4. Create front-end by creating HTML pages in the `views` directory.
5. Work on back-end by editing the routes and `index.js`.

## Current Release Details
**Tailwind CSS** v2.0.2  
**Bootstrap Icons** v1.3.0

### Packages Included
* bcrypt - encryption
* body-parser - essential for express
* dotenv - environment variables
* dompurify & jsdom - sanitization
* ejs - template engine for server data access
* express - essential
* jquery - dynamic page elements
* mongoose - database functionality
* nodemon - development quality of life
* serve-favicon - favicon functionality
* tailwindcss - front-end
 
### Supplemental Ease of Access Modules Included
* goodies - variety of functions for different purposes (ex: encrypt() function)

## Future Release Plans
* More detailed starter code
* Additional example pages
* More features in 'goodies' module
* Complete JSDoc for custom module
* Template for sign up and log in pages?

## Additional Resources
Google JavaScript Style Guide: https://google.github.io/styleguide/jsguide.html  
Tailwind CSS Docs: https://tailwindcss.com/docs  
Bootstrap Icons: https://icons.getbootstrap.com/#usage  
Express 4.x API Docs: https://expressjs.com/en/4x/api.html  
Mongoose (MongoDB) Docs: https://mongoosejs.com/docs/api.html  
Can I Use... - Browser support tables for HTML5, CSS3, etc: https://caniuse.com  
Placeholder.com - Free Image Placeholder Service: https://placeholder.com  
SRI Hash Generator: https://www.srihash.org