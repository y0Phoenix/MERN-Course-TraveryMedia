import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { loadUser } from '../../actions/auth';

export const privateRoute = (
  { auth: { isAuthenticated, loading, token } },
  logout
) => {
  if (isAuthenticated && !loading) {
    return token;
  } else {
    return null;
  }
};

privateRoute.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

connect(mapStateToProps, { logout })(privateRoute);
