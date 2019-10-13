import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import { fetchAndSetStudents } from '../store';

class Main extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  // selectStudent(student) {
  //   return this.setprops({
  //     selectedStudent: student,
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList />
        </table>
        {this.props.selectedStudent.id ? <SingleStudent /> : null}
      </div>
    );
  }
}

export default connect(
  ({ students, selectedStudent }) => ({ students, selectedStudent }),
  { fetchStudents }
)(Main);
