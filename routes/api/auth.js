const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const Employee = require('../../models/Employee');

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public

router.post('/',
check('email', 'Please enter valid email').isEmail(),
check('password', 'Password is required').exists(),
async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let employee = await Employee.findOne({ email });

        if(!employee) {
            return res.status(400).json({error: {msg: 'Invalid credentials'}});
        }

        const isMatch = await bcrypt.compare(password, employee.password);

        if(!isMatch) {
            return res.status(400).json({error: {msg: 'Invalid credentials'}});
        }

        const payload = {
            employee: employee.id
        }
        
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn : '5 days'},
            (err, token) => {
                if(err) throw err;
                res.json({ token, isAdmin: employee.isAdmin, name: employee.name, empId: employee.empId });
            }
        )

    } catch(error) {
        console.log(error);
        res.status(500).send('server error');
    }
});





module.exports = router;