import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required().messages({
        'string.base': `Username harus berupa string`,
        'string.max': `Username tidak boleh lebih dari {#limit} karakter`,
        'any.required': `Username wajib diisi`,
    }),
    name : Joi.string().max(100).required().messages({
        'string.base': `Nama harus berupa string`,
        'string.max': `Nama tidak boleh lebih dari {#limit} karakter`,
        'any.required': `Nama wajib diisi`,
    }),
    birth_date : Joi.date().required().messages({
        'date.base': `Tanggal lahir harus valid`,
        'any.required': `Tanggal lahir wajib diisi`,
    }),
    age : Joi.number().max(100).required().messages({
        'string.base': `Umur harus berupa angka`,
        'string.max': `Umur tidak boleh lebih dari {#limit} karakter`,
        'any.required': `Umur wajib diisi`,
    }),
    motivation : Joi.string().max(100).required().messages({
        'string.base': `Motivasi harus berupa string`,
        'string.max': `Motivasi tidak boleh lebih dari {#limit} karakter`,
        'any.required': `Motivasi wajib diisi`,
    }),
    password: Joi.string().max(100).required().messages({
        'string.base': `Password harus berupa string`,
        'string.max': `Password tidak boleh lebih dari {#limit} karakter`,
        'any.required': `Password wajib diisi`,
    }),
})

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
})

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    name : Joi.string().max(100).optional(),
    birth_date : Joi.date().optional(),
    age : Joi.string().max(100).optional(),
    motivation : Joi.string().max(100).optional(),
    password: Joi.string().max(100).optional(),
})

export {registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation}