## Social Media APIs

### Tech Stack:
    Node.js / Express.js
    MongoDB / Mongoose
    JWT

### How To Run:
    cd ./backside
    npm install or npm update
    npm run start-server

### Milestones:

1. User Authentication and Authorization
    * Implement user login and signup functionality.
    * Ensure that routes are protected and only accessible to authenticated users.
2. User Posts Management
    * Allow users to create, update, and delete their own posts.
    * Implement routes for CRUD operations on posts (/posts, /posts/:id, etc.).
3. Viewing Other Users' Updates
    * Implement routes to fetch posts made by other users (/posts, /posts/me, etc.).
    * Ensure that posts are displayed based on user preferences and permissions.
4. Interacting with Posts
    * Allow users to like and comment on posts made by other users.
    * Implement routes for liking and commenting on posts (/posts/:id/like, /posts/:id/comments, etc.).
5. User Profile Management
    * Enable users to create and edit their profiles.
    * Implement routes for managing user profiles (/users/me, /users/:id, etc.).
6. Viewing Other Users' Profiles
    * Allow users to view profiles of other users.
    * Implement routes to fetch user profiles (/users/:id, etc.).
7. Group Management
    * Allow users to create, join, and manage groups.
    * Implement routes for CRUD operations on groups (/groups, /groups/:id, etc.).
8. Page Management
    * Enable users to create, manage, and follow pages.
    * Implement routes for managing pages (/pages, /pages/:id, etc.).
9.  Error Handling and Validation
    * Implement robust error handling and request validation across all routes.
    * Ensure that error messages are informative and user-friendly.

## Routes
### **User Routes:**

1. **GET /users**: Get all users.
2. **GET /users/:id**: Get a specific user by their ID.
3. **POST /users**: Create a new user (private for only admins)
4. **PUT /users/:id**: Update a user's information. (private for only admins)
5. **DELETE /users/:id**: Delete a user. (private for only admins)
6. **GET /users/me** Get  current user
7. **PUT /users/me**: Update current user's information.
8. **DELETE /users/me**: Delete current user.
9. **POST /auth/login**: User login (authentication).
10. **POST /auth/signup**: sign up for user (authentication).
11. **PUT /changePassword/me**: change password for current user
12. **PUT /changePassword/:id:** change password for user (private for only admins)
-----------------
### **Post Routes:**

1. **GET /posts**: Get all posts.
2. **GET /posts/me** Get posts by a specific user. 
3. **GET /posts/:id**: Get a specific post by its ID.
4. **POST /posts**: Create a new post.
5. **PUT /posts/:id**: Update a post.
6. **DELETE /posts/:id**: Delete a post.
7. **POST /posts/:id/like**: Like a post.
8. **DELETE /posts/:id/like**: Unlike a post.
9. **GET /posts/:id/comments**: Get comments on a specific post.
10. **POST /posts/:id/comments**: Add a comment to a post.
11. **PUT /posts/:id/comments/:commentId**: Update a comment on a post.
12. **DELETE /posts/:id/comments/:commentId**: Delete a comment from a post.
13. **POST /posts/:id/comments/:commentId/like**: Like a comment on a post.
14. **DELETE /posts/:id/comments/:commentId/like**: Unlike a comment on a post.
---------------
### Friendship Routes:

1. **GET /friendships**: Get all friendships.
2. **GET /friendships/pending**: Get pending friendship requests.
3. **POST /friendships/send-request/:userId**: Send a friend request to a user.
4. **PUT /friendships/accept-request/:friendshipId**: Accept a friend request.
5. **PUT /friendships/reject-request/:friendshipId**: Reject a friend request.
6. **DELETE /friendships/cancel-request/:friendshipId**: Cancel a sent friend request.
7. **DELETE /friendships/unfriend/:friendshipId**: Unfriend a user.
-----------------------
### Groups Routes

1. **GET /groups**: Get all groups.
2. **GET /groups/me**: Get groups for specific user.
3. **GET /groups/:id**: Get a specific group by its ID.
4. **POST /groups**: Create a new group.
5. **PUT /groups/:id**: Update a group's information.
6. **DELETE /groups/:id**: Delete a group.
7. **GET /groups/:id/members**: Get all members of a group.
8. **POST /groups/:id/members/:userId**: Add a user to a group.
9. **DELETE /groups/:id/members/:userId**: Remove a user from a group.
10. **GET /groups/:id/posts**: Get all posts within a group.
11. **POST /groups/:id/posts**: Create a new post within a group.
12. **GET /groups/:id/posts/:postId**: Get a specific post within a group.
13. **PUT /groups/:id/posts/:postId**: Update a post within a group.
14. **DELETE /groups/:id/posts/:postId**: Delete a post within a group.
15. **GET /groups/:id/requests**: Get all pending join requests for a group.
16. **POST /groups/:id/requests/:userId**: Send a join request to a group.
17. **PUT /groups/:id/requests/:userId/accept**: Accept a join request for a group.
18. **DELETE /groups/:id/requests/:userId/reject**: Reject a join request for a group.
-----------------------
### Pages Routes

1. **GET /pages**: Get all pages.
2. **GET /pages/me**: Get pages for current user
3. **GET /pages/:id**: Get a specific page by ID.
4. **POST /pages**: Create a new page.
5. **PUT /pages/:id**: Update an existing page.
6. **DELETE /pages/:id**: Delete a page.
7. **GET /pages/:id/admins**: Get admins of a specific page.
8. **POST /pages/:id/admins/:adminId**: Add an admin to the page.
9. **DELETE /pages/:id/admins/:adminId**: Remove an admin from the page.
10. **GET /pages/:id/followers**: Get followers of a specific page.
11. **POST /pages/:id/followers**: Add a follower to the page.
12. **DELETE /pages/:id/followers/:followerId**: Remove a follower from the page.
13. **GET /pages/:id/posts**: Get posts made on a specific page.
14. **GET /pages/:id/posts/:postId**: get a specific post on the pageo.
15. **POST /pages/:id/posts**: Create a new post on the page.
16. **PUT /pages/:id/posts/:postId**: Update a post on the page.
17. **DELETE /pages/:id/posts/:postId**: Delete a post from the page.
------------------------
