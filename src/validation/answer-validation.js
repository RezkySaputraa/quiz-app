import Joi from 'joi';

const getQuestionValidation = Joi.number().positive().required();

const answerQuestionValidation = Joi.object({
    user_id: Joi.string().max(100).required(),
    answers: Joi.array().items(
        Joi.object({
            question_id: Joi.number().positive().required(),
            answer: Joi.string().valid("Bunga","Perkakas","Burung","Kesenian","Binatang").required()
        })
    ).min(20).max(20).required(),
})

const questionUserValidation = Joi.string().max(100).required();

export {getQuestionValidation, answerQuestionValidation, questionUserValidation}