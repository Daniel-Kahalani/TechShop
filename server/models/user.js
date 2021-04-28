import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const saltRounds = 10;

const Schema = mongoose.Schema;

const cartItemSchema = Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    })

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        cart: [cartItemSchema]
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
        catch (err) {
            next(err)
        }
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)
