const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');

class UsersController {
   /**
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */
   async create(request, response) {

      try {
         const { name, email, password } = request.body;

         if(!name || !email || !password)
            throw new AppError('The fields name, email and password are required.');

         const database = await sqliteConnection();
         const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

         if(checkUserExists)
            throw new AppError('User already exists');

         response.status(201).json({ name, email, password });

      } catch (error) {
         console.log(error);
      }
      
   }
}

module.exports = UsersController;