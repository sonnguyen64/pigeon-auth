/*global angular, console, $, alert, jQuery*/
/*jslint vars: true*/
/*jslint plusplus: true*/

var app = angular.module('pigeon-auth', []);

// Server requests
app.factory("Auth", ['$http',
    function($http) { 
        var obj = {};
        obj.get = function(request) {
            return $http.get("pigeon-core/auth/" + request + ".php").then(function(results) {
                return results.data;
            });
        };
        obj.post = function(request, object) {
            return $http.post("pigeon-core/auth/" + request + ".php", object).then(function(results) {
                return results.data;
            });
        };
        obj.put = function(request, object) {
            return $http.put("pigeon-core/auth/" + request + ".php", object).then(function(results) {
                return results.data;
            });
        };
        obj.delete = function(request) {
            return $http.delete("pigeon-core/auth/" + request + ".php").then(function(results) {
                return results.data;
            });
        };
        return obj;
    }
]);

// Pigeon Auth directive
app.directive('pigeonAuth', function () {
    "use strict";

    var direc = {};

    direc.restrict = "E";
    direc.scope = {
        requireAuth: "=",
        loginPage: "@"
    };
    direc.controller = "pigeonAuthController";

    return direc;
});

// Pigeon Login directive
app.directive('pigeonLogin', function () {
    "use strict";

    var direc = {};

    direc.restrict = "E";
    direc.scope = {
        userTable: "@",
        userCredentials: "@",
        userCredentialsDisplay: "@",
        defaultPage: "@",
        registerPage: "@"
    };
    direc.templateUrl = "pigeon-auth/template/login.html";
    direc.controller = "pigeonLoginController";
    direc.compile = function () {
        var linkFunction = function (scope, element, attributes) {
            scope.init();  
        };
        return linkFunction;
    };

    return direc;
});

// Pigeon Register directive
app.directive('pigeonRegister', function () {
    "use strict";

    var direc = {};

    direc.restrict = "E";
    direc.scope = {
        userTable: "@",
        userCredentials: "@",
        userCredentialsDisplay: "@",
        userInfo: "@",
        userInfoDisplay: "@",
        defaultPage: "@",
        loginPage: "@"
    };
    direc.templateUrl = "pigeon-auth/template/register.html";
    direc.controller = "pigeonRegisterController";
    direc.compile = function () {
        var linkFunction = function (scope, element, attributes) {
            //Initialize the default settings
            scope.init();  
        };
        return linkFunction;
    };

    return direc;
});

// Pigeon Auth controller
app.controller('pigeonAuthController', function($scope, $rootScope, $window, Auth) {
    if ($scope.requireAuth) {
        // Check session storage for user authentication
        Auth.get('session').then(function (results) {
            if (results.id) {
                $rootScope.id = results.id;
            } else {
                // Redirect to login page
                $window.location.href = $scope.loginPage;
            }
        });
    }

});

// Pigeon Login controller
app.controller('pigeonLoginController', function($scope, $window, Auth) {
    // Initialize settings
    $scope.init = function() {
        // Logout if user already logged in
        Auth.get('logout').then(function(results) {
        });
        // Extract data from directive
        var creds = $scope.userCredentials.split(",").map(function(item) {
            return item.trim();
        });
        var credsDisplay = $scope.userCredentialsDisplay.split(",").map(function(item) {
            return item.trim();
        });
        // Initialize the user object
        $scope.user = {
            userTable: $scope.userTable
        }
        // Credentials
        $scope.credentials = [];
        for (i = 0; i < creds.length; i++) {
            $scope.credentials.push({column: creds[i], display: credsDisplay[i]});
            $scope.user[creds[i]] = '';
        }
    }

    // Login button click
    $scope.loginUser = function() {
        // Get the credentials ID
        $scope.user["id"] = $scope.user[$scope.credentials[0].column];
        // Login
        Auth.post('login', $scope.user).then(function(results) {
            console.log(results);
            if (results.status == "success") {
                $window.location.href = $scope.defaultPage;
            }
        });
    };

});

// Pigeon Register controller
app.controller('pigeonRegisterController', function($scope, $window, Auth) {
    // Initialize settings
    $scope.init = function() {
        // Logout if user already logged in
        Auth.get('logout').then(function(results) {
        });
        // Extract data from directive
        var creds = $scope.userCredentials.split(",").map(function(item) {
            return item.trim();
        });
        var credsDisplay = $scope.userCredentialsDisplay.split(",").map(function(item) {
            return item.trim();
        });
        var info = $scope.userInfo.split(",").map(function(item) {
            return item.trim();
        });
        var infoDisplay = $scope.userInfoDisplay.split(",").map(function(item) {
            return item.trim();
        });
        // Initialize the user object
        $scope.user = {
            userTable: $scope.userTable
        }
        // Credentials
        $scope.credentials = [];
        for (i = 0; i < creds.length; i++) {
            $scope.credentials.push({column: creds[i], display: credsDisplay[i]});
            $scope.user[creds[i]] = '';
        }
        // Additional user info
        $scope.info = [];
        for (i = 0; i < info.length; i++) {
            $scope.info.push({column: info[i], display: infoDisplay[i]});
            $scope.user[info[i]] = '';
        }
    }

    // Register button click
    $scope.registerUser = function() {
        // Get the credentials ID
        $scope.user["id"] = $scope.user[$scope.credentials[0].column];
        // Insert user to database
        Auth.post('register', $scope.user).then(function(results) {
            if (results.status == "success") {
                $window.location.href = $scope.defaultPage;
            }
        });
    };
});