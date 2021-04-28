import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const createToken = (data, dataName, expriesTime) => {

    return jwt.sign(
        { [dataName]: data },
        process.env.SECRET,
        { expiresIn: expriesTime }
    );
}


export const register = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    if (await User.findOne({ email })) {
        res.status(400)
        throw new Error('Username already taken, Please try another')
    }
    else {
        const { _id } = await User.create(
            { email, password, name });

        res.cookie('token', createToken(_id, 'userId', '20h'), { httpOnly: true })
            .status(200)
            .json({ name, email, isAdmin: false });
    }
});

export const login = asyncHandler(async (req, res) => {
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email })
    if (!user || !(await user.isCorrectPassword(password))) {
        res.status(401)
        throw new Error('Incorrect username or password')
    }
    res.cookie('tshopPref', createToken(remember, 'remember', '7w'), { httpOnly: true })
    res.cookie('token', createToken(user._id, 'userId', '20h'), { httpOnly: true })
        .status(200)
        .json({ name: user.name, email, isAdmin: user.isAdmin });
})

export const logout = (req, res) => {
    res.clearCookie('tshopPref')
    res.clearCookie('token').sendStatus(200)
};

export const isLoggedIn = async (req, res) => {
    try {
        const { token, tshopPref } = req.cookies;
        jwt.verify(token, process.env.SECRET)
        jwt.verify(tshopPref, process.env.SECRET)
        const { userId } = jwt.decode(token);
        const { remember } = jwt.decode(tshopPref);
        if (!remember)
            throw new Error()
        const { name, email, isAdmin } = await User.findById(userId)
        res.status(200).json({ isLoggedIn: true, email, name, isAdmin })
    }
    catch (e) {
        res.clearCookie('tshopPref')
        res.clearCookie('token').json({ isLoggedIn: false }).status(200)
    }
};

export const updateProfile = asyncHandler(async (req, res) => {

    const { name, email, password, userId } = req.body
    const user = await User.findById(userId)
    if (user) {
        user.name = name || user.name
        // user.email = email || user.email
        // if (password)
        //     user.password = password
        await user.save()
        res.json({
            name: name,
            // email: email,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('_id name email isAdmin')
    res.json(users).status(200)
})


export const updateUser = asyncHandler(async (req, res) => {

    const { name, email, isAdmin } = req.body
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        user.isAdmin = isAdmin

        await user.save()
        const users = await User.find({}).select('_id name email isAdmin')
        res.json(users).status(200)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.deleteOne()
        const users = await User.find({}).select('_id name email isAdmin')
        res.json(users).status(200)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
