const categoryDatabase = require('../database/category.database')

const getAllCategories = async (req, res) => {
    try{
      const categories = await categoryDatabase.getCategories()
      return res.status(200).json({ success: true, data: categories});
    } catch(error) {
        console.log(error)
      return res.status(500).json({ success: false, msg: 'Contact the admin'});
    }
};

const createCategory = async (req, res) => {
    const body = req.body
    try{
      const categoryCreated = await categoryDatabase.createCategory(body)
      return res.status(201).json({ success: true, data: categoryCreated, message:"Created succesfully" });
    } catch(error){
        console.log(error)
      return res.status(500).json({ success: false, msg: 'Contact the admin'});
    }
};

module.exports = {
    getAllCategories,
    createCategory
};