import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = Schema(
    {
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Review", reviewSchema)
