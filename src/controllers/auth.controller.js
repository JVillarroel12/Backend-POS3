const authService = require('../../src/services/auth.service');
const { validationResult } = require('express-validator');

const login = async (req, res) => {
    //Validaciones con Express validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Username or Password are invalid' });
      }

    const { user, password } = req.body;

    try {
        const response = await authService.loginUser({user, password})
        
      if(!response.success){
            return res.status(401).json({ ...response });
        }
      
      res.json(response);

    } catch (error) {
       console.log(error)
        res.status(500).json({ success: false, message: 'Error del Servidor Contacte al adminstrador' });
    }
};

const createUser = async (req, res) => {
    
        //Validaciones con Express validator
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const { user, password } = req.body;

    try {
         const response = await authService.createUser({user, password})
      res.status(201).json(response);
    } catch (error) {
        console.log(error)
       res.status(500).json({ success: false, message: 'Error del Servidor Contacte al administrador' });
    }
};
  
module.exports = {
    login,
    createUser
};