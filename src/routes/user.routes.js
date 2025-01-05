const { Router } = require('express');
const UserController = require('../controllers/UsersController');
const UsersController = require('../controllers/UsersController');

const usersRoutes = Router();

/* 
function firstMiddleware(request, response, next){
  const { password } = request.body;

  if(password.length <= 6)
    return response.json({message: `A senha deve ser maior que 6 caracteres.`});

  next();
}
*/

const userController = new UserController();

usersRoutes.post('/create', userController.create);
usersRoutes.put('/update/:id', userController.update);


// usersRoutes.post('/', firstMiddleware, userController.create);

module.exports = usersRoutes;