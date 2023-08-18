# CoWorking-Registry
### We are excited to share our project, the coworking registry, with you. Please find a link to a recorded video walk-through showcasing the website’s functionality and design.

### Link: https://bowvalley-my.sharepoint.com/:v:/g/personal/f_magbitang867_mybvc_ca/EXkm9MyLBUZEsUQnC2DBDK0Byu6x4rZUDL8DAnCXJnqy-g?e=vhDJ33

### Team member:
### Allegria, Mary Cris
### Apellido, Joanna
### Magbitang, Fairbanks
### Surro, Jozel

### Our project is divided into two folders. The first folder contains the backend side, which is written in NodeJS and uses SQLite as a database. The second folder contains the frontend side, which is a combination of NodeJS, HTML, CSS, and JS. Our aim is to create an API that can manipulate the data and send it to the frontend, which will display all the relevant details.

### If you have any questions about our project, please don't hesitate to ask.

### Thank you.

### CRUD (Create, Read, Update, Delete) for a User
<details>
<summary>Backend contents of `code`</summary>

## Project Structure
```css
CoWorking-Registry/
  ├── package.json
  ├── Dockerfile
  ├── docker-compose.yaml
  ├── createdb.js
  ├── .env
  ├── coworking_registry.db
  ├── src/
  │    ├── app.js
  │    ├── routes/
  │    │    ├── routes.js
  │    ├── controllers/
  │    │    ├── authController.js
  │    │    ├── userController.js
  │    │    ├── workspaceController.js
  │    │    ├── leaseController.js
  │    │    ├── propertyController.js
  │    ├── middleware/
  │    │    ├── authenticateToken.js
  │    │    ├── isOwner.js
  │    ├── models/
  │    │    ├── userModel.js
  │    │    ├── workspaceModel.js
  │    │    ├── leaseModel.js
  │    │    ├── propertyModel.js
  │    ├── config/
  │    │    ├── dbConfig.js
  │    │    ├── mailerConfig.js
```

## API Endpoints


| Methods     | Urls                 | Description             |
| ----------- | -----------          | -----------             |
| POST        | api/signup           | Signup a User           |
| POST        | api/login            | Login a User            |
| GET         | api/users/           | Get all Users           |
| GET         | api/users/id         | Get specific User       |
| PUT         | api/users/id         | Update a User           |
| DELETE      | api/users/id         | Delete an existing user |
| POST        | api/workspace/create | Create a workspace      |
| POST        | api/workspace/id     | Update a workspace      |
| GET         | api/workspace/       | Get all workspace       |
| POST        | api/property/create  | Create a property       |
| GET         | api/property/        | Get all workspace       |
| POST        | api/lease/create     | Create a lease          |
| GET         | api/lease/           | Get all lease           |
| GET         | api/verify/          | verify logged in user   |
| GET         |api/verify_email/email| verify email            |
| POST        | api/forgot_password  | forgot password of user |


**1. Signup a User**

 **request params**

    ```javascript
        var settings = {
            "url": "http://localhost:3000/api/signup",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "name": "Jane Doe",
                "email": "janedoe@example.com",
                "username": "jdoe",
                "mobile": "5555555555",
                "password": "password12345"
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    ```

 **response**

 ```json
 {
    "id": 2,
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "username": "jdoe",
    "mobile": "5555555555",
    "role": "coworker",
    "password": "$2b$10$iWuMFzJElsYhmhrefCXnpOmCix97l9h//0Dgg11BLWt6hquFe1Xqu",
    "created_at": "2023-08-01T05:21:50.787Z",
    "updated_at": "2023-08-01T05:21:50.787Z"
}
```

