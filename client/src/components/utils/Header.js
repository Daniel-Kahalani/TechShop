import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBox from './SearchBox';
import MoreMenu from './MoreMenu';
import AcountMenu from './AccountMenu';
import AdminMenu from './AdminMenu'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import {
  AccountCircle,
  ShoppingCart as ShoppingCartIcon,
  MoreVert as MoreIcon,
} from '@material-ui/icons';
import AdminIcon from '@material-ui/icons/SupervisedUserCircle';
import useStyles from '../../styles/components/HeaderStyles';



export default function Header() {

  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.userLogin)
  const { isloggedIn } = useSelector(state => state.userLoggedIn)
  const { pathname } = useLocation()
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const handleMoreMenuOpen = () => {
    setMoreMenuOpen(true);
  };

  const handleAccountMenuOpen = () => {
    setAccountMenuOpen(true);
  };

  const handleAdminMenuOpen = () => {
    setAdminMenuOpen(true);
  };

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="static" >
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5"
            color='inherit'
            noWrap
            component={RouterLink} to='/' >
            TechShop
            </Typography>
          <SearchBox />
          <div className={classes.grow} />
          <div className={classes.menuIcons}>
            <IconButton
              edge="end"
              aria-label="show shopping cart"
              color="inherit"
              component={RouterLink}
              to={isloggedIn ? '/cart' : `/login?redirect=${pathname}`} >
              <ShoppingCartIcon />
              <Typography variant='overline'>
                CART
              </Typography>
            </IconButton>
            {isloggedIn ?
              <IconButton edge="end" aria-label="sign-in" color="inherit"
                onClick={handleAccountMenuOpen}>
                <AccountCircle id='account-icon' />
                <Typography variant='overline'>
                  {userInfo.name.toUpperCase()}
                </Typography>
              </IconButton>
              :
              <IconButton edge="end" aria-label="sign-in" color="inherit" component={RouterLink} to='/login'>
                <AccountCircle />
                <Typography variant='overline'>
                  SIGN IN
                </Typography>
              </IconButton>
            }
            {isloggedIn && userInfo.isAdmin &&
              <IconButton edge="end" aria-label="admin" color="inherit" onClick={handleAdminMenuOpen}>
                <AdminIcon id='admin-icon' />
                <Typography variant='overline'>
                  ADMIN
                </Typography>
              </IconButton>
            }
          </div>
          <div className={classes.moreIcon}>
            <IconButton
              aria-label="show more menu"
              aria-controls='more-menu'
              aria-haspopup="true"
              onClick={handleMoreMenuOpen}
              color="inherit"
            >
              <MoreIcon id='more-icon' />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <MoreMenu open={moreMenuOpen} setOpen={setMoreMenuOpen} anchorID={'more-icon'} />
      {isloggedIn && <AcountMenu open={accountMenuOpen} setOpen={setAccountMenuOpen} anchorID={'account-icon'} type='menu' />}
      {isloggedIn && userInfo.isAdmin &&
        <AdminMenu open={adminMenuOpen} setOpen={setAdminMenuOpen} anchorID={'admin-icon'} type='menu' />}
    </div>
  )
}
