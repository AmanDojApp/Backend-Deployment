// ==================== src/services/userService.js ====================
const User = require('../models/userModel');

class UserService {
  async getAllUsers() {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email already exists');
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      // Remove password from update if present and empty
      if (userData.password === '') {
        delete userData.password;
      }

      const user = await User.findByIdAndUpdate(
        id,
        userData,
        { 
          new: true, 
          runValidators: true 
        }
      );
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email already exists');
      }
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user ? true : false;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = new UserService();