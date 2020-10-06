# My First Fullstack Project
**Disclaimer:**
The site isn't responsive, because it's my first fullstack project,
I wanted to get the hang of React, Node.js and dealing with the database, instead of focus on responsive design.

**I did put some design anyways, but not responsive.**

---
# Secret Agency

### About The Project

The project is kind of viewing wanteds and managing them in a web application,  
You can login / signup, There's 3 kinds of permissions to users:
- **Owner:** Can delete accounts, manage user's ranks, add wanteds and view the wanted list.  
   The owner have owner panel, from there he can view all the users from the users list, and copy their ID,
   then going to manage users(in the owner panel as well) and changing their ranks / delete their account (view screenshots).
- **Admin:** Can add wanteds and view the wanted list.  
   The admin have a button on the nav bar that will take him the to adding wanted form,
   from there he can fill the form and add the wanted (view screenshots).
- **User:** Only can view the wanted list (users dont have the "delete wanted button" in this list as shown in the screenshot below).

**You need to set the owner rank manually in the DB, other ranks can be set from the owner panel.**

---
# Screenshots
**Wanted List Example**
![wanted list example](https://github.com/Yitzhakpro/Secret-Agency-fullstack/blob/main/Screenshots/wantedlist.png "wanted list example")

**Add Wanted Form**
![add wanted form](https://github.com/Yitzhakpro/Secret-Agency-fullstack/blob/main/Screenshots/addwanted.png "add wanted form")

**Owner Panel**
![owner panel](https://github.com/Yitzhakpro/Secret-Agency-fullstack/blob/main/Screenshots/ownerpanel.png "owner panel")

**Users List**
![users list](https://github.com/Yitzhakpro/Secret-Agency-fullstack/blob/main/Screenshots/userslist.png "users list")

**Manage User Example**
![manage user example](https://github.com/Yitzhakpro/Secret-Agency-fullstack/blob/main/Screenshots/manageusertest.png "manage user example")

---
# Installation & Setting Up

clone the directory
```bash
git clone https://github.com/Yitzhakpro/Secret-Agency-fullstack-.git
```
Install modules needed in the backend.
```bash
cd backend
npm install
```
Install modules needed in the frontend.
```bash
cd frontend
npm install
```

### Changing ports / addresses / DB URI

**Backend**
```javascript
FILE: Server.js

LINE 10: const PORT = process.env.PORT || 4000;
LINE 11: const ORIGIN = 'http://localhost:3000' // CHANGE THIS IF YOU WANT.
LINE 26: const dbURI = '' // put your db URI here
```
ORIGIN refers to the client.
```javascript
FILE: /controllers/authController.js 

LINE 36: const PRIVATE_JWT_KEY = '' // CHANGE THIS
```
this key will be a part of the jwt token, keep it secret.

**Frontend**
```javascript
FILE: /src/store/actions/AuthActions.js

LINE 1: const API_ADDRESS = 'http://localhost:4000'; // Change this if you want.
```
```javascript
FILE: /src/store/actions/WantedActions.js

LINE 1: const API_ADDRESS = 'http://localhost:4000'; // Change this if you want.
```
```javascript
FILE: /src/components/OwnerAccess/ManageUsers.js

LINE 4: const API_ADDRESS = 'http://localhost:4000'; // change this if you want
```
API Address refers to the server's address.

---
# Built with:
- Node.js for the backend (With the module **Express**).
- React for the frontend (modules used: redux, thunk, etc...).
- MongoDB for the database (mongoose for the backend to deal with the db).
- fetchAPI to reach the server's endpoint.
