const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo')

/**
 * Route for fetching all todo tasks
 */
router.get('/',todoController.fetchAllTasks)
/**
 * Route for creating a new task
 */
router.post('/create-todo',todoController.createTask)
/**
 * Route for delete an existing task
 */
router.post('/delete',todoController.deleteTask)
/**
 * Route for modifying the complete status of a task
 */
router.post('/complete',todoController.markComplete)
module.exports=router