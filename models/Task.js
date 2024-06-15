import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
  created_at: { type: Date, default: Date.now },
  completed_at: { type: Date }
});

taskSchema.pre('save', function(next) {
  if (this.isModified('completed') && this.completed) {
    this.completed_at = new Date();
  } else if (!this.completed) {
    this.completed_at = null;
  }
  next();
});

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
