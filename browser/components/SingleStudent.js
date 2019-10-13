import React from 'react';
import { connect } from 'react-redux';

const avgGrade = tests => {
  return Math.round(
    tests.map(test => test.grade).reduce((x, y) => x + y) / tests.length
  );
};

const SingleSelectedStudent = props => {
  console.log('ppp', props);
  return (
    <div>
      <h3>{props.selectedstudent.fullName}</h3>
      <h3>Average grade: {avgGrade(props.selectedstudent.tests)}%</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {props.selectedstudent.tests.map(test => {
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

export default connect(({ selectedSelectedStudent }) => ({
  selectedSelectedStudent,
}))(SingleSelectedStudent);
