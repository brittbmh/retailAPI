
myRetail RESTful service

myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast. This application will make its internal data available to any number of client devices, from myRetail.com to native mobile apps. 

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## Create database and table

1. Make a new database `retail_api` with robo 3T.
2. In Terminal, navigate to the project folder.
3. Run this command: `mongoimport --db retail_api --collection products --file products.js`

## Development Setup Instructions

* Run `npm install`
* Run `node index.js`

## Test Application

run a GET query by id:
http://localhost:5000/api/products/(id)

Put query to update id: 
http://localhost:5000/api/products
parameters:
{ "id": (id), "new_price": (new price)} 
where new price is a number

Example product IDs: 12149250, 12110209, 52349598, 52343339, 53782617, 53192988, 53741474, 53306858, 14168377