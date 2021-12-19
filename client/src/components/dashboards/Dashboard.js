import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ auth, logout, getCurrentProfile, profile }) => {
  // get user profile
  useEffect(() => {
    getCurrentProfile();
  }, []);
  if (auth.isAuthenticated) {
    return <div>Dashboard</div>;
  } else {
    return <Navigate to='/login' />;
  }
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(
  Dashboard
);
