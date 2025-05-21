import quizService from "../service-logic/quiz-service.js";

const getQuestion = async (req, res, next) => {
    try {
        const questionId = req.params.id;
        const result = await quizService.get(questionId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const postAnswer = async (req, res, next) => {
    try {
        const {username} = req.user
        const request = req.body;
        request.user_id = username
        await quizService.post(request)
        res.status(200).json({
            message: "Answer Successfully Submit"
        })
    } catch (e) {
        next(e)
    }
}

const removeAnswer = async (req, res, next) => {
    try {
        const {username} = req.user
        const result = await quizService.remove(username);

        if (result) {
            return res.status(204).end()
        }

       return res.status(200).json({
            message: "Answer Successfully Removed"
        })

    } catch (e) {
        next(e)
    }
}

const getAnswer = async (req, res, next) => {
    try {
        const {username} = req.user
        const result = await quizService.getTimeAnswer(username);

        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {getQuestion, postAnswer, removeAnswer, getAnswer}