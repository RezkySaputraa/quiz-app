import Joi from "joi";

const sendReview = Joi.object({
    username: Joi.string().max(100).required(),
    review : Joi.string().max(100).required(),
})

const getUserReview = Joi.string().max(100).required();

export {sendReview, getUserReview}