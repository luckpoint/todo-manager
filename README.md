# ToDo Manager

## Summery

This is the sample SPA application and Rest API server to integrate Auth0 authentication.
The Rest API server uses SQLite database to minimize the dependencies. This app is for demostration purpose.

This is useful for those who would like to know followings:
* How to create a Vue app with authentication provided by Auth0
* How to authorize API with Auth0
* How to add Role to the token using Rule
* How to limit the access by using Scope
* How to limit the functionality based on user's Role.

## SPA Application settings

1. Open the Applications section of the Auth0 dashboard and create Application and take a memo of an generated clientId and domain. 
The both clientID and doman will be needed to fill auth_config.json out described below.
2. Configure Callback URLs, Logout URLs, Allowed Web Origins. In this time, please input http://localhost:8080
3. Open the Roles section, and create two roles. The names are Director and Member.
4. Open the Rules section and create two rules.

roles-claim-sync
```javascript
function rolesClaimsRule(user, context, callback) {
  const namespace = "https://quickstart/jwt/claims";
  const assignedRoles = (context.authorization || {}).roles;
  //context.accessToken[namespace + 'roles'] = assignedRoles;
  context.idToken[namespace] = {
    "roles": assignedRoles,
  };

  callback(null, user, context);
}
```	

add-aoles-ao-asers
```
function (user, context, callback) {
  const namespace = 'https://quickstart/';
  const assignedRoles = (context.authorization || {}).roles;
  context.accessToken[namespace + 'roles'] = assignedRoles;
  return callback(null, user, context);
}
```

## API Serve settings

Open the APIs section of the Auth0 dashboard and create API and take a memo of an generated identifier.
The identifier will be needed to fill auth_config.json out described below.


## Project Setup

```
npm install
```

### Configuration

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, first copy auth_config.sample.json into a new file in the same folder called auth_config.json,
and replace the values within with your own Auth0 application credentials:

{
  "domain": "<YOUR AUTH0 DOMAIN>",
  "audience": "<YOUR AUTH0 API IDENTIFIER>",
  "clientId": "<YOUR AUTH0 CLIENT ID>"
}

### Running in development

This compiles and serves the Vue app on port 8080, and starts the backend API server on port 8081.

```
npm run serve
```
## How it works.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run API server
npm run backend-dev

# run all tests
npm test

```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Reference

* https://auth0.com/docs/quickstart/spa/vuejs/02-calling-an-api
* https://github.com/auth0-samples/auth0-vue-samples/tree/master/02-Calling-an-API
