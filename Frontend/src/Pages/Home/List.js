import React from 'react'

function List({employees, handleEdit, handleDelete}) {


  return (
    <div className='contain-table'> 
        <table className='striped-table'>
        <thead>
<tr>
    
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email Address</th>
    <th>Phone Number</th>
    <th>Gender</th>
    <th colSpan={2} className="text-center">
        Actions
    </th>
</tr>
</thead>

<tbody>
{employees.length >0 ? (
                        employees.map((employee, i) => (
                            <tr key={employee.id}>
                                
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                {/* <td>{formatter.format(employee.salary)}</td> */}
                                <td>{employee.phone} </td>
                                <td>{employee.gender} </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(employee.id)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="text-left">
                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="button muted-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No Employees</td>
                        </tr>
                    )}
</tbody>
        </table>
   
    </div>
  )
}

export default List
