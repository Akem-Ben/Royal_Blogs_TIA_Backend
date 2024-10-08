# Royal Blogs TIA - Backend

# Project Overview
Royal Blogs TIA Backend is a RESTful API built using Node.js, Express, and Sequelize for managing a blogging platform. The API allows users to register, create posts, like/dislike posts, and comment on posts. It also includes routes for managing users and their authentication. The backend integrates image uploading via Cloudinary, handles authorization, and supports basic CRUD operations for blog posts, likes, dislikes, and comments.

# Features
User Authentication: Register, login, and verify user accounts.<br />
Blog Posts: Create, read, update, and delete blog posts.<br />
Comments: Add and fetch comments on blog posts.<br />
Likes/Dislikes: Like or dislike posts, view all likes or dislikes.<br />
Profile Management: View and update user profiles.

# Table of Contents
Installation<br />
Environment Variables<br />
Project Structure<br />
API Routes<br />
User Routes<br />
Blog Post Routes<br />
Comments Routes<br />
Likes/Dislikes Routes<br />
Models<br />
Helper Functions<br />
Technologies Used<br />
License<br />


## Installation
To install and run the project locally:

#### Clone the repository:

``` 
git clone git@github.com:Akem-Ben/Royal_Blogs_TIA_Backend.git
```
#### Navigate into the project directory:

```
cd Royal_Blogs_TIA_Backend
```

#### Install dependencies:

```
npm install
```

#### Create a .env file in the root directory and add the necessary environment variables (see the Environment Variables section).


#### Build the project

```
npm run build
```


#### Start the development server:

```
npm run dev
```

# Environment Variables
Create a .env file in the root directory with the following variables:

```
# DEVELOPMENT KEYS
DEV_PORT = YOUR DEV_PORT
DEV_DB_PORT = YOUR DEV_DB_PORT
DB_NAME = YOUR DB_NAME
DB_USERNAME = YOUR DB_USERNAME
DB_PASSWORD = YOUR DB_PASSWORD
DB_HOST = YOUR DB_HOST

# CLOUDINARY KEYS
CLOUDINARY_NAME = YOUR CLOUDINARY_NAME
API_KEY = YOUR API_KEY
API_SECRET = YOUR API_SECRET

# PRODUCTION KEYS
PROD_PORT = YOUR PROD_PORT
PROD_DB_NAME = YOUR PROD_DB_NAME
PROD_DB_USERNAME = YOUR PROD_DB_USERNAME
PROD_DB_PASSWORD = YOUR PROD_DB_PASSWORD
PROD_DB_HOST = YOUR PROD_DB_HOST
PROD_DB_PORT = YOUR PROD_DB_PORT

# GMAIL SMTP KEYS FOR MAILS
GMAIL_USER = YOUR GMAIL_USER
GMAIL_PASSWORD = YOUR GMAIL_PASSWORD
APP_BASE_URL = YOUR APP_BASE_URL
```


# Project Structure

```
├── src
│   ├── configurations
│   ├── controllers
│   ├── helperFunctions
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utilities
│   └── app.ts
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── README.md
```


## API Routes
#### User Routes

<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/users/signup</td>
      <td>Register a new user (requires profile image)</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/users/verify/:token</td>
      <td>Verify user email using a token</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/users/login</td>
      <td>Log in a user</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/users/profile</td>
      <td>Get the profile of the logged-in user (requires auth)</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/users/resendVerification</td>
      <td>Resend the verification email</td>
    </tr>
  </tbody>
</table>



#### Blog Post Routes

<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/post/create</td>
      <td>Create a new blog post (requires auth and image upload)</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/post/singlePost/:postId</td>
      <td>Get a single blog post</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/post/deleteUserPost/:postId</td>
      <td>Delete a blog post (requires auth)</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/post/allPosts</td>
      <td>Get all blog posts</td>
    </tr>
  </tbody>
</table>


#### Comments Routes

<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/post/makeComment/:postId</td>
      <td>Make a comment on a blog post (requires auth)</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/post/allComments/:postId</td>
      <td>Get all comments for a post</td>
    </tr>
  </tbody>
</table>


#### Likes Routes


<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/post/likePost/:postId</td>
      <td>Like a blog post (requires auth)</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/post/allLikes/:postId</td>
      <td>Get all likes for a blog post</td>
    </tr>
  </tbody>
</table>


#### Dislikes Routes

<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/post/dislikePost/:postId</td>
      <td>Dislike a blog post (requires auth)</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/post/allDislikes/:postId</td>
      <td>Get all dislikes for a blog post</td>
    </tr>
  </tbody>
</table>


## Models

<ul>
<li> 
User: Stores user details such as username, email, password, and profile image.
</li>
<li>
BlogPost: Stores blog post information like title, image, text, likes, and dislikes.
</li>
<li>
Comment: Stores comments made on blog posts.
</li>
<li>
Likes: Tracks users who like a post.
</li>
<li>
Dislikes: Tracks users who dislike a post.
</li>
</ul>


## Helper Functions

<ul>
<li>
hashPassword: Hashes the user password using bcrypt.
</li>
<li>
generateToken: Generates JWT tokens for authentication.
</li>
<li>
convertToDDMMYY: Converts an ISO date to DD-MM-YY format.
</li>
<li>
convertToISODateString: Converts a regular date string to ISO format.
</li>
<li>
passwordTest: Validates the strength of user passwords using regex.
</li>
</ul>

## Technologies Used

<ul>
<li>
Node.js
</li>
<li>
Express.js
</li>
<li>
TypeScript
</li>
<li>
Sequelize ORM (for PostgreSQL)
</li>
<li>
Cloudinary (for image uploads)
</li>
<li>
Multer (for file uploads)
</li>
<li>
JWT (for user authentication)
</li>
<li>
Bcrypt (for password hashing)
</li>
<li>
Nodemailer (for sending verification emails)
</li>
</ul>


## License: This project is licensed under the MIT License.