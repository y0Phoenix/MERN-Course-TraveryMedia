// import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboards/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import Alert from './components/layout/Alert';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import store from './store/store';
import { loadUser } from './actions/auth';
import ProtectedRoute from './routes/ProtectedRoute';

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
          <section className='container'>
            <Alert />
            <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/login' element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route exact path='/dashboard' element={<Dashboard/>} />
                <Route exact path='/dashboard' element={<CreateProfile/>} />
              </Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
