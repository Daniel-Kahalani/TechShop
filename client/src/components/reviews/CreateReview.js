import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createReview } from '../../actions/productActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Message from '../utils/Message'
import Rating from '@material-ui/lab/Rating';
import {
    Typography,
    Box,
    Button,
    CircularProgress,
} from '@material-ui/core';
import useStyles from '../../styles/components/CreateReviewStyles'

export default function ProductReviews({ product }) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.productCreateReview)
    const { userInfo } = useSelector(state => state.userLogin)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(3);
    const [hover, setHover] = useState(-1);
    const ratingLabels = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent',
    }


    const handleSubmit = () => {
        dispatch(createReview(product._id, { comment, rating, name: userInfo.name }))
    }

    return (
        <div style={{ width: '80%' }}>
            <Typography gutterBottom variant="h5" className={classes.title} >
                WRITE A REVIEW
            </Typography>
            <ValidatorForm className={classes.form} onSubmit={handleSubmit} >
                {error &&
                    <Message severity='error'>{error}</Message>}
                <div className={classes.rating}>
                    <Rating
                        name="hover-feedback"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        onChangeActive={(e, newHover) => setHover(newHover)}
                    />
                    {rating !== null &&
                        <Box ml={2}>
                            {ratingLabels[hover !== -1 ? hover : rating]}
                        </Box>}
                </div>
                <TextValidator
                    autoComplete='comment'
                    variant="filled"
                    margin="normal"
                    className={classes.comment}
                    value={comment}
                    multiline
                    rows={3}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    validators={['required']}
                    errorMessages={['Enter comment']}
                    label="Comment"
                />
                <div className={classes.btnContainer}>
                    {loading ?
                        <CircularProgress /> :
                        <Button
                            type="submit"
                            size="large"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Submit
                            </Button>
                    }
                </div>

            </ValidatorForm>
        </div>
    )
}
