const User = require("../model/user");
const registerUser = async (clerkId, firstName, lastName, email) => {
  try {
    const existingUser = await User.findOne({ clerkId, email });
    if (existingUser) {
      return {
        success: false,
        statusCode: 409,
        message: "User already exists",
      };
    }
    const newUser = new User({
      clerkId,
      firstName,
      lastName,
      email,
    });
    console.log("New User: ", newUser);
    await newUser.save();
    console.log("New user saved");
    return {
      success: true,
      statusCode: 201,
      message: "User created successfully",
      user: newUser,
    };
  } catch (error) {
    console.error("Error creating User:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

const getUserId = async (clerkId) => {
  try {
    // Assuming User is a MongoDB model
    const user = await User.findOne({ clerkId: clerkId }).exec();
    if (user) {
      return user._id; // or user.id depending on your schema
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    throw new Error("Failed to retrieve user ID");
  }
};

module.exports = { registerUser, getUserId };
