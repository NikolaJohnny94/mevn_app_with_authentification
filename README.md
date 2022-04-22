# <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png" width="32px"> <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png" width="32px"/> MEVN <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/vuejs_original_logo_icon_146304.png" width="28px"/> <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/nodejs_plain_logo_icon_146409.png" width="32px"/> Stack app with authentification using JWT <img src="https://jwt.io/img/pic_logo.svg" width="26px"/> for authentification, Pinia <img src="https://pinia.vuejs.org/logo.svg" width="26px"/> as state management, and Quasar <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_quasar_icon_130213.png" width="32px"/> for UI 🙌

### Stack 💻

<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png" width="20px"/> [[M]ongoDB](https://www.mongodb.com/)<br>
<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/express_original_logo_icon_146527.png" width="20px"/> [[E]xpress.js](https://expressjs.com/)<br>
<img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_vue_icon_130078.png" width="20px"/> [[V]ue.js](https://v3.vuejs.org/)<br>
<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/nodejs_plain_logo_icon_146409.png" width="20px"/> [[N]ode.js](https://nodejs.org/en/)<br>
➕

<img src="https://pinia.vuejs.org/logo.svg" width="26px"/> [Pinia](https://pinia.vuejs.org/) <br>
<img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_quasar_icon_130213.png" width="32px"/> [Quasar](https://quasar.dev/)<br>
<img src="https://jwt.io/img/pic_logo.svg" width="26px"/> [JWT](https://jwt.io/)

## Description 📜

MEVN stack app with authentification (registration, login), logout, delete user's account, dark mode, upload avatar photo functionality and also CRUD functionality for tasks that belongs to currently logged user 🤗

## Routes 🛣️

## Unauthorized routes 🌍 <br>

### Documentation: **/api/v1/docs** 📚 : <br>

- **Description**: [Swagger UI](https://swagger.io/tools/swagger-ui/) Documentation <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_swagger_icon_130134.png" width="20px"/>

### Auth **/api/v1/auth** 🔑 : <br/>

- /register [POST]<br/>
  **Description**: Register user and get tokend asigned in the cookie<br/>
  **Required fields**: firstname, lastname, email, password
- /login [POST]<br/>
  **Description**: Login user and get token asigned in the cookie<br/>
  **Required fields**: email, password

## Authorized routes 🔏 <br>

### User **/api/v1/user** 🙂 :

- /logged-user [GET]<br/>
  **Description**: Get currently logged user <br/>
- /upload-photo [PUT]<br>
  **Description**: Upload/update avatar picture for currentlu logged user <br/>
- /logout [GET] <br>
  **Description**: Logout currently logged user and remove previously assigned token from the cookie
- /delete-user [DELETE] <br>
  **Description**: Remove currently logged user
- /dark-mode [PUT] <br>
  **Description**: Dark mode switch (true/false)

### Tasks **/api/v1/tasks** 📝 :

- /tasks [GET] <br>
  **Description**: Get all tasks by the currently logged user <br>
- /tasks [:id] [GET]<br>
  **Description**: Get task for currently logged user, by the provided task **id** in the parameter <br>
  **Required params**: Task **id**

- /tasks [POST]<br>
  **Description**: Create new task for currently logged user <br>
  **Required fields**: title, description
- /tasks [:id] [PUT] <br>
  **Description**: Update selected task for currently logged user <br>
  **Required params**: Task **id**

- /tasks [:id] [DELETE]<br>
  **Description**: Delete selected task for currently logged user <br>
  **Required params**: Task **id**

## Requirements:

Install node modules: <br>

```
npm install
```

Mongo DB URL 🍃<br>
In the **./config/.env** file, fill MONGO_URL environmental variable with your MongoDB URL
<br><br>
JWT Secret & JWT expires 🔐<br>
In the **./config/.env** file, fill JWT_SECRET envirnonment variable with your desired JWT secret and JWT_EXPIRES environment variable with value that represents after what number of days the token will expire: Default set to 30d (30 days).

Cookie expiration 🍪 <br>
In the **./config/.env** file, fill COOKIE_EXPIRES environmental variable with prefered value, that represents after how many days the cookie will expire: Default set to 30 (30 days).

<br>

## Dev server:

```
npm run dev
```

## Production:

```
npm start
```
