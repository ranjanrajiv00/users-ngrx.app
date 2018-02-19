# users-ngrx.app

This project is developed with angular-cli version 1.6.7.

json-server is used to deploy json based api at port 5050


**run application**

Use 'npm start' to run the application. It will start development and api server concurrently
<pre>
"scripts": {
    "ng": "ng",
    "start": "concurrently \"ng serve\" \"npm run api\"",
    "build": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "api": "json-server --watch api/users.json --routes api/routes.json --port 5050"
  }
 </pre>
 
 
 **project structure**
 
 Project structure has been organized based on feature so app is organized in AppModule and UserModule.
 
 UserModule is feature module and being lazy loaded.
 
 Also used ngRx for maintaing app state.
   
```bash
├── ...
├── app
│   ├── user-management
│   │   ├── users
│   │   │   ├── store
│   │   │   │   ├── actions
│   │   │   │   │   └── user.action.ts
│   │   │   │   ├── effects
│   │   │   │   │   └── user.effects.ts
│   │   │   │   ├── reducers
│   │   │   │   │   └── user.reducers.ts
│   │   │   │   │   └── users.reducers.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── state
│   │   │   │   │   └── user.state.ts
│   │   │   ├── user-details
│   │   │   │   └── user-details.component.html
│   │   │   │   └── user-details.component.ts
│   │   │   │   └── user-details.component.spec.ts
│   │   │   ├── user-list
│   │   │   │   └── user.component.html
│   │   │   │   └── user.component.ts
│   │   │   │   └── user.component.spec.ts
│   │   │   └── user.model.ts
│   │   │   └── user.service.spec.ts
│   │   │   └── user.service.ts
│   └── app.component.html
│   └── app.component.ts
│   └── app.module.ts
│   └── app.route.ts
├── ...
```
    
 **run unit test**
 
 Use 'ng test' to run unit tests.
 
 
 
 
