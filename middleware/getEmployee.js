const Employee = require('../models/Employee');

const getEmployee = async function(req, res, next) {
    let employee;
    try {
        employee = await Employee.findOne({ empId: req.params.id}).select(['-password']);
        
        if(employee == null) {
            return res.status(404).json({message: "Cannot find employee"})
        }
    } catch(error) {
        return res.status(500).json({message: error});
    }

   
    res.employee = employee;
    next();
}

module.exports = getEmployee;