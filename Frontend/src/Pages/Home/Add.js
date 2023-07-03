import React, { useState, useRef, useEffect } from 'react'


function Add({employees, setEmployees, setIsAdding}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('male');

    const handleChange = (event) => {
        setGender(event.target.value);
 
      };
      const options = [

        { label: 'Male', value: 'male' },
     
        { label: 'Female', value: 'female' }
     
       
     
      ];
    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, [])

    const handleAdd = e => {
        e.preventDefault();
    setIsAdding(true);
    // console.log(`Submitted: ${firstName} ${lastName} ${email} ${phone} ${gender}`);

    if(firstName!==''&& lastName!==''&& email!==''&& phone!==''&& gender!=='' ){
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone:phone,
        gender:gender
      }

      fetch('http://localhost:4200/addemployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log('Data stored successfully!');
        } else {
          console.error('Error storing data:', response.status);
        }
      })
      .catch(error => {
        console.error('Error storing data:', error);
      });
    }else{
        console.log("All Forms must be filled");
    }
    }

  return (
    <div className="small-container">
    <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
            id="firstName"
            type="text"
            ref={textInput}
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
        <label htmlFor="phone">Phone Number </label>
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
            <input type="submit" value="Add" />
            <input
                style={{ margin: '12px' }}
                className="muted-button"
                type="button"
                value="Cancel"
                onClick={() => setIsAdding(false)}
            />
        </div>
    </form>
</div>
  );
}

export default Add;

