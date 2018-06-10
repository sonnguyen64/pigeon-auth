
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
- Pigeon Auth

If your project is running in PHP, you can insert the "includes.php" to include all the dependencies. The **includes.php** file is located in **pigeon-auth/php/includes.php**.

## Database Configuration
A simple database configuration is required to connect and retrieve the data from SQL database. The database configuration is stored in **pigeon-core** directory. Fill in the database configuration in **configdb-example.php** and rename the file to **configdb.php**.

# How to use?
## 1. Create Login Page
In order to create Login Page, you are required to include **pigeon-auth** HTML tag.
### Pigeon Login directive
Usage of Pigeon Login directive:
```html
<!-- login-example.html -->
<pigeon-login
    user-table="user"
    user-credentials="email,password"
    user-credentials-display="Email,Password"
    default-page="example.html"
    register-page="register-example.html">
</pigeon-login>
```
### Pigeon Login Settings
- `user-table` - MySQL table containing user's credentials. 
- `user-credentials` - User credentials in MySQL's `user-table`, including user identification (*username*, *email*, *id*, etc.) and user password, separated by `,`. 
- `user-credentials-display` - Fields' names of `user-credentials` in User Login form, must be corresponded to `user-credentials`.
- `default-page` - Page redirected to after logging in.
- `register-page` - Register page.

### Screenshot

![Login Page Example](https://i.imgur.com/lB3D78Q.png)

## 2. Create Register Page
In order to create Register Page, you are required to include **pigeon-auth** HTML tag.
### Pigeon Register directive
Usage of Pigeon Register directive:
```html
<!-- register-example.html -->
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
- `user-table` - MySQL table containing user's credentials.
- `user-credentials`- User credentials in MySQL's `user-table`, including user identification (*username*, *email*, *id*, etc.) and user password, separated by `,`. 
- `user-credentials-display` - Fields' names of `user-credentials` in User Login form, must be corresponded to `user-credentials`.
- `user-info`- Additional user information in MySQL's `user-table`, separated by `,`.
- `user-info-display` - Fields' names of `user-info` in User Login form, must be corresponded to `user-info`.
- `default-page` - Page redirected to after successfully registered.
- `register-page` - Login page.

### Screenshot

![Register Page Example](https://i.imgur.com/RUc61Zu.png)

## 3. Define Authentication for Specific Page
In order to authenticate the page, you are required to include **pigeon-auth** HTML tag.
### Pigeon Auth directive
```html
<!-- example.html -->
<pigeon-auth
    require-auth="true"
    login-page="login-example.html">
</pigeon-auth>
```
### Pigeon Auth Settings
- `require-auth` - Require login to access the page or not.
- `login-page`- Login page.

## 4. User Logout
Redirect the page to Login Page or Register Page, user will be automatically logged out from the system.
