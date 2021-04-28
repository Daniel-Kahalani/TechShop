import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AccountMenu from './AccountMenu';
import AdminMenu from './AdminMenu';
import { MenuItem, Menu, IconButton } from '@material-ui/core';
import { AccountCircle, ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';
import AdminIcon from '@material-ui/icons/SupervisedUserCircle';


export default function MoreMenu({ open, setOpen, anchorID }) {

    const { userInfo } = useSelector((state) => state.userLogin)
    const { isloggedIn } = useSelector((state) => state.userLoggedIn)
    const [openAccoutMenu, setOpenAccountMenu] = useState(false)
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);

    const handleMenuClose = () => {
        setOpen(false);
        setOpenAccountMenu(false)
    };

    const handleAccountMenuOpen = () => {
        setOpenAccountMenu(true)
    }

    const handleAdminMenuOpen = () => {
        setAdminMenuOpen(true);
    };

    return (
        <Menu
            anchorEl={document.querySelector(`#${anchorID}`)}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleMenuClose}
        >
            <MenuItem component={RouterLink} to='/cart' onClick={handleMenuClose}>
                <IconButton aria-label="show shopping cart" color="inherit" >
                    <ShoppingCartIcon />
                </IconButton>
                <p>CART</p>
            </MenuItem>
            {isloggedIn ?
                <MenuItem onClick={handleAccountMenuOpen} id='accout-menu-more-menu'>
                    <IconButton
                        aria-label="account"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>ACCOUNT</p>
                </MenuItem>
                :
                <MenuItem component={RouterLink} to='/login' onClick={handleMenuClose}>
                    <IconButton
                        aria-label="sign-in"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>SIGN IN</p>
                </MenuItem>
            }
            {isloggedIn && userInfo.isAdmin &&
                <MenuItem onClick={handleAdminMenuOpen} id='admin-menu-more-menu'>
                    <IconButton
                        aria-label="admin"
                        color="inherit"
                    >
                        <AdminIcon />
                    </IconButton>
                    <p>ADMIN</p>
                </MenuItem>
            }

            {isloggedIn && <AccountMenu
                open={openAccoutMenu}
                setOpen={handleMenuClose}
                anchorID={'accout-menu-more-menu'}
                type='subMenu' />}

            {isloggedIn && userInfo.isAdmin &&
                <AdminMenu open={adminMenuOpen} setOpen={setAdminMenuOpen} anchorID={'admin-menu-more-menu'} type='subMenu' />}

        </Menu>
    )
}
