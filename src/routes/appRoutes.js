const express = require('express');
const router = new express.Router();
const controller = require('../controller/appController')
let routes = (app) => {
    try {
        //Admin SignUp
        router.post('/api/v1/student/add', controller.addStudent);
        router.post('/api/v1/student/addMarks', controller.addMarks);
        router.get('/api/v1/student/getMarks', controller.getMarks);
        app.use(router);    
    } catch (error) {
        console.log(error);
    }
};

module.exports = routes;