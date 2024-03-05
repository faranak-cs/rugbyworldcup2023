# Rugby World Cup Website
Data driven component-based website built using Meta’s ReactJS library for front-end components, Express.js for building RESTful API with Node.js, Postman for API testing and MySQL database following a three-tier architecture.
# How to Run
1. Install XAMPP. Start Apache and MySQL module from XAMPP Control Panel.
2. Download SQL database files provided in folder `rugbyworldcup2023/database/`.
3. Open MySQL admin from XAMPP Control Panel and import both SQL databases.
4. Now MySQL server is running on localhost.
5. Install Node.js to setup REST API server and React server.
6. Download the project repository.
7. Open both folders `rugbyworldcup2023/rest-api-server` and `rugbyworldcup2023/react-components`  separately in Windows Terminal.
8. Enter the following command in the REST API folder terminal to run REST API server:
```
node index.js
```
9. Now REST API server is running on localhost.
10. Enter the following commands in the React folder terminal:
```
npm install
```
```
npm run dev
```
11. Now React server is running on localhost.
12. Website is up and running by implementing three-tier architecture. Thanks :)
# Login 
Use the following login credentials for the website:

**email:** `admin@test.com`
**password:** `test123`
