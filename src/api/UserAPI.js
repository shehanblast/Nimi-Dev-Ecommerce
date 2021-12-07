const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');
const auth =require('../middleware/auth/auth');
const auth1 =require('../middleware/auth/auth1');

module.exports = function () {
    router.post('/register',controller.addUsers );
    router.post('/activate',controller.UserActiveEmail );
    router.get('/', auth,controller.getSpecificUser);
    router.post('/login',controller.login);
    router.put('/update',auth,controller.updateProfile);
    router.delete('/delete/:id',auth,controller.deleteUsers);
    router.post('/forgot_password',controller.forgotPassword);
    router.post('/reset_password',auth1,controller.resetPassword);
    router.get('/all',auth,controller.getUserAll);
    router.post('/update_password/:id',controller.ResetPasswordUser);
    router.get('/:id', controller.getSpecificAdminUsers);
    return router;
}