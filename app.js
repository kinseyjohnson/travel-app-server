require('dotenv').config()
const Express = require('express');
const app = Express();

const dbConnection = require('./db');
const controllers = require('./controllers');
const middlewares  = require("./middleware");
app.use(require("./middleware/headers"));

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[SERVER] is running on ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(`[SERVER] crashed ${err}`)
    })

app.use(Express.json())
app.use(middlewares.CORS)
app.use('/user', controllers.userController);
app.use('/destination', controllers.destinationcontroller);
app.use('/forum', controllers.forumController);