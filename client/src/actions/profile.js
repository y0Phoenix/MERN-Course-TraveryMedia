import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';
import { useNavigate } from 'react-router-dom';

// get user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.res, status: err.response.status },
    });
  }
};

// create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      header: {
        "Content-Type": 'application.json'
      }
    }

    const res = await axios.post('http://localhost:5000/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'), 7500)
      ); 
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.res, status: err.response.status },
    });
  }
}
