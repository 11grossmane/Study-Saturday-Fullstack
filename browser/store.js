import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

const SET_STUDENTS = 'SET_STUDENTS';
const SET_SINGLE_STUDENT = 'SET_SINGLE_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
//only exporting the thunk that will call these
const setStudents = students => {
  return { type: SET_STUDENTS, students };
};

export const setSingleStudent = selectedStudent => {
  return { type: SET_SINGLE_STUDENT, selectedStudent };
};

const addStudent = newStudent => {
  return { type: ADD_STUDENT, newStudent };
};

export function fetchAndSetStudents() {
  return async function(dispatch) {
    try {
      const { data } = await axios.get('/student');
      console.log('TCL: fetchAndSetStudents -> students', data);
      if (!data) throw new Error('did not get students');
      dispatch(setStudents(data));
    } catch (error) {
      console.error(error);
    }
  };
}

//updated both db (inside post) and state (with action)
export function updateAndAddStudent(newStudent) {
  return async function(dispatch) {
    try {
      console.log('newstu inside thunk', newStudent);
      const data = await axios.post('/student', { ...newStudent });
      console.log('newStu from db', data);
      if (!data) throw new Error('could not put student');
      dispatch(addStudent(newStudent));
    } catch (error) {
      console.error(error);
    }
  };
}
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
    case ADD_STUDENT:
      return { ...state, students: [...state.students, action.newStudent] };
    default:
      return state;
  }
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);
export default store;