**2. Login a User**

 **request params**

    ```javascript
        var settings = {
            "url": "http://localhost:3000/api/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "identifier": "jdoe",
                "password": "password12345"
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    ```

 **response**

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDE2Nzg2OCwiZXhwIjoxNjkwMTcxNDY4fQ.NuQYZbOs7a6Ui-oEGOmumHDxh20cW-nrfQ2LT2Rf9MI"
    }
    ```

**3. GET All User**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/users/",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDE2Nzg2OCwiZXhwIjoxNjkwMTcxNDY4fQ.NuQYZbOs7a6Ui-oEGOmumHDxh20cW-nrfQ2LT2Rf9MI"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
 ```

 **response**

 ```json
 [
    {
        "id": 1,
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "username": "jdoe",
        "mobile": "5555555555",
        "role": "coworker",
        "password": "$2b$10$x2mSl9ZZApmk.wmfuVFCpOILJ8M7OMpfbj7G6JeCpSNs2GYp3qM1e",
        "created_at": "2023-08-01T05:31:12.807Z",
        "updated_at": "2023-08-01T05:31:12.807Z"
    },
    {
        "id": 2,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "username": "johndoe",
        "mobile": "5555555555",
        "role": "coworker",
        "password": "$2b$10$STM5reKGSahxtOHB5EieK.HnvXEnEPUa8U.Ixd4Gu4QliF4oloiFq",
        "created_at": "2023-08-01T05:31:12.807Z",
        "updated_at": "2023-08-01T05:31:12.807Z"
    }
]
```

**4. GET User by ID**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/users/1",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDE2Nzg2OCwiZXhwIjoxNjkwMTcxNDY4fQ.NuQYZbOs7a6Ui-oEGOmumHDxh20cW-nrfQ2LT2Rf9MI"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
 ```

 **response**

 ```json
 {
    "id": 1,
    "name": "Jane Doe",
    "email": "new.user@example.com",
    "username": "jdoe",
    "mobile": "5555555555",
    "role": "coworker",
    "password": "$2b$10$8qc5gBT4DjLLdNoeAHzTd.VinwhIyXmPo5JT1Pm4Vx8.FZvFiCx/G",
    "created_at": "2023-07-24T03:03:31.819Z",
    "updated_at": "2023-07-24T03:03:31.819Z"
}
```

**5. UPDATE User by ID**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/users/1",
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDE4MzY2OCwiZXhwIjoxNjkwMTg3MjY4fQ.pnhYXZChDAqu6xxGL7c0k42fafKBJCMM7uouGcI6vzU",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "name": "Ja Ho",
            "email": "jaho@ja.com",
            "username": "jaho",
            "mobile": "9876543210",
            "password": "testing123"
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
 ```

 **response**

 ```json
 {
    "id": 1,
    "name": "Ja Ho",
    "email": "jaho@ja.com",
    "username": "jaho",
    "mobile": "9876543210",
    "role": "coworker",
    "password": "$2b$10$AWvZ3DI56sxBttXAAofi9u6FTodVsrB2KdrVj5p5gKaQWGZFCBjBO",
    "created_at": "2023-07-24T07:42:20.146Z",
    "updated_at": "2023-07-24T07:42:20.146Z"
}
```

**6. DELETE User by ID**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/users/2",
        "method": "DELETE",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDE4NTUzOSwiZXhwIjoxNjkwMTg5MTM5fQ.oQHWJzwnvyXI7KV3rTP0W0LKieX58nOo8FsoJtFGBGM"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
 ```

 **response**

 ### The response will be status code 204 No Content.

**7. Create Workspace**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/workspace/create",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY5MDg2NzM4NywiZXhwIjoxNjkwODg1Mzg3fQ.Enj05kc21Hline1y1ENibgKqw-BnEdb0t35-p1g4RRY"
        },
        "data": JSON.stringify({
            "name": "Study pod 22",
            "availability": 0
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
 ```

 **response**

 ```json
 {
    "id": 3,
    "name": "Study pod 22",
    "availability": false,
    "created_at": "2023-08-01T05:21:50.791Z",
    "updated_at": "2023-08-01T05:21:50.791Z"
}
```

