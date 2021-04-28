import { Link as RouterLink } from 'react-router-dom'
import { MenuItem, Menu } from '@material-ui/core';

export default function AdminMenu({ open, setOpen, anchorID, type }) {

    const anchorOrigin = type === 'menu' ?
        { vertical: 'bottom', horizontal: 'left' } :
        { vertical: 'bottom', horizontal: 'left' }
    const transformOrigin = type === 'menu' ?
        { vertical: 'top', horizontal: 'left' } :
        { vertical: 'center', horizontal: 'right' }

    const handleMenuClose = () => {
        setOpen(false);
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
            <MenuItem component={RouterLink} to='/admin/users' onClick={handleMenuClose}>Users</MenuItem>
            <MenuItem component={RouterLink} to='/admin/products' onClick={handleMenuClose}>Products</MenuItem>
            <MenuItem component={RouterLink} to='/admin/orders' onClick={handleMenuClose}>Orders</MenuItem>
        </Menu>)
}
