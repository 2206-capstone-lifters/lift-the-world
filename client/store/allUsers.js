import axios from "axios";

// ACTION TYPES
const SET_USERS = 'SET_USERS';

// ACTION CREATORS
export const _setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};


// THUNKS
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await axios.get('/api/users', {
          headers: {
            authorization: token,
          },
        });
        await dispatch(_setUsers(data));
      } else {
        console.log('bad token')
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}