**8. Get all workspace**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/workspace/",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
 ```

 **response**

 ```json
 [
    {
        "id": 1,
        "name": "Study pod 23",
        "capacity": null,
        "photos": null,
        "availability": true,
        "user_id": null,
        "property_id": null,
        "created_at": "2023-08-01T05:21:50.791Z",
        "updated_at": "2023-08-01T05:21:50.791Z"
    },
    {
        "id": 2,
        "name": "Study pod 21",
        "capacity": null,
        "photos": null,
        "availability": true,
        "user_id": null,
        "property_id": null,
        "created_at": "2023-08-01T05:21:50.791Z",
        "updated_at": "2023-08-01T05:21:50.791Z"
    },
    {
        "id": 3,
        "name": "Study pod 22",
        "capacity": null,
        "photos": null,
        "availability": false,
        "user_id": null,
        "property_id": null,
        "created_at": "2023-08-01T05:21:50.791Z",
        "updated_at": "2023-08-01T05:21:50.791Z"
    }
]
```

**9. Create Property**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/property/create",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY5MDg2NzM4NywiZXhwIjoxNjkwODg1Mzg3fQ.Enj05kc21Hline1y1ENibgKqw-BnEdb0t35-p1g4RRY"
        },
        "data": JSON.stringify({
            "address": "800 3 St SE, Calgary, AB T2G 2E7",
            "neighborhood": "City Hall 2",
            "squarefoot": "12sqm",
            "parking": 1,
            "transportation": 1,
            "smoking": 1
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
 ```

 **response**

 ```json
 {
    "smoking": true,
    "id": 2,
    "address": "800 3 St SE, Calgary, AB T2G 2E7",
    "neighborhood": "City Hall 2",
    "squarefoot": "12sqm",
    "parking": true,
    "transportation": true,
    "created_at": "2023-08-01T05:21:50.794Z",
    "updated_at": "2023-08-01T05:21:50.794Z"
}
```

**10. Get all Property**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/property/",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
 ```

 **response**

 ```json
 [
    {
        "id": 1,
        "address": "800 3 St SE, Calgary, AB T2G 2E7",
        "neighborhood": "City Hall",
        "squarefoot": "10sqm",
        "parking": true,
        "transportation": true,
        "smoking": true,
        "user_id": null,
        "created_at": "2023-08-01T05:21:50.794Z",
        "updated_at": "2023-08-01T05:21:50.794Z"
    },
    {
        "id": 2,
        "address": "800 3 St SE, Calgary, AB T2G 2E7",
        "neighborhood": "City Hall 2",
        "squarefoot": "12sqm",
        "parking": true,
        "transportation": true,
        "smoking": true,
        "user_id": null,
        "created_at": "2023-08-01T05:21:50.794Z",
        "updated_at": "2023-08-01T05:21:50.794Z"
    }
]
```


Route: /api/verify
 - expected results will be. This will ensure the user are still logged in.
```json	{
    "message": "User is still logged in.",
    "data": {
        "userId": 1,
        "UserOrEmail": "gjedoe",
        "role": "coworker",
        "fname": "Anna",
        "lname": "Doe",
        "mobile": "777888999",
        "iat": 1691731587,
        "exp": 1691749587
    },
    "loggedIn": true
}
```
Route: /api/verify_email/email
 - response will be the user detail.
```json {
    "id": 1,
    "fname": "Anna",
    "lname": "Doe",
    "email": "e777c888h999o@gmail.com",
    "email_verification": true,
    "username": "gjedoe",
    "mobile": "777888999",
    "role": "coworker",
    "password": "$2b$10$4OTIpvxUYf4TRnJn/uMtqeXqrgDFZcfdTsKkbJA9MxOA4GmGLOJFK",
    "created_at": "2023-08-11T05:10:17.141Z",
    "updated_at": "2023-08-11T05:10:17.141Z"
}
```

Route: /api/forgot_password
- server response
```json
{
    "message": "Password successfully changes."
}
```
</details>

<details>

