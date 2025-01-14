const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authDatabase = require('../../src/database/auth.database');

// Funcion de Login, usando Bcrypt, crea token en caso de exito.
const loginUser = async ({user, password}) => {
   const userFromDB = await authDatabase.findUserByUserName(user);
   if(!userFromDB) {
    return { success:false, message: 'User or Password incorrect' };
   }
    
    const passwordMatch = await bcrypt.compare(password, userFromDB.PASSWORD);
  
    if(!passwordMatch){
      return { success:false, message: 'User or Password incorrect' };
    }

    const payload = {
       id: userFromDB.USER_ID,
        username: userFromDB.USER,
      };

    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '24h' }); // aqui poner .env

    return {success:true, message:"Login successfull!", token: token, payload } 

};

const createUser = async ({user, password}) => {
  const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try{
        const createdUser = await authDatabase.createUser(user, hashedPassword)
        return {success:true, message:"User created", createdUser}
    }catch (e) {
        if(e.code == 'ER_DUP_ENTRY'){
            return {success:false, message:"The user already exists"}
         }else {
             console.log(e)
            return {success:false, message:"Something unexpected happen"}
        }
    }
}
  
module.exports = {
    loginUser,
    createUser
};