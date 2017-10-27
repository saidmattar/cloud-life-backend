# **Cloud Life**
## Backend Docs

![alt](http://www.techquarters.com/wp-content/uploads/backup_animation.gif)

## Description of our Service
Cloud Life is your life, in the cloud: a secure document storage solution for anyone who wants to keep their documents online.

Users can create accounts which allow them to upload documents, files, photos, and more to an online bucket on Amazon's S3. Users can also create and join groups, allowing them to quickly share files with other group members.

## Sample Use Cases
+ Use Cloud Life as a backup for your computer
+ Store all those photos of your vacations, kids, holidays, etc in the cloud without having to host them on a social media platform. Easily share with friends or family without requiring them to use Facebook, Instagram, etc.  
+ Keep tabs on your government records (such as birth certificates, immigration papers) in one easy place without risking them getting lost by officials or in the mail
+ Put your tax records in the cloud so they are easily accessible from year to year without digging through paperwork
+ Keep digital copies of documents, so you'll never lose them in a natural disaster (such as a flood or fire)
+ Upload important records (such as bank records, house deeds, etc) and create a group for your family members to handle inheritance or other end-of-life concerns

## How to Install
It's probably easiest to use our deployed frontend website, available at http://www.cloudlife.us.
If you're interested in just our backend, however, feel free to download our code. Make sure to npm install the many dependencies listed in our package.json using ```npm i```. Create a .env file including these values:
```
MONGO_URI=<your mongo database>

PORT = 3000 //or another port of your choice

CORS_ORIGINS = 'http://localhost:8080'//or another port of your choice

SECRET = '<your secret phrase>'

DEBUG = true

AWS_BUCKET = '<your AWS bucket name>'

AWS_SECRET_ACCESS_KEY = '<your AWS Secret Access Key>'

AWS_ACCESS_KEY_ID = '<your AWS Access Key>'
```
## How to Use
API calls can be made to various routes listed in the section below.

## Routes & Sample API Calls
### To signup as a user:
* Route: ```POST /signup```
* ```Headers:  Content-Type: application/json```
* Body:
```json
{
	"email": "sample@sample.com",
	"username": "sample",
	"password": "sample"
}
```


### To login a user:
* Route:  ```GET /login```
* Headers:  ```Authorization: basic auth```


### To create a user profile:
* Route:  ```POST /profile```
* ```Headers:  Content-Type: application/json and Authorization: Bearer {Token}```
* Body:
```json
{
	"bio": "sample",
	"firstName": "sample",
	"lastName": "sample",
	"alias": "sample",
	"priority": "sample",
	"safeStatus": "boolean"
}
```


### To get all profiles:
* Route:  ```GET /profiles```


### To get profile of authorized user:
* Route:  ```GET /profiles/me```
* Headers:  ```Authorization: Bearer {Token}```


### To get a specific profile:
* Route:  ```GET /profiles/:profile_id```


### To update user's profile:
* Route:  ```PUT /profile/:profile_id```
* ```Headers:  Content-Type: application/json and Authorization: Bearer {Token}```
* Body:
```json
{
	"bio": "sample",
	"firstName": "sample",
	"lastName": "sample",
	"alias": "sample",
	"priority": "sample",
	"safeStatus": "boolean"
}
```


### To delete user's profile:
* Route:  ```DELETE /profile/:profile_id```
* ```Headers: Authorization: Bearer {Token}```


### To create a group:
* Route:  ```POST /group```
* ```Headers:  Content-Type: application/json and Authorization: Bearer {Token}```
* Body:
```json
{
	"groupName": "Sample",
	"description": "Sample"
}
```


### To get all groups:
* Route:  ```GET /groups```

### To get a specific group:
* Route:  ```GET /group/:group_id```


### To update user's group:
* Route:  ```PUT /group/:group_id```
* ```Headers:  Content-Type: application/json and Authorization: Bearer {Token}```
* Body:
```json
{
	"groupName": "Sample",
	"description": "Sample",
	"docIds": "doc_id",
	"members": "profile_id"
}
```


### To delete user's group:
* Route:  ```DELETE /group/:group_id```
* ```Headers: Authorization: Bearer {Token}```


### To create a doc:
* Route ```POST /docs```
* ```Headers: Authorization: Bearer {Token}```
* Body:
- If you are going to use just this backend, we recommend using postman and selecting the file using ```form-data```.
```form-data
"files" : "any file type",
"description": "sample"
```

### To get all docs:
* Route ```GET /docs```


### To get a specific doc:
* Route ```GET /docs/:doc_id```


### To update a doc:
* Route ```PUT /docs/:doc_id```
* ```Headers: Authorization: Bearer {Token}```
* Body:
```json
{
	"description": "sample"
}
```


### To delete a doc:
* Route ```DELETE /docs/:doc_id```
* ```Headers: Authorization: Bearer {Token}```

## How to Report a Bug and/or Contribute to this Project
Bugs can be reported using Github issues on our repository. To create a new issue, simply click the green "New Issue" button, and add a description of the issue or bug, with a method for replication if possible.

If you would like to contribute to the project, feel free to fork our repository and create a pull request, which will be reviewed by one of our team members.

## Upcoming Features
With three team members and just four days, we didn't have time to get to every feature we'd like to build! Since we knew we would not have time to get to everything, we expanded our schemas to include details which could be used in future features, such as the "priority" or "safeStatus" keys on our Profile model. Future futures we'd like to implement include:
+ Passwords on individual documents for extra security
+ A "Mark Yourself as Secure" button, so you can easily update a group to your status in an emergency or natural disaster
+ Document expiration dates and/or permission-to-view inheritance dates
+ Integration with more services (Facebook, Instagram, Flickr, etc)

## Contributors:
Said, Michelle, Isaac

## Link to Frontend Docs
Interested in viewing the frontend for this project? Visit our website at: http://www.cloudlife.us
Interested in the frontend documents for this project? Check out our documents on [Github](https://github.com/saidmattar/cloud-life-frontend).

## About Us:
**Said:**

[LinkedIn Profile](https://www.linkedin.com/in/said-mattar/) | [View My Github](https://github.com/saidmattar)

Motivated former entrepreneur seeking a career in software sales and software development. Experienced in both back-end and front-end technologies with a passion for working with people and teams.

**Isaac:**

[LinkedIn Profile](https://www.linkedin.com/in/isaacheist/) | [View My Github](https://github.com/esack7)

Isaac Heist is a husband, father, worship pastor, web developer, and aspiring full-stack JavaScript developer. He also once built some pretty sweet kitchen cabinets. He speaks Spanish as a second language and really loves the country of Mexico. He enjoys playing guitar, spending time with his wife, playing with his four kids and tinkering around with computers.

**Michelle:**

[LinkedIn Profile](https://www.linkedin.com/in/mscharlock/) | [View My Github](https://github.com/mscharlock)

Michelle Scharlock is a Full Stack Javascript developer, with a passion for front-end and project management. A strategic thinker and planning powerhouse, she brings insight to the surface and translates dev-speak for the non-technical. Along with being fluent in JavaScript, Michelle speaks French, German, and Italian thanks to her background as an opera singer. In her spare time (ha!), she can be found hunting for antiques, taking ukulele lessons, and writing plays. Insatiably curious, she is probably raiding your local library right this minute.
