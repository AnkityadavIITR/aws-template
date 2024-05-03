import { S3Client, GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { config } from "dotenv";

config({});

const s3Client=new S3Client({
    region:'ap-south-1',
    credentials:{
        accessKeyId:process.env.AMAZON_S3_ACCESS_KEY,
        secretAccessKey:process.env.AMAZON_SECRET_ACCESS_KEY
    }
})

async function getObjectUrl(key){
    const command=new GetObjectCommand({
        Bucket:process.env.BUCKET_NAME,
        Key:key
    });
    const url= await getSignedUrl(s3Client, command);
    return url;
}

async function putObjectUrl(filename,fileType){
    const command=new PutObjectCommand({
        Bucket:process.env.BUCKET_NAME,
        Key:`uploads/user/${filename}`,
        ContentType:fileType
    })
    const url = await getSignedUrl(s3Client,command,{expiresIn:5*60});
    return url;
}

async function getObjectLink (){
    console.log("url for personalimage",await getObjectUrl("WIN_20220407_01_59_07_Pro.jpg"));
}

async function putObjectLink(){
    console.log("url to upload file by user", await putObjectUrl(`/images-${new Date()}`,"images/jpeg"));
}

// getObjectLink();
putObjectLink();