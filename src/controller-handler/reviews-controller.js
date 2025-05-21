import reviewService from "../service-logic/reviews-service.js";

const postReview = async (req, res, next) => {
    try {
        const {username} = req.user;
        const request = req.body;
        request.username = username;

        await reviewService.post(request)
        res.status(200).json({
            message: "Review Inserted Successfully"
        })
    } catch (e) {
        next(e);
    }
}

const getReview = async (req, res, next) => {
    try {
        const {username} = req.user;

        const result = await reviewService.get(username);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

export default { postReview, getReview };

