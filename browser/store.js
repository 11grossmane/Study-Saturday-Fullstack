import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

// export const GET_STUDENTS = 'GET_STUDENTS';
// export const GET_SELECTED_STUDENT = 'GET_SELECTED_STUDENT';
const SET_STUDENTS = 'SET_STUDENTS';
const SET_SINGLE_STUDENT = 'SET_SINGLE_STUDENT';

//only exporting the thunk that will call these
const setStudents = students => {
  return { type: SET_STUDENTS, students };
};

export const setSingleStudents = selectedStudent => {
  return { type: SET_SINGLE_STUDENT, selectedStudent };
};

export const fetchAndSetStudents = () => {
  return async dispatch => {
    try {
      const { students } = await axios.get('/students');
      if (!students) throw new Error('did not get students');
      dispatch(setStudents(students));
    } catch (error) {
      console.error(error);
    }
  };
};
const initialState = {
  students: [],
  selectedStudent: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return { ...state, students: action.students };
    case SET_SINGLE_STUDENT:
      return { ...state, selectedStudent: action.selectedStudent };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(reducer, middleware);
