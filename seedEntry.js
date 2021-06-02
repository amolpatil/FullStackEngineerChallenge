const bcrypt = require('bcryptjs');
const Employee = require('./models/Employee');

const seedEntry = async () => {
    let employee;
    try {
        employee = await Employee.findOne({ email: 'john.doe@ems.com'});
        
        if(!employee) {
            
            const seedAdmin = {
                name: 'John Doe',
                email: 'john.doe@ems.com',
                password: 'admin@123',
                isAdmin: true,
                empId: 1
            }
             employee = new Employee(seedAdmin);
            const salt = await bcrypt.genSalt(10);
            employee.password = await bcrypt.hash(seedAdmin.password, salt);
            
            await employee.save();
            console.log("seed employee created")
        }
    } catch(error) {
        console.log({message: error});
    }
}

module.exports = seedEntry;