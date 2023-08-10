const AWS = require("aws-sdk");
const uuid = require("uuid")

class FileService {
    S3Client
    constructor() {
        this.S3Client = new AWS.S3()
    }

    generateUniqueFileName(filename) {
        const uniqueName = uuid.v4()
        const fileType = filename.split(".")[1]
        return `${uniqueName}.${fileType}`
    }

    selectFileKey(filename) {
        return  filename.slice(filename.lastIndexOf("/") + 1)
    }

    async uploadFile(file, bucketName) {
        if(!file) return ""
        const params = {
            Bucket: bucketName,
            Key: this.generateUniqueFileName(file.originalname),
            Body: file.buffer,
        };

        const { Location } = await this.S3Client.upload(params).promise();
        return Location;
    }

    async getFile(bucketName, key){
        const params = {
            Bucket: bucketName,
            Key: this.selectFileKey(key),
        };

        const data = await this.S3Client.getObject(params).promise();
        return data.Body;
    }

    async deleteFile(bucketName, key) {
        if(!key) return
        const params = {
            Bucket: bucketName,
            Key: this.selectFileKey(key),
        };

        await this.S3Client.deleteObject(params).promise();
    }

}

module.exports = new FileService()