const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/sollar-pr', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Pages'));

app.get('/', (req, res) => {
    console.log("Hello from the other side");
    res.render('home');
})

app.get('/projects', (req, res) => {
    res.render('projects');
})

app.get('/investor', (req, res) => {
    res.render('investor_calculation');
})
app.get('/saved_project', async (req, res) => {
    res.send(req.body);
})
app.listen(3000, () => {
    console.log("Serving on the port 3000");
})