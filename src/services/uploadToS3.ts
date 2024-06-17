import { S3 } from "aws-sdk";
import fs from 'fs';
import config from "../config";

/**
 * @name uploadToS3
 * @type {Function}
 * @param {S3} s3 
 * @param {File} fileData 
 * @description it uploads the file to the bucket
 * @returns {Promise<{success:boolean; message: string; data: object;}>}
 * @author messaismael
*/
export const uploadToS3 = async (s3: S3, fileData: Express.Multer.File) => {
  try {
    const fileContent = fs.readFileSync(fileData!.path);

    const params = {
      Bucket: config.bucket_name,
      Key: fileData!.originalname,
      Body: fileContent
    };

    try {
      const res = await s3.upload(params).promise();
      console.log("File Uploaded Successfully", res.Location);

      // Delete the file from local storage
      fs.unlinkSync(fileData!.path);
      console.log("File deleted from local storage");

      return { success: true, message: "File Uploaded Successfully", data: res.Location };
    } catch (error: any) {
      console.log(`The error is ${error?.message}`);
      return { success: false, message: "Unable to upload the file", data: error };
    }
  } catch (error: any) {
    console.log('and the error is ' + JSON.stringify(error?.message));
    return { success: false, message: "Unable to access this file", data: error };
  }
};
