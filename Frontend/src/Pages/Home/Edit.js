import React, { useState } from 'react'
import Swal from 'sweetalert2';

function Edit({employees, selectedEmployee, setEmployees, setIsEditing}) {
    const id = selectedEmployee.id;

    const [firstName, setFirstName] = useState(selectedEmployee.firstName);
    const [lastName, setLastName] = useState(selectedEmployee.lastName);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [phone, setPhone] = useState(selectedEmployee.phone);
    const [gender, setGender] = useState(selectedEmployee.gender);
    const handleChange = (event) => {
        setGender(event.target.value);
 
      };
    const options = [

        { label: 'Male', value: 'male' },
     
        { label: 'Female', value: 'female' }
     
       
     
      ];
      
    const handleUpdate = e => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !phone || !gender) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const employee = {
            id,
            firstName,
            lastName,
            email,
            phone,
            gender
        };

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === id) {
                employees.splice(i, 1, employee);
                break;
            }
        }

        setEmployees(employees);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

  return (
    <div className="small-container">
    <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
            id="lastName"
            type="text"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="phone">Phone($)</label>
        <input
            id="phone"
            type="text"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
        />
        <label htmlFor="gender">Gender
        <select value={gender} onChange={handleChange}>

        {options.map((option) => (

<option value={option.value}>{option.label}</option>
        ))}

</select>
        </label>
        <div style={{ marginTop: '30px' }}>
            <input type="submit" value="Update" />
            <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="button"
                value="Cancel"
                onClick={() => setIsEditing(false)}
            />
        </div>
    </form>
</div>
  );
}

export default Edit
