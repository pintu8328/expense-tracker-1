const express = require('express');
const app = express();
const sequelize = require('./utils/database');
const expenseRoute = require('./routes/expense');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// Define your expense route
app.use('/expenses', expenseRoute);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log("Listening on port 4000");
    });
}).catch(err => {
    console.log(err);
});
