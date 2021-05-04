import { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../actions/cartActions';
import {
	Card,
	CardContent,
	CardActions,
	Button,
	TextField,
	Typography,
	CircularProgress,
} from '@material-ui/core';

export default function AddItemCard({ countInStock, price, handleFeedback }) {
	const { id } = useParams();
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const history = useHistory();
	const { loading } = useSelector((state) => state.cartAddItem);
	const { isloggedIn } = useSelector((state) => state.userLoggedIn);

	const handleChangeQty = (e) => {
		let newQty = e.target.value;
		if (newQty >= 1 && newQty <= countInStock)
			setQty(Math.floor(e.target.value));
	};

	const handleAddItem = () => {
		if (!isloggedIn) history.push(`/login?redirect=${pathname}`);
		dispatch(addCartItem(id, qty, handleFeedback));
	};

	return (
		<Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
			<CardContent>
				<Typography variant='h6'>Price: ${price}</Typography>
				<Typography variant='h6'>
					Status: {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
				</Typography>
				<TextField
					inputProps={{ step: 1, min: 1, max: countInStock }}
					id='quantity'
					label='Quantity'
					value={qty}
					onChange={handleChangeQty}
					type='number'
					margin='normal'
					variant='outlined'
					disabled={!countInStock}
				/>
			</CardContent>
			<CardActions>
				{loading ? (
					<CircularProgress
						style={{ margin: 'auto' }}
						color='secondary'
					/>
				) : (
					<Button
						size='large'
						color='secondary'
						fullWidth
						variant='contained'
						onClick={handleAddItem}
						disabled={!countInStock}>
						Add To Cart
					</Button>
				)}
			</CardActions>
		</Card>
	);
}
