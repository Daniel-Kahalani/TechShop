import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { isLoggedIn } from './actions/userActions';
import Routes from './components/utils/Routes'
import Page from './components/utils/Page';
import Theme from "./components/utils/Theme";


export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isLoggedIn())
  }, [dispatch])

  return (
    <Router>
      <Theme>
        <Page>
          <Routes />
        </Page>
      </Theme>
    </Router >
  );
}