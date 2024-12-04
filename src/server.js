const express = require("express");

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.get('/route-params/:id/:user', (request, response) => {
    const { id, user } = request.params;

    response.send(`O id: ${id} é do usuário: ${user}`);
});

app.get('/query-params', (request, response) => {
    const { page, limit } = request.query;

    response.send(`A página é: ${page} e o limite: ${limit}`);
});

app.post('/post', (request, response) => {
    const { name, email, password } = request.body;

    response.json({ name, email, password })
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));