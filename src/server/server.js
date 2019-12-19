const express = require('express');
const app = express();

app.use(express.json())

const users = [{name: "Manny", password: "password"}];

app.get('/users', function(req, res) {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = { name = res.body.name, password: req.body.password }
    users.push(user)
    res.status(201).send()
})

app.listen(3000);