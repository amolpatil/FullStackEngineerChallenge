const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const getEmployee = require('../../middleware/getEmployee');
const Employee = require('../../models/Employee');

// @route    GET api/employees
// @desc     Register employee
// @access   Private

router.get('/',
auth,
async (req, res)=> {
    const ObjectId = require('mongodb').ObjectId;
     try{
        let currentUser = await Employee.findOne({ _id : ObjectId(req.employee) });
        let employee;
        if(currentUser) {
            if(currentUser.isAdmin) {
                employee = await Employee.find({ isRemoved : false }).select(['-password', '-_id']);
            } else {
                employee = await Employee.find().select(['empId', 'name', 'feedback']);
            }
        } else {
            return res.status(200).json([]);
        }
       
        

        if(!employee) {
            return res.status(401).json([]);
        }
        res.json(employee)
        

    } catch(error) {
        console.log(error);
        res.status(500).send("server error")
    }
});


// @route    POST api/employees
// @desc     Register employee
// @access   Private

router.post('/',
check('name', 'Name is required').notEmpty(),
check('email', 'Please enter valid email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
check('isAdmin','Access type is required').isBoolean(),
auth,
async (req, res)=> {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }

    const { name, email, password, isAdmin, feedback, review_assignments } = req.body;

    try{
        const count =  await Employee.countDocuments({ });

        let employee = await Employee.findOne({ email });

        if(employee) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        employee = new Employee({
            name, 
            email,
            password,
            isAdmin,
            empId: count + 1    
        });

        const salt = await bcrypt.genSalt(10);
        employee.password = await bcrypt.hash(password, salt);

        await employee.save();

        res.json({message: 'user created successfully'});

    } catch(error) {
        console.log(error);
        res.status(500).send("server error")
    }

    
});


// @route    PATCH api/employees
// @desc     Update user
// @access   Private

router.patch('/:id', auth, getEmployee, async (req, res) => {
    
    const ObjectId = require('mongodb').ObjectId;
    try {
        let currentUser = await Employee.findOne({ _id : ObjectId(req.employee) });
        
        
            for(let prop in req.body) {
                if(prop !== 'feedback') {
                    res.employee[prop] = req.body[prop];
                }
            }            
            for(let prop in req.body.feedback) {                
                res.employee.feedback[prop] = req.body.feedback[prop];
            }
            
            //res.employee.review_assignments.push(res.employee.empId);

            await res.employee.save();
            res.status(201).json({message: 'Employee details updated successfully'});
        
    } catch(error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
    
});


// @route    DELETE api/employees
// @desc     Update user
// @access   Private

router.delete('/:id', auth, getEmployee, async (req, res) => {
    console.log(req.employee)
    const ObjectId = require('mongodb').ObjectId;
    try {
        let currentUser = await Employee.findOne({ _id : ObjectId(req.employee) });
        
        if(currentUser && currentUser.isAdmin) {            
            res.employee.isRemoved = true;
            await res.employee.save();
            res.status(201).json({message: 'Employee deleted successfully'});
        } else {
            res.status(400).json({message: 'Access denied'});
        }
    } catch(error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
    
});

// @route    GET api/employees
// @desc     Update user
// @access   Private

router.get('/:id', auth, getEmployee, async (req, res) => {
    
    const ObjectId = require('mongodb').ObjectId;
    try {
        let currentUser = await Employee.findOne({ _id : ObjectId(req.employee) });
        
        if(currentUser.isAdmin) {           
           res.status(201).json(res.employee);           
        } else {
            const {empId, email, feedback } = res.employee;
            res.status(400).json({empId, email, feedback });
        }
    } catch(error) {
        console.log("wow",error);
        res.status(400).json({message: error.message});
    }
    
});

// async function getEmployee(req, res, next) {
//     let employee;
//     try {
//         employee = await Employee.findOne({ empId: req.params.id}).select(['-password']);
        
//         if(employee == null) {
//             return res.status(404).json({message: "Cannot find employee"})
//         }
//     } catch(error) {
//         return res.status(500).json({message: error});
//     }

   
//     res.employee = employee;
//     next();
// }


module.exports = router;


