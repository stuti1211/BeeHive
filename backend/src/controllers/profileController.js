const pool = require('../db/postgres');
const jwt = require('jsonwebtoken');

const updateProfile = async(req,res) =>{
    try {
        const userId = req.user.userId;
        const updatedName =req.body.updatedName;
        const result = await pool.query(
            'UPDATE users SET name = $1 WHERE id = $2',
             [updatedName,userId]
        )
        return res.status(200).json({
            message:"name updated successfully"
        })


    } catch (error) {
        res.status(500).send("name not updated")
    }

}
const getProfile = async(req,res) =>{
    try{
        const userId= req.user.userId;
        const result =await pool.query(
             `
            SELECT
                id,
                name,
                email,
                created_at
            FROM users

            WHERE id = $1
            `,
            [userId]
        );
    if(!result){
      return  res.status(404).json({
            message:'Profile not found'
        });
    }  
    return res.status(200).json({
        message:'Profile found', 
        userData:result.rows[0]
    });
    }
    catch(error){
        return res.status(500).json({
            message:'fail to fetch'
        }) 

    }
}
    
const deleteProfile = async(req,res)=>{ 
    try{
    const userId=req.user.userId;
    const result = await pool.query(
     `DELETE FROM user WHERE id = $1 `,[userId]
    );
    if(!result){
       return  res.status(404).json({
        message:'Profile not found'
       });
    }
    return res.status(200).json({
        message:"Delete"
    });
}
catch(error){
    return res.status(500).json({
        message:'internal error'
    });
}
}
module.exports ={updateProfile,getProfile ,deleteProfile};