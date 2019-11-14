const express = require('express')
const cors = require('cors')
const Sequelize = require('sequelize')
const finale = require('finale-rest')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const authConfig = require('./auth_config.json')

const app = express()

if (!authConfig.domain || !authConfig.audience) {
  throw 'Please make sure that auth_config.json is in place and populated'
}

app.use(cors())
app.use(bodyParser.json())

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256']
})

let database = new Sequelize({
  dialect: 'sqlite',
  storage: './todo.sqlite'
})

// createdAt, and updatedAt are added by Sequelize.
let Todo = database.define('todos', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
})

finale.initialize({
  app: app,
  sequelize: database
})

let todoResource = finale.resource({
  model:Todo,
  endpoints: ['/todos', '/todos/:id']
})

todoResource.all.auth(function(req, res, context) {
  return new Promise(function(resolve, reject) {
    return checkJwt(req, res, function(e) {
     	let roles = req.user['https://quickstart/roles']
      console.error(`roles: ${roles}`);
     	let scopes = req.user['scope']
      console.error(`scopes: ${scopes}`);
      let scopeCheck = scopes && scopes.split(' ').includes('todo')
      if (e || !scopeCheck) {
        res.status(401).send({message: "Unauthorized"});
        resolve(context.stop);
      } else {
        resolve(context.continue);
      }
    })
  })
})

database
  .sync({ force: true })
  .then(() => {
  app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  })
