import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User interface
export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  name?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
} as mongoose.SchemaOptions<IUser>);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Export User model
export const User = mongoose.model<IUser>('User', userSchema); 