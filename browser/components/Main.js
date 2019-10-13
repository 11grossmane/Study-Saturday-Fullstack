import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import AddStudent from './AddStudent';
import { fetchAndSetStudents } from '../store';

class Main extends Component {
  componentDidMount() {
    console.log('TCL: Main -> componentDidMount -> this.props', this.props);
    this.props.fetchAndSetStudents();
    console.log('TCL: Main -> componentDidMount -> this.props', this.props);
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
        <Route path="/addStudent" component={AddStudent} />
        <Link to={`/addStudent`}>Add Student</Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          {this.props.students[0] && <StudentList />}
        </table>
        {this.props.selectedStudent.id ? <SingleStudent /> : null}
      </div>
    );
  }
}

export default connect(
  ({ students, selectedStudent }) => ({ students, selectedStudent }),
  { fetchAndSetStudents }
)(Main);
