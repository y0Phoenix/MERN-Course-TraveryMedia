import React, { Fragment, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import getState from '../../store/getAuth';

const Dashboard = ({
  auth: { isAuthenticated, user },
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  // get user profile
  useEffect(() => {
    getCurrentProfile();
  }, []);
  if (isAuthenticated) {
    return loading && profile === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fa fa-user'> Welcome {user && user.name}</i>
        </p>
        {profile !== null ? (
          <Fragment>Has</Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    );
  } else {
    return <Navigate to='/login' />;
  }
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {getCurrentProfile})(
  Dashboard
);
