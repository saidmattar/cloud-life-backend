# Cloud Life Backend Docs
//Link to our front-end docs//
//Shield.io badges, show test coverage %//

## Table of Contents

## Contributors:
Said, Michelle, Isaac

## Description of our Service
Cloud Life is your life, in the cloud: a secure document storage solution for anyone who wants to keep their documents online.

Users can create accounts which allow them to upload documents, files, photos, and more to an online bucket on Amazon's S3. Users can also create and join groups, allowing them to quickly share files with other group members.

## How to Install
It's probably easiest to use our deployed frontend website, available at //TODO: DEPLOYED URL//.
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

## Sample Use Cases
+ Use Cloud Life as a backup for your computer
+ Store all those photos of your vacations, kids, holidays, etc in the cloud without having to host them on a social media platform. Easily share with friends or family without requiring them to use Facebook, Instagram, etc.  
+ Keep tabs on your government records (such as birth certificates, immigration papers) in one easy place without risking them getting lost by officials or in the mail
+ Put your tax records in the cloud so they are easily accessible from year to year without digging through paperwork
+ Keep digital copies of documents, so you'll never lose them in a natural disaster (such as a flood or fire)
+ Upload important records (such as bank records, house deeds, etc) and create a group for your family members to handle inheritance or other end-of-life concerns

## How to Report a Bug and/or Contribute to this Project
Bugs can be reported using Github issues on our repository. To create a new issue, simply click the green "New Issue" button, and add a description of the issue or bug, with a method for replication if possible.

If you would like to contribute to the project, feel free to fork our repository and create a pull request, which will be reviewed by one of our team members.

## Upcoming Features
With three team members and just four days, we didn't have time to get to every feature we'd like to build! Since we knew we would not have time to get to everything, we expanded our schemas to include details which could be used in future features, such as the "priority" or "safeStatus" keys on our Profile model. Future futures we'd like to implement include:
+ Passwords on individual documents for extra security
+ A "Mark Yourself as Secure" button, so you can easily update a group to your status in an emergency or natural disaster
+ Document expiration dates and/or permission-to-view inheritance dates
+ Integration with more services (Facebook, Instagram, Flickr, etc)

## FAQs

## Link to Frontend Docs
Interested in viewing the frontend for this project? Visit our website at: //TODO: Insert this//
Interested in the frontend documents for this project? Check out our documents on [Github](https://github.com/saidmattar/cloud-life-frontend).

## About Us
Said:

Isaac:

Michelle:

LinkedIn Profile | View My Github

Michelle Scharlock is a Full Stack Javascript developer, interested in becoming a Technical Program Manager. A strategic thinker and planning powerhouse, she brings insight to the surface and translates dev-speak for the non-technical. Along with being fluent in JavaScript, Michelle speaks French, German, and Italian thanks to her background as an opera singer. In her spare time (ha!), she can be found hunting for antiques, taking ukulele lessons, and writing plays. Insatiably curious, she is probably raiding your local library right this minute.
