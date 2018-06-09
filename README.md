
<p align="center">
  <h1 align="center">Pigeon Auth</h1>
  
  <p align="center">
    A tool for user authentication with MySQL Database.
  </p>
</p>

# Getting Started
## Basic Setup
As soon as you downloaded all the plugins, just includes all the plugins into your project in the order as below:
- jQuery
- Bootstrap
- AngularJS
- Pigeon Table
*** If your project is running in PHP, you can insert the "includes.php" to include all the dependencies. The "includes.php" file is located in "pigeon-table/php/includes.php".

## Database Configuration
A simple database configuration is required to connect and retrieve the data from SQL database. The database configuration is stored in **pigeon-core** directory. Fill in the database configuration in **configdb-example.php** and rename the file to **configdb.php**.

# How to use?
## Step 1: Create Login Page
### Pigeon Login directive
In order to create Login Page, you are required to include "pigeon-auth" HTML tag.
```html
<pigeon-login
    user-table="user"
    user-credentials="email,password"
    user-credentials-display="Email,Password"
    default-page="example.html"
    register-page="register-example.html">
</pigeon-login>
```
### Pigeon Login Settings
- `user-table` - MySQL table's name containing user's credentials. 
- `user-credentials` - MySQL columns' names for authenticating user, separated by `,`.
- `user-credentials-display` - Display names to user login form, must be corresponded to `user-credentials`.
- `default-page` - Page redirected to after logging in.
- `register-page` - Register page.

### Example

![Login Page Example](https://i.imgur.com/lB3D78Q.png)

## Step 2: Create Register Page
### Pigeon Register directive
In order to create Login Page, you are required to include "pigeon-auth" HTML tag.
```html
<pigeon-register 
    user-table="user"
    user-credentials="email,password"
    user-credentials-display="Email,Password"
    user-info="name,phone,address"
    user-info-display="Full Name,Mobile Phone Number,Portal Address"
    default-page="example.html"
    login-page="login-example.html">
</pigeon-register>
```
### Pigeon Register Settings
- `user-table` - MySQL table's name containing user's credentials.
- `user-credentials`- MySQL columns' names for authenticating user, separated by `,`.
- `user-credentials-display` - Display names to user login form, must be corresponded to `user-credentials`.
- `user-info`- MySQL columns' names for authenticating user, separated by `,`.
- `user-info-display` - Display names to user login form, must be corresponded to `user-credentials`.
- `default-page` - Page redirected to after logging in.
- `register-page` - Register page.

### Example

![Register Page Example](https://i.imgur.com/piVO19A.png)

## Step 3: Create Login Page
### Pigeon Auth directive
```html
<pigeon-auth
    require-auth="true"
    login-page="login-example.html">
</pigeon-auth>
```
### Pigeon Auth Settings
- `require-auth` - MySQL table's name containing user's credentials.
- `login-page`- MySQL columns' names for authenticating user, separated by `,`.
