import React from 'react';
import { connect } from 'react-redux';
import { setSingleStudent } from '../store';
import { withRouter } from 'react-router-dom';

const StudentList = props => {
  console.log('p', props);
  return (
    <tbody>
      {props.students.map(student => (
        <tr key={student.id}>
          <td>{student.fullName}</td>
          <td onClick={() => props.setSingleStudent(student)}>Details</td>
        </tr>
      ))}
    </tbody>
  );
};

export default connect(
  ({ students, selectedStudent }) => ({ students, selectedStudent }),
  { setSingleStudent }
)(StudentList);
