import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = (isAuthenticated) => {
    if (!isAuthenticated.isAuthenticated) {
        return <Navigate to='/login'/>;
    }
    return <Outlet/>;
}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(ProtectedRoute);
