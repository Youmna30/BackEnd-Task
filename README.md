# BackEnd-Task

# Requirement

1- node <br />
2- npm <br />
3- mysql <br />

# Build the project

1- clone the project  
2- cd to the project folder  
3- run npm install  
4- Create your own database on your pc and in the folder of the project there a db-config.js file, this file contains database name DB_NAME, database username DB_USERNAME,
database password DB_PASSWORD, you can change them to whatever have on your pc.    
5- run npm start to start your project it will run on port 3000 you can find it on http://localhost:3000  

# About the project
1- To list all the products in a specific category just send category params in get request of product-provider folder in the attached postman URL will return all the products sorted by the lowest price in this category. <br />
2- All get requests have pagination just send limit and page in params by default limit is 25, if you want to change it just send the number you want. <br />
3 To (Set / Unset ) featured product just use a featured variable inside product model by defult this featured variable is false if you want to change it just send true in the request body while creating if you want to update it just use update request in product folder to set it as featured send featured by true to unset it send featured by false.  <br />

# Postman URL

1- https://documenter.getpostman.com/view/6964270/Tz5wXuvJ <br />
2- https://www.getpostman.com/collections/49dab00fc237b3890515
