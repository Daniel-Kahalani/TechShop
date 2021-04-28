
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '../utils/Message';

export default function OrderSent() {

    const { order, error, loading } = useSelector(state => state.orderCreate)

    return (
        <div>
            {loading ?
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <CircularProgress size='120px' color='secondary' /> :
                 </div> :
                error ?
                    <Message severity='error'>
                        {error}
                    </Message> :
                    <div>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #{order._id}. We have emailed your order confirmation, and will
                            send you an update when your order has shipped.
                        </Typography>
                    </div>
            }
        </div >
    )
}
