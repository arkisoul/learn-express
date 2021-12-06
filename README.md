# Express Learnings

## Routing
To manage different end points/path in the application

### Problem statement
- Create an express app.
    - Create a folder and init a npm project.
    - Install express
    - Create a express app
    - Listen on port 3000
- Create below routes with app['method'] (method = GET, POST, PUT, DELETE, ALL)
    - GET Route "/" => response = A welcome page of your choice
    - GET Route "/test" => response - A test string of your choice
- Create below routes with router
    - GET Route "/products" => response = product list
    - POST Route "/products" => response = product created

## Middleware
In general = request => route => (n * middleware)? => route handler (method/function) => response
                                    => response
                                        
No middleware = request => route => route handler (method/function) => response
One middleware = request => route => middleware => route handler (method/function) => response
Two middleware = request => route => middleware => middleware => route handler (method/function) => response
Four middleware = request => route => middleware => middleware => middleware => middleware => route handler (method/function) => response

Types of middlewares
- Based on origin
    - Custom middleware
    - Third party middleware

- How we are applying
    - application middleware
    - route middleware

Common packages that provides middleware features used in express application
body-parser
cookie-parser
multer
morgan
passport

### Problem Statement
Extend the express application created in the previous assignment.

1. Create route POST /users to create a new user. Use const users = [] for managing the data. Receive data in request body. Return newly created user in response as json format [like](#example-json-response).
2. Create route GET /users to get users list. Return newly created user in response as json format [like](#example-json-response).
3. Create route PUT /users/:userId to update user based on userId. Receive data in request body. Return newly created user in response as json format [like](#example-json-response).
4. Create route DELETE /users/:userId to delete user based on userId. Return newly created user in response as json format [like](#example-json-response).
5. Use body-parser package for parsing request data.
6. Create a middleware for validating the user data.

### User structure
```yaml
{
    id: number | required,
    name: string | required,
    phone: string
}
```

### Example json response
```yaml
{
    status: "success" or "error",
    message: "A relevant message",
    data: users list if there is data
    error: if there is an error else null
}
```

## View Setup
Setup express application for rending views using a view engine.
```javascript
const express = require('express')
const path = require('path')
const app = express();

// set view engine
app.set('views', path.join(__dirname, "views"))
// path.join(__dirname, "views") = path to view files base folder
app.set('view engine', 'pug');
/** some common view engine used with expressjs
 * pug or jade
 * ejs
 * haml
*/

// set static file serving
app.use(express.static(path.join(__dirname, "public")))
// path.join(__dirname, "public") = path to static files base folder
```

### Problem Statement
Create a static web application with some pages.
1. Home page route => GET / or/and GET /home
2. About page route => GET /about
3. Contact page route => GET /contact
4. Blogs page route => GET /blogs

Note: 
- All these pages should have a navigation bar using that a user should be able to route between these pages.
- Keep some static content on all these pages.

## Authentication & Authorization
### Authentication
    Authentication is the process to identify the user. Uses credentials i.e. username and password to validate and identify the user.

### Authorization
    Authorization is the process to know an authenticated users' access to the system.

## File Handling
To handle the files that are coming in the request, need to handle multipart/form-data. To parse multipart/form-data, a third-party package is applied. There are serveral packages available for this purpose. We are using multer for our use case.

### Multer
    ```javascript
        require("multer")().none()
        //        or
        const multer = require("multer")
        const multerObject = multer()
        multerObject.none()
    ```
    - none => it only parses the text fields in a multipart/form-data request
        ex: require("multer")().none()
    - single => it parses a single field with single file as payload
        ex: require("multer")().single("fieldname")
    - array => it parses a single field with multiple files as payload
        ex: require("multer")().array("fieldname", maxCount)
    - fields => it parses multiple fields with single or multiple files as payload
        ex: require("multer")().array([{name: "fieldname1", maxCount: 1}, {name: "fieldname12, maxCount: 5}, {name: "fieldname3", maxCount: 1}])
    - any => it prarses any file fields as well as text fiels
        ex: require("multer")().any()

file objects are available on the request object as file in case of a single file and as files in case of multiple files.
```javascript
    req.file
    req.files
```