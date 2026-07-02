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

export {
    registerUser
}