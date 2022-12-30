require('dotenv').config();
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    IP = process.env.IP || 'localhost',
    cors = require('cors'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    path = require('path'),
    db = require('./models'),
    cron = require('node-cron')

// homeRoutes = require('./api/routes/index'),
adminRoutes = require('./api/routes/admin');
userRoutes = require('./api/routes/user');



app.use(express.static(path.resolve(__dirname, 'Public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use(logger('dev'));
// API user
app.use(process.env.ROUTE_PREFIX + '/user',
    userRoutes,
);

// API admin
app.use(process.env.ROUTE_PREFIX + '/admin',
    adminRoutes,
);


app.listen(port, IP, () => {
    console.log(`PORT IS ALIVE AND IT LISTEN TO PORT http://${IP}:${port}`);
});

//cronjob


// // // Sync database
// db.sequelize.sync();
db.sequelize.sync({ alter: true });
// db.PostCode.destroy({ where: {}, truncate: true })
// db.PostCode.bulkCreate(excel())

module.exports = app;