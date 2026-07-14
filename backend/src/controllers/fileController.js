const pool = require('../db/postgres');
const { s3Client }= require("../aws/bucket");
const { PutObjectCommand ,GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

const uploadFile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const fileId = uuidv4();
        const file = req.file;
        const fileName = `${fileId}-${file.originalname}`;
        const command =  new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key:fileName,
            Body: file.buffer,
            ContentType: file.mimetype
});
        await s3Client.send(command);
        const result = await pool.query(
            `
              INSERT INTO files
            (
                user_id,
                original_name,
                file_path,
                mime_type,
                fileid,
                file_size
            )
            VALUES ($1, $2, $3, $4, $5,$6)
            RETURNING *
            `,
            [
                userId,
                file.originalname,
                " ",
                file.mimetype,
                fileId,
                file.size,
            ]
        );
        res.status(201).json({
            message: 'File uploaded successfully',
            file: result.rows[0]
        });
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            message: 'Upload failed'
        });
    }
};
const getFiles = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await pool.query(
            `
            SELECT *
            FROM files
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch files'
        });
    }
}
const deleteFiles = async (req,res)=>{
    try{
        console.log("delete api");
        const userId = req.user.userId;
        const fileId= req.params.id;
        console.log("fileid",fileId);
        const result = await pool.query(
            `SELECT fileid, original_name FROM files WHERE id = $1 AND user_id = $2`, [fileId, userId]);
        console.log(result);
        if(result.rows.length ===0)
            return res.status(404).json({ 
            message:'file not found'
        })
        const file = result.rows[0];
        console.log(file.fileId);
        const key =`${file.fileid}-${file.original_name}`;
        const command = new DeleteObjectCommand({
             Bucket: process.env.AWS_BUCKET_NAME,
             Key: key,
        })
        const response = await s3Client.send(command);
        await pool.query(`DELETE FROM files WHERE id = $1 AND user_id = $2`, [fileId, userId]);
        return res.status(200).json({
        message: "File deleted successfully"
        });
    }
    catch(error){
        console.log("error",error);
         res.status(500).json({
        message:'internal server error'
      });
    }
}
const viewFiles= async (req,res)=>{
    try{
       const userId =req.user.userId;
       const fileId=req.params.id;
       const result = await pool.query (`Select * from files WHERE  user_id=$1 AND  id=$2 `,[userId,fileId]);
       if(result.rows.length===0)
        {
         return  res.status(404).json({
            message:'file not found'
          })
        }
        console.log("result",result);
    const file =result.rows[0];
    const key =`${file.fileid}-${file.original_name}`;
    console.log("key",key);
    const command = new GetObjectCommand({
         Bucket: process.env.AWS_BUCKET_NAME,
         Key: key,
    });
    const response = await s3Client.send(command);
    res.setHeader("Content-Type", response.ContentType);
        response.Body.pipe(res);
}
    catch(error){
        console.log(error)
         return res.status(500).json({
            message:'server fail'
        });
    }
};

module.exports = {uploadFile,getFiles,deleteFiles,viewFiles};
