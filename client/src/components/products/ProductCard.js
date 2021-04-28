import { useHistory } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../../styles/components/ProductCardStyles'


export default function Product(
  { _id, name, price, image, rating, numReviews }) {

  const classes = useStyles();
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/products/${_id}`)
  }

  return (
    <Card className={classes.root} >
      <CardActionArea className={classes.cardActionArea} onClick={handleCardClick}>
        <CardMedia
          className={classes.media}
          image={image.url}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="body2">
            {name}
          </Typography>
          <div className={classes.rating}>
            <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
            <Box ml={2}>{`${numReviews} reviews`}</Box>
          </div>
          <Typography variant="h6" color="textSecondary" >
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
