
import {User} from '../models/user.models.js'
import {asyncHandler}from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const generateAccessAndRefreshTokens =async (userId) => {
  try {
      const user= await User.findById(userId)
       if (!user) {
      throw new ApiError(404, "User not found")
    }
     const accessToken= user.generateAccessToken()
     const refreshToken= user.generateRefreshToken()

     user.refreshToken =refreshToken
    await user.save({validateBeforeSave:false})

    return {accessToken, refreshToken}



  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
  }
}

const signup =asyncHandler( async(req, res) =>{
     const { username, email, password, role = 'user' } = req.body;

      // 1. Validation
  if (!username || !email || !password) {
    throw new ApiError(400, 'Name, email and password are required');
  }

  // 2. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }


  // 3. Create user
  const user = await User.create({
    username,
    email,
    password,
    role,
    createdAt: new Date()
  });

  // 4. Generate JWT
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  // 5. Response (never send password)
  return res.status(201).json(
    new ApiResponse(201, {
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role
         },
      accessToken,
      refreshToken
    }, 'Signup successful')
  );
})


const login = asyncHandler(async (req,res) => {
      const {email,password}= req.body;
      // 1. Validate input
    if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  // 2. find user by email
  const user= await User.findOne({email}) 
  if(!user){
    throw new ApiError(404,"User not found")

  } 
  //3. verify the password
  const isPasswordCorrect= await user.isPasswordCorrect(password);
  if(!isPasswordCorrect){
    throw new ApiError(401,"Invalid credentials")
  }

  // 4. Generate Tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

     // 5. Response (never send password)
  return res.status(200).json(
    new ApiResponse(200, {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    }, "Login successful")
  );
});

const logout= asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: null } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
    
})

const uploadProfilePic = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!req.file?.path) {
    throw new ApiError(400, "No image file uploaded");
  }

  user.profilePic = req.file.path; // Cloudinary URL
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { profilePic: user.profilePic }, "Profile picture uploaded successfully"));
});



export {
  signup,
  login,
  logout,
  uploadProfilePic
}