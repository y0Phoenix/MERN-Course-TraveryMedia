import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Index } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Dashboard from './components/dashboards/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import Container from './routes/Container';
// redux
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import store from './store/store';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
     <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
            <Alert />
            <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route element={<Container/>}>
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route exact path='/dashboard' element={<Dashboard/>} />
                    <Route exact path='/create-profile' element={<CreateProfile/>} />
                </Route>
              </Route>
            </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
