const jwt = require('jsonwebtoken')

      const authenticate = (req, res, next) => {

          const authHeader = req.headers['authorization']
  
       if(!authHeader){
             return res.status(401).json({msg: "Token is necessary for use API"})
             }
           const token = authHeader
              
           if (token === null) {
            return res.status(401).json({msg: "Token not found, Login please."})
            }
               jwt.verify(token, 'your-secret-key',(error,user)=> {
            if (error) {
              console.log(error)
                return res.status(403).json({ msg:"Token invalid or expired"})
            }
               
              req.user = user
             next()
     })
          }
       module.exports = authenticate