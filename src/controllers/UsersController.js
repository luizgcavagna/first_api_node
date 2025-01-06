const { hash, compare } = require('bcryptjs');
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
    const { name, email, password } = request.body;

    if(!name) 
      throw new AppError('Name is required', 400);

    if(!email)
      throw new AppError('Email is required', 400);

    if(!password)
      throw new AppError('Password is required', 400);
    
    const database = await sqliteConnection();
    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(checkUserExists)
      throw new AppError('User already exists');

    const hashedPassword = await hash(password, 8);

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    response.send(`User ${name}, created successfully!`);
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get('SELECT id, email, password FROM users WHERE id = (?)', [id]);

    if(!user)
      throw new AppError('User not found');

    const userWithUpdateEmail = await database.get('SELECT id, email FROM users WHERE email = (?)', [email]);

    if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id)
      throw new AppError('Thies email already is used');

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword)
        throw new AppError('Old password does not match');

      user.password = await hash(password, 8);

    }

    await database.run('UPDATE users SET name = (?), email = (?), password = (?), updated_at = DATETIME("now") WHERE id = (?) ', [user.name, user.email, user.password, id]);

    response.send(`User ${name}, updated successfully!`);
    
  }

}

module.exports = UsersController;