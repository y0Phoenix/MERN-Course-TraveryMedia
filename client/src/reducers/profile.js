import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      state = {...state, profile: payload, loading: false};
      return state
    case PROFILE_ERROR:
      state = {...state, error: payload, loading: false};
      return state
    case CLEAR_PROFILE:
      state = {...state, profile: null, repos: [], loading: false}
      return state;
    default:
      return state;
  }
}
