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