import React, { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { privateRoute } from '../routing/PrivateRoute';

const Dashboard = (auth, logout) => {
  const token = privateRoute(auth);
  if (token) {
    return <div>Dashboard</div>;
  } else {
    return <Navigate to='/login' />;
  }
};

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Dashboard);
