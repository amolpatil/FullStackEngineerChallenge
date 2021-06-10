# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.


# EMS - EMPLOYEE MANAGEMENT SYSTEM
EMS is employee and their performance management tool

## Assumptions for Admin
* Admin is a super user and is an employee
* Admin can create new Admin employees with same rights
* Admin can Add/remove/update/remove employee
* Admin can add/update/view perfomance and assign to others
* if Admin doen't allocate review, it will be assigned to admin by default

## Asumptions for an Employee who is not an Admin
* List of performance reviews requiring feedback
* employee can see list of reviews assigned to him/her
* Submit feedback

## Technology overview

### Design and technologies
![Image of design](https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png)

### Frontend technologies
* [React](https://github.com/facebook/react)
* [axios](https://github.com/axios/axios)
* css and media queries

### backend side texhnologies
* [ExpressJS](https://github.com/expressjs/express)
* [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [mongoDB](https://www.mongodb.com/)

## Installations
* run 'npm install' at root level (for server)
* Create default.json in config folder at root, replace your username/password for mongodb
{
    "mongoURI": "mongodb+srv://<username>:<password>@************?retryWrites=true&w=majority",
    "jwtSecret" : "putYourSecretKey"
}
* run 'npm install' at client folder ( for frontend)
* at root run 'npm run dev' to start server

##Demo
* Admin user is created as a seed entry for first time when code is run
* john.doe@ems.com/admin@123

