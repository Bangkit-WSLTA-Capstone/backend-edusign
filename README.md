# Bangkit Capstone Project - Edusign (Backend)

This is the main backend service for the Edusign application. This service acts as the gateway for incoming request and outgoing response for the backend system. 

# Not accepting outside party contribution

This project is created to fulfill the requirements of Bangkit Academy 2024 batch 1's Capstone Project. We greatly appreciate the enthusiasm of those who would like to contribute. However, according to the rules, we are not allowed to accept help from outside parties. The public visibility of this repository is simply to allow the Bangkit team reviewer to review our project. Any and all pull request to this repository coming from outside parties will be rejected and closed. We thank you for your understanding.

# Installation guide
- Clone this repository
- Run `npm install` to install dependency
- Create `.env` file with the following content
> JWT_SECRET_KEY  
> ENVIRONMENT ("Development" if deployed)  
> DB_HOST  
> DB_USER  
> DB_PASSWORD  
> DB_NAME  
> HOST  
> PORT  
> PROJECT_ID  
> BUCKET_NAME  
> ML_API_URL  
- Generate a key for a service account to access GCS bucket and name it `bucket-credentials.json`
- Run `npm run start` or `npm run start-nodemon`

# Libraries used
- **@google-cloud/storage**: Connection to google cloud storage bucket
- **@hapi/hapi**: Main framework
- **@hapi/jwt**: Authentication system using JWT
- **axios**: Request to ML API
- **bcrypt**: Password encrytion
- **date-fns**: Datetime generator
- **dotenv**: Environment variable loader
- **mysql**: Connection to MySql database, local and remote
- **nodemon**: For development



# API Documentation
The following is the documentation for our API divided to each categories. Every endpoint has "/api" appended to the front. The endpoints marked as protected requires the user to login before being able to call the API.
## Authentication
### /login
**Endpoint for authenticating user account**  
Method: POST  

Body:  
> username: string, required  
> email: string, required  
> password: string, required  

Response status 200 (Success):
> status: true  
> message: "Success message"  
> data: access & refresh tokens
>> access: string, expires in 5 minutes  
>> refresh: string, expires in 7 days  

Response status 400 (Invalid payload):
> status: false  
> message: "Error message"  

---
### /register
**Endpoint for registering user account**  
Method: POST  

Body:  
> username: string, required  
> email: string, required  
> password: string, required  

Response status 200 (Success):
> status: true  
> message: "Success message"  
> data: account
>> id: integer  
>> username: string  
>> email: string  
>> created_at: timestamp  
>> updated_at: timestamp

Response status 400 (Invalid payload):
> status: false  
> message: "Error message"  

---
### /refresh (Protected)
**Endpoint for refreshing access token**  
Method: POST
Header: `{Authorization: Access code}`

Response status 200 (Success):
> status: true  
> message: "Success message"  
> data: string, access token (expires in 5 minutes)

Response status 401 (Invalid credential):
> status: false  
> message: "Error message"

## Course & Dictionary
### /course
**Endpoint for fetching list of all courses**  
Method: GET

Response status 200 (Success):
> status: true  
> message: "Success message"  
> data: array of courses
>> id: integer  
>> coursename: string  
>> filelink: string  
>> title: string  
>> description: string  
>> created_at: timestamp  
>> updated_at: timestamp
---
### /course/{fileName}
**Endpoint for fetching course content**  
Method: GET

Parameter:  
> fileName: string, required  

Response status 200 (Success):
> "Course markdown content in raw text format"

Response status 400 (Invalid parameter):
> status: false  
> message: "Error message"
---
### /refresh/{letter}
**Endpoint for fetching letter object reference**  
Method: GET

Parameter:  
> letter: string, required  

Response status 200 (Success):
> status: true  
> message: "Success message"  
> data: array of courses
>> id: integer  
>> letter: string  
>> filelink: string   
>> created_at: timestamp  
>> updated_at: timestamp

Response status 400 (Invalid parameter):
> status: false  
> message: "Error message"

## Translation
### /translate (Protected)
**Endpoint for translating video into text**  
Method: POST  
Header: `{Authorization: Access code}`

Body:
> video: multipart/form-data video stream

Response status 200 (Success):
> status: true  
> message: "Success message"  
> data: translation history
>> id: integer  
>> userid: string  
>> filelink: string   
>> result: string
>> created_at: timestamp  
>> updated_at: timestamp

Response status 400 (Invalid payload):
> status: false  
> message: "Error message"

Response status 401 (Invalid credential):
> status: false  
> message: "Error message"
---
### /translate (Protected)
**Endpoint for fetching all translation history of a user**  
Method: GET  
Header: `{Authorization: Access code}`

Response status 200 (Success):
> status: true  
> message: "Success message"  
> data: Array of translation histories
>> id: integer  
>> userid: string  
>> filelink: string   
>> result: string
>> created_at: timestamp  
>> updated_at: timestamp

Response status 401 (Invalid credential):
> status: false  
> message: "Error message"

# Deployment link
[Backend-edusign deployment](https://edusign-2frcv7abha-et.a.run.app/)
(Maybe down in the future)

# Additional notes
- We have provided a cloudbuild.yaml for continuous deployment to cloud run
- For production environment, put `bucket-credentials` in the `stc/helpers` directory, otherwise put it in the project root

# Authors
This project is developed by the Cloud Computing division of C241-PS015 Bangkit Capstone Team

1. C010D4KY1114 - Kade Satrya Noto Sadharma
2. C253D4KY1157 - Wahyu Fardiansyach