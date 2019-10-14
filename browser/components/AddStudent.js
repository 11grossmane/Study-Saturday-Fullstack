import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { updateAndAddStudent } from '../store';
import { withRouter } from 'react-router-dom';
import Main from './Main';

const AddStudent = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmit] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const newStudent = {
      firstName,
      lastName,
      email,
    };
    console.log('TCL: handleSubmit -> newStudent', newStudent);

    dispatch(updateAndAddStudent(newStudent));
    setFirstName('');
    setLastName('');
    setEmail('');
    setSubmit(true);
  }

  return !submitted ? (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">firstName</label>
      <input
        type="text"
        name="firstName"
        value={firstName}
        onChange={event => setFirstName(event.target.value)}
      />
      <label htmlFor="lastName">lastName</label>
      <input
        type="text"
        name="lastName"
        value={lastName}
        onChange={event => setLastName(event.target.value)}
      />
      <label htmlFor="email">email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  ) : (
    <div>
      <Route exact path="/" component={Main} />
      <Redirect to="/" />
    </div>
  );
};

export default AddStudent;

// export default connect(
//   null,
//   { updateAndAddStudent }
// )(AddStudent);
