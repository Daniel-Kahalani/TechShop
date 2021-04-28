import { Link as RouterLink } from 'react-router-dom'
import {
  Link,
  Container,
  Typography
} from '@material-ui/core';
import useStyles from '../../styles/components/FooterStyles';

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" className={classes.endTitle}>
          {'Copyright © '}
          <Link color="inherit" component={RouterLink} to='/'>
            TechShop
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  )
}
