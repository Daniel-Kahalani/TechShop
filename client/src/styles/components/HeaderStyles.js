import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: '10vh',

  },
  appBar: {
    display: 'flex',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#85D8CE'
  },
  toolbar: {
    minHeight: 50,
  },
  title: {
    display: 'none',
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  menuIcons: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    }
  },
  moreIcon: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));