import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudentById, getStudents } from '../../actions/student.action';

/**
* @author
* @function StudentList
**/

export const StudentList = (props) => {
  
  const dispatch=useDispatch()
  const student = useSelector((state) => state.student);
  useEffect(()=>{
     dispatch(getStudents())
   
  },[])
  return(
    <Table class = "table table-striped table-bordered" style={{ fontSize: 12 }} responsive="sm">
     
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {student.students.length > 0
            ? student.students.map((student) => (
              <tr key={student._id}>
                  
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.fee}</td>
                  <td>
                  <button className='btn btn-primary'
                      onClick={() => {
                        const payload = {
                          studentId: student.id,
                        };
                        dispatch(deleteStudentById(payload));
                      }}   
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))
            : <tr>
                  
            <td colSpan={4} className='text-center'>No Data</td>
           
          </tr>}
        </tbody>
      </Table>
   )

 }