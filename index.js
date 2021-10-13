const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = 3000;
const expressHbs = require('express-handlebars');
const path = require('path');
const usersRoutes = require('./router/users');

// Middleware express.json => Déchiffre le body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Configuration le moteur de vues
app.engine('hbs', expressHbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/users', usersRoutes);

server.listen(port, () => {
    console.log(`NodeJS server started on port ${port}`)
});