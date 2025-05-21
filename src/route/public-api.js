import express from 'express';
import userController from '../controller-handler/user-controller.js'

const publicRouter = new express.Router()

publicRouter.post('/api/users', userController.registrate)
publicRouter.post('/api/users/login', userController.signup)

export {publicRouter}