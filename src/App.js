import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { getToken } from './components/utils/Common'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./views/pages/Login'))
const Register = React.lazy(() => import('./views/pages/Register'))
const Page404 = React.lazy(() => import('./views/pages/Page404'))

//  fallback={loading}
function App() {
  return (
    <>
      <HashRouter>
        <React.Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route path="/" name="Home" render={(props) => getToken() ? <DefaultLayout {...props} /> : <Login {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </>
  );
}

export default App;
