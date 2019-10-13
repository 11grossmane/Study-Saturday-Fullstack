import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const avgGrade = tests => {
  return Math.round(
    tests.map(test => test.grade).reduce((x, y) => x + y) / tests.length
  );
};

const SingleStudent = props => {
  console.log('ppp', props);
  return (
    <div>
      <h3>{props.selectedStudent.fullName}</h3>
      <h3>Average grade: {avgGrade(props.selectedStudent.tests)}%</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {props.selectedStudent.tests.map(test => {
              return (
                <tr key={test.id}>
                  <td>{test.subject}</td>
                  <td>{test.grade}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withRouter(
  connect(({ selectedStudent }) => ({
    selectedStudent,
  }))(SingleStudent)
);
