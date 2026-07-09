const pool = require('../db/postgres');
const { s3Client }= require("../aws/bucket");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

const uploadFile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const fileId = uuidv4();
        const file = req.file;
        const fileName = `${fileId}-${file.originalname} `;
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
        const userId = req.user.userId;
        const fileId= req.body.fileid;
        const result =await pool.query(`Select file_path from files where fileid=$1`,[fileId])
        if(!filePath)
            return res.status(404).json({
            message:'fail not found'
        })
        await pool.query(`Delete from files where fileid=$1`,[fileId]);   
        await fs.promises.unlink(result.rows[0].file_path);
        res.status(200).json({
            message:'fail deleted successfully'
        });
    }
    catch(error){
        console.log("error",error);
      res.status(500).json({
        message:'internal server error'
      });
    }
};



module.exports = {uploadFile,getFiles,deleteFiles};

