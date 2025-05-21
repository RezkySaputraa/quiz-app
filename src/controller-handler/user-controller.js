import userService from "../service-logic/user-service.js";

const registrate = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const signup = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)

        res.cookie('token', result.token, {
            httpOnly: false, // ini bagus nya di "true" kan agar dri browser gabisa ngambil, tpi karna dev maka di false untuk contoh gunain token ke web
            maxAge: 2400000,
            sameSite: "Lax",
            secure: false,
        })

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const dapat = async (req, res, next) => {
    try {
        const {username} = req.user
        const result = await userService.get(username)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const perbarui = async (req, res, next) => {
    try {
        const {username} = req.user
        const request = req.body
        request.username = username

        const result = await userService.update(request)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const keluar = async (req, res, next) => {
    try {
        res.clearCookie('token', {httpOnly:true});
        res.status(200).json({
            message: 'OK'
        })
    } catch (e) {
        next(e)
    }
}

// const hapus = async (req, res, next) => {
//     try {
//         const {username} = req.user
//         await userService.deleteAccount(username)
//         res.clearCookie('token', {httpOnly:true});
//
//         res.status(200).json({
//             message: 'OK'
//         })
//     } catch (e) {
//         next(e)
//     }
// }

export default {registrate, signup, dapat, perbarui, keluar}