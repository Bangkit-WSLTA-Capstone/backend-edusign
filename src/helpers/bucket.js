const {Storage} = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();

const pathKey =  process.env.ENVIRONMENT == "production" ? __dirname + '/bucket-credentials.json' : path.resolve('./bucket-credentials.json');

const gcs = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: pathKey
});

const bucket = gcs.bucket(process.env.BUCKET_NAME);

module.exports = bucket;