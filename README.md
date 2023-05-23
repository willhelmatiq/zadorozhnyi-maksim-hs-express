My nodeJs + express project

The main entity is a Post.
Project contains unit test for postController and rotes needed for CRUD.
Project have no UI. Project has post api and provides JSON response. 
Also project contains Postman collection for testing API.
In project uses Google Authentication.
There is no navigation in the application, but there are active routes:
    http://localhost:3000/
    http://localhost:3000/auth
    http://localhost:3000/posts
    http://localhost:3000/posts/{id}
    http://localhost:3000/logout
CRUD routes uses middleware to check if the user is logged in

developing in progress...