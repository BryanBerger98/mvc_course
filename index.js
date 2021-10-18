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
require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;

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

console.log('MONGO URI >>>', MONGODB_URI);

mongoose.connect(
    'mongodb+srv://admin:invlrcMXqoZNF5p7@cluster0.1yqa6.mongodb.net/demo?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    console.log('MongoDB connected successfully');
}).catch(error => {
    console.error(error);
    process.exit(1);
})

server.listen(PORT, () => {
    console.log(`NodeJS server started on port ${PORT}`)
});