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
    id: number,
    name: string | required,
    email: string | required,
    password: string | required,
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