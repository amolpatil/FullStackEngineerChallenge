const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    empId: {
        type: String,
        unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    isRemoved: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    feedback: {        
        comment : {
          type: String,
          default: ''
        },
        rating: {
          type: Number,
          default: 1
        },
        isDone: {
            type: Boolean,
            default: false
        },
        assignedTo: {
          type: String,
          default: 'Admin'
        }
    },
    date : {
      type: Date,
      default: new Date()
    }
    // review_assignments: [{
    //   type: String
    // }]
    
});

module.exports = mongoose.model('employee', employeeSchema);