import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/ayncHandler.js"
import { User } from "../models/user.models.js"

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, email, password } = req.body
    if ([username, fullname, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(404, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(404, "User with email or username already exists ")
    }
    const user = await User.create({
        username,
        fullname,
        email,
        password
    })
    const createdUser = await User.findById(user._id).select(
        "-_id -password -username -avatar -coverImage -watchHistory -__v"
    )

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: createdUser },
                "User Created Succesfully"
            )
        )


})

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User Not Found")
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { refreshToken, accessToken },
                    "Tokens Generated Successfully"
                )
            )
    } catch (error) {
        throw new ApiError(404, "Tokens not Generated")
    }
}

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body

    if (!email && !password) {
        throw new ApiError(404, "Email or Password is required")
    }
    const user = await User.findOne(email)
    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    const isPasswordValid = user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(404, "Invalid Credentials")
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshToken(user._id)


    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, refreshToken, accessToken },
                "User Logged In "
            )
        )



})

export {
    registerUser,
    loginUser
}