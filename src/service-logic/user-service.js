import {validate} from "../validation/validation.js";
import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation
} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req) => {
    const user = validate(registerUserValidation,req)

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, "User already exists");
    }

    user.password = await bcrypt.hash(user.password, 10)
    user.age = String(user.age);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })
}

const login = async (req) => {
    const loginRequest = validate(loginUserValidation, req)

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    })

    if (!user) {
        throw new ResponseError(401, "Username or Password wrong");
    }

    const isPassword = await bcrypt.compare(loginRequest.password, user.password)

    if (!isPassword) {
        throw new ResponseError(401, "Username or Password wrong");
    }

    const token = jwt.sign({
        username:user.username
    }, process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES})

    return {token}
}

const get = async (request) => {
    const user = validate(getUserValidation, request)

    const userFind = await prismaClient.user.findUnique({
        where: {
            username: user
        },
        select: {
            username: true,
            name: true,
            birth_date: true,
            age: true,
            motivation: true,
        }
    })

    if (!userFind) {
        throw new ResponseError(404, "Username is not found");
    }

    return userFind
}

const update = async (req) => {
    const user = validate(updateUserValidation, req)

    const data = {}

    if (user.name) {
        data.name = user.name
    }
    if (user.birth_date) {
        data.birth_date = user.birth_date
    }
    if (user.age) {
        data.age = user.age
    }
    if (user.motivation) {
        data.motivation = user.motivation
    }
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10)
    }

    return prismaClient.user.update({
        where : {
            username: user.username,
        },
        data: data,
        select: {
            username: true,
            name: true
        }
    })
}

// const deleteAccount = async (username) => {
//     const user = validate(getUserValidation, username)
//
//     const totalInDatabase = await prismaClient.user.count({
//         where: {
//             username: user
//         }
//     })
//
//     if (totalInDatabase !== 1) {
//         throw new ResponseError(404, "Username is not found");
//     }
//
//     return prismaClient.user.delete({
//         where: {
//             username: user
//         }
//     })
// }

export default {register, login, get, update}