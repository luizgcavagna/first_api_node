const { Router } = require('express');

const usersRoutes = require('./user.routes');

const routes = Router();

/*
routes.get('/', (request, response) => {
  response.send('Hello World!');
});

routes.get('/route-params/:id/:user', (request, response) => {
  const { id, user } = request.params;

  response.send(`O id: ${id} é do usuário: ${user}`);
});

routes.get('/query-params', (request, response) => {
  const { page, limit } = request.query;

  response.send(`A página é: ${page} e o limite: ${limit}`);
});
*/

routes.use('/users', usersRoutes);

module.exports = routes;