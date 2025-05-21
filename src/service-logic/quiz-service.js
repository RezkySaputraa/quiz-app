import {validate} from "../validation/validation.js";
import {
    answerQuestionValidation,
    getQuestionValidation, questionUserValidation,
} from "../validation/answer-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const get = async (request) => {
    const questionId = await validate(getQuestionValidation, request)

    const question = await prismaClient.quiz.findFirst({
        where: {
            id: questionId,
        },
        select: {
            id: true,
            question: true,
        }
    })

    if (!question) {
        throw new ResponseError(404, "Question not found.");
    }

    return question;
}

const post = async (request) => {
    const validateAnswer = validate(answerQuestionValidation, request)

    const result = await prismaClient.answer.count({
        where: {
            user_id: validateAnswer.user_id
        }
    })

    if (result) {
        throw new ResponseError(400, "Answer Already Submitted");
    }


    const dataInsert = validateAnswer.answers.map(answer => (
        {
            user_id: validateAnswer.user_id,
            quiz_id: answer.question_id,
            answer: answer.answer,
            createdAt: new Date().toISOString()
        }
    ))

    return prismaClient.$transaction(async () => {
            await prismaClient.answer.createMany({
                data: dataInsert
            })
        }
    )
}

const remove = async (username) => {
    const validateUsername = await validate(questionUserValidation, username)

    const answer = await prismaClient.answer.findMany({
        where: {
            user_id: validateUsername
        }
    })

    if (answer.length === 0) {
        return validateUsername
    }

    return prismaClient.$transaction(async () => {
        await prismaClient.answer.deleteMany({
            where: {
                user_id: validateUsername
            }
        })
    })
}

const getTimeAnswer = async (username) => {
    const validateUsername = await validate(questionUserValidation,username)

    const find = await prismaClient.answer.findFirst({
        where: {
            user_id : validateUsername
        },
        select: {
            user_id: true,
            createdAt: true
        }
    })

    if (!find) {
        throw new ResponseError(404, "Answer not found.");
    }

    return find
}

export default {get, post, remove, getTimeAnswer}