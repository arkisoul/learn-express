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

### Problem Statement 

## Middleware
In general = request => route => (n * middleware)? => route handler (method/function) => response
                                    => response
                                        
No middleware = request => route => route handler (method/function) => response
One middleware = request => route => middleware => route handler (method/function) => response
Two middleware = request => route => middleware => middleware => route handler (method/function) => response
Four middleware = request => route => middleware => middleware => middleware => middleware => route handler (method/function) => response