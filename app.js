const express = require("express");
const app = express();

app.get('/', (req, res) => {
    console.log("Hello from the other side");
    res.send("home.ejs");
})


app.listen(3000, () => {
    console.log("Serving on the port 3000");
})