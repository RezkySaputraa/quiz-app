import {validate} from "../validation/validation.js";
import {getUserReview, sendReview} from "../validation/reviews-validation.js";
import {prismaClient} from "../application/database.js";


const post = async (req) => {
    const reviews = validate(sendReview, req)

    const existingReview = await prismaClient.reviews.findUnique({
        where: { user_id: reviews.username }
    });

    if (existingReview) {
        throw new Error('User can only have one review');
    }

    return prismaClient.reviews.create({
        data: {
            review: reviews.review,
            user_id: reviews.username
        }
    })
}

const get = async (username) => {
    const user = validate(getUserReview, username)

    const result = await prismaClient.reviews.count({
        where: {
            user_id: user
        }
    })

    return {result}
}

export default { post, get};