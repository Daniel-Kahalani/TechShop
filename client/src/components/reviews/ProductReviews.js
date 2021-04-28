import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import useStyles from '../../styles/components/ProdcutRreviewsStyles'

export default function ProductReviews({ reviews }) {

    const classes = useStyles()

    return (
        <>
            <Typography variant="h5" className={classes.title} >
                REVIEWS
            </Typography>

            <List className={classes.reviewList}>
                {reviews.map((review, index) =>
                    <div key={review._id} >
                        <ListItem alignItems="flex-start" id={`item ${review._id}`}>
                            <ListItemText
                                primary={
                                    <Rating value={review.rating} precision={0.5} readOnly />}
                                secondary={
                                    <>
                                        <Typography
                                            variant="body2"
                                            display='inline'
                                            color="textPrimary"
                                            component='label'
                                        >
                                            {`By ${review.name}`}
                                        </Typography>
                                        {` — ${review.comment}`}
                                        <Typography
                                            display='block'
                                            variant="body2"
                                            color="textPrimary"
                                            component='label'
                                        >
                                            {review.createdAt.substring(0, 10)}
                                        </Typography>
                                    </>}
                            />
                        </ListItem>
                        {index < reviews.length - 1 && < Divider variant="middle" component="li" />}
                    </div>
                )
                }
            </List>


        </>
    )
}
