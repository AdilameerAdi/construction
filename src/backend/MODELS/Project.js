const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Ongoing', 'Completed'], default: 'Pending' },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  projectDetails: {
    activities: [{
      _id: String,
      title: String,
      tasks: [{
        _id: String,
        title: String,
        startDate: String,
        endDate: String,
        days: String,
        performance: String,
        materials: [{
          material: String,
          qty: String
        }]
      }]
    }]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);