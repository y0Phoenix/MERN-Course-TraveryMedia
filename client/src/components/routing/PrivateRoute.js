import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const privateRoute = (auth, logout) => {
  const { isAuthenticated, loading, token } = auth;
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

export default connect(mapStateToProps, { logout })(privateRoute);
