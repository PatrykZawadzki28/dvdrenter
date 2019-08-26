const router = require('express').Router();
const userController = require('../controllers/users');

/** 
 * @swagger
 * /Users:
 *  post:
 *      description: Registers user
 *      security: 
 *        tokenSeq: 
 *          - 'scope'
 *      consumes: "application/json"
 *      produces: "application/json"
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "CREATE!"
 *        required: true
 *        type: object
 *        schema:
 *           $ref: '#/definitions/User'
 */

router.post('/', userController.postRegisterUser);
router.get('/', userController.getLoginUser);

module.exports = router;