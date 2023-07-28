# CoWorking-Registry
### CRUD (Create, Read, Update, Delete) for a User
<details>
<summary>Backend contents of `code`</summary>

## Project Structure
```css
crud/
  ├── package.json
  ├── Dockerfile
  ├── docker-compose.yaml
  ├── createdb.js
  ├── coworking_registry.db
  ├── src/
  │    ├── app.js
  │    ├── routes/
  │    │    ├── routes.js
  │    ├── controllers/
  │    │    ├── authController.js
  │    │    ├── userController.js
  │    │    ├── workspaceController.js
  │    ├── models/
  │    │    ├── userModel.js
  │    │    ├── workspaceModel.js
  │    ├── config/
  │    │    ├── dbConfig.js
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
| GET         | api/workspace/       | Get all workspace       |


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
                "email": "new.user@example.com",
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
    "id": 1,
    "name": "Jane Doe",
    "email": "new.user@example.com",
    "mobile": "5555555555",
    "password": "$2b$10$8qc5gBT4DjLLdNoeAHzTd.VinwhIyXmPo5JT1Pm4Vx8.FZvFiCx/G",
    "created_at": "2023-07-24T03:03:31.819Z",
    "updated_at": "2023-07-24T03:03:31.819Z"
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
                "email": "new.user@example.com",
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
        "email": "new.user@example.com",
        "mobile": "5555555555",
        "password": "$2b$10$8qc5gBT4DjLLdNoeAHzTd.VinwhIyXmPo5JT1Pm4Vx8.FZvFiCx/G",
        "created_at": "2023-07-24T03:03:31.819Z",
        "updated_at": "2023-07-24T03:03:31.819Z"
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
    "mobile": "5555555555",
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
    "mobile": "9876543210",
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDUwMTUzMiwiZXhwIjoxNjkwNTA1MTMyfQ.UE7XO9B-D4jGm02NUlC7P6wmpmkfah8qDI2_6RGWnNs"
        },
        "data": JSON.stringify({
            "name": "Study pod 21"
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
    "name": "Study pod 21",
    "created_at": "2023-07-27T23:44:08.931Z",
    "updated_at": "2023-07-27T23:44:08.931Z"
}
```

**8. Get all workspace**

 **request params**
 ```javascript
    var settings = {
        "url": "http://localhost:3000/api/workspace/",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDUwMTUzMiwiZXhwIjoxNjkwNTA1MTMyfQ.UE7XO9B-D4jGm02NUlC7P6wmpmkfah8qDI2_6RGWnNs"
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
    "name": "Study pod 21",
    "created_at": "2023-07-27T23:44:08.931Z",
    "updated_at": "2023-07-27T23:44:08.931Z"
},
{
    "id": 2,
    "name": "Study pod 22",
    "created_at": "2023-07-27T23:44:08.931Z",
    "updated_at": "2023-07-27T23:44:08.931Z"
}
```


</details>

<details>

<summary>Frontend contents of `code`</summary>

```
SAMPLE CODE!
```
</details>
