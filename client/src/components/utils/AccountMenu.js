import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/userActions';
import { MenuItem, Menu } from '@material-ui/core';


export default function AccountMenu({ open, setOpen, anchorID, type }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const { pathname } = useLocation()
    const anchorOrigin = type === 'menu' ?
        { vertical: 'bottom', horizontal: 'left' } :
        { vertical: 'bottom', horizontal: 'left' }
    const transformOrigin = type === 'menu' ?
        { vertical: 'top', horizontal: 'left' } :
        { vertical: 'center', horizontal: 'right' }

    const handleMenuClose = () => {
        setOpen(false);
    }

    const handleLogout = () => {
        dispatch(logout(() => history.push(pathname)))
        handleMenuClose()
    }

    return (
        <Menu
            anchorEl={document.querySelector(`#${anchorID}`)}
            getContentAnchorEl={null}
            anchorOrigin={anchorOrigin}
            keepMounted
            transformOrigin={transformOrigin}
            open={open}
            onClose={handleMenuClose}
        >
            <MenuItem component={RouterLink} to='/profile' onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>)
}