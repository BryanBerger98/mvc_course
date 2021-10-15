const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = 3000;
const expressHbs = require('express-handlebars');
const path = require('path');
const usersRoutes = require('./router/users');
const mongoose = require('mongoose');
const sessionMiddleware = require('./middlewares/session');
const authGuardMiddleware = require('./middlewares/auth-guard');
const cors = require('cors');

app.use(cors());

// Middleware express.json => Déchiffre le body
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


// Middleware sessions
app.use(sessionMiddleware);

// Configuration du moteur de vues
app.engine('hbs', expressHbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/users', usersRoutes);

mongoose.connect(
    'mongodb+srv://admin:ss8DvFRm9439LtdX@cluster0.1yqa6.mongodb.net/demo?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    console.log('MongoDB connected successfully');
}).catch(error => {
    console.error(error);
    process.exit(1);
})

server.listen(port, () => {
    console.log(`NodeJS server started on port ${port}`)
});