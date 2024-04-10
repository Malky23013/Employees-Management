
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
// import * as ActionType from '../store/action';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// export default function AddEmployee() {
//     const dispatch = useDispatch();
//     const employee = useSelector(state => state.employee);
//     const navigate = useNavigate();
//     const [status, setStatus] = useState(employee ? employee.status : 'Status');
//     const [roles, setRoles] = useState(employee ? employee.roles : [])
//     const [gender, setGender] = useState(employee ? employee.gender : '');
//     const Positions = ['Secretary',
//         'Manager',
//         'Teacher',
//         'Supervisor',
//         'Assistant']

//     const [existingPositions, setExistingPositions] = useState([]);
//     useEffect(() => {
//         if (employee) {
//             const positions = employee.roles.map(role => Positions[role.name]);
//             setExistingPositions(positions);
//         }
//     }, [employee]);

//     const handleStatusChange = (value) => {
//         setStatus(value);
//     };

//     const handleRoleChange = (index, key, value) => {
//         const updatedRoles = [...roles];
//         updatedRoles[index][key] = value;
//         setRoles(updatedRoles);
//         // עדכון מערך הקיימים
//         if (key === 'name') {
//             const updatedExistingPositions = [...existingPositions];
//             updatedExistingPositions[index] = value;
//             setExistingPositions(updatedExistingPositions);
//         }
//     };

//     const parseDate = (date) => {
//         if (date) {
//             const parsedDate = new Date(date);
//             const year = parsedDate.getFullYear();
//             const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
//             const day = String(parsedDate.getDate()).padStart(2, '0');
//             return `${year}-${month}-${day}`;
//         }
//         return '';
//     };

//     const handleAddRole = () => {
//         setRoles([...roles, { name: '', isManagerial: false, dateOfStart: '' }]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData(e.target);

//         const roleObjects = roles.map(role => ({
//             name: Positions.findIndex(position => position === formData.get(`formRoleName${roles.indexOf(role)}`)),
//             isManagerial: !!formData.get(`formIsManagerial${roles.indexOf(role)}`),
//             dateOfStart: formData.get(`formDateOfStart${roles.indexOf(role)}`)
//         }));
//         console.log(roleObjects);
//         const requestData = {
//             idNumber: formData.get("idNumber"),
//             firstName: formData.get("firstName"),
//             lastName: formData.get("lastName"),
//             status: status === 'Active' ? 1 : 0,
//             gender: gender === "Male" ? 1 : 0,
//             address: formData.get("address"),
//             dateOfStart: formData.get("dateOfStart"),
//             dateOfBirth: formData.get("dateOfBirth"),
//             roles: roleObjects
//         };

//         try {
//             if (employee) {
//                 await axios.put(`https://localhost:7243/api/Employees/${employee.id}`, requestData);
//                 console.log("Edited successfully");
//                 navigate('/myEmployees');
//             } else {
//                 await axios.post("https://localhost:7243/api/Employees", requestData);
//                 console.log("Added successfully");
//                 navigate('/myEmployees');
//             }
//             dispatch({ type: ActionType.SET_EMPLOYEE, employee: "" });
//         } catch (error) {
//             console.error("Failed to add/edit employee:", error);
//         }
//     };

//     return (
//         <section className="gradient-custom">
//             <div className="container py-5 h-100">
//                 <div className="row justify-content-center align-items-center h-100">
//                     <div className="col-12 col-lg-9 col-xl-7">
//                         <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
//                             <div className="card-body p-4 p-md-5">
//                                 <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">{employee ? 'Edit Employee' : 'Add Employee'}</h3>
//                                 <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
//                                     <MDBInput name="idNumber" id='form6Example0' label='ID number' defaultValue={employee?.idNumber} wrapperClass="mb-3 custom-input" required
//                                         validation="Please provide a valid 9-digit ID number"
//                                         pattern=".{9,9}" />
//                                     <MDBInput name="firstName" id='form6Example1' label='First name' defaultValue={employee?.firstName} wrapperClass="mb-3 custom-input" required
//                                         validation="Please enter a valid first name"
//                                         pattern="[A-Za-z]+" />
//                                     <MDBInput name="lastName" id='form6Example2' label='Last name' defaultValue={employee?.lastName} wrapperClass="mb-3 custom-input" validation="Please enter a valid last name (maximum 30 characters)"
//                                         pattern=".{1,30}" />
//                                     <div className="mb-3 custom-input">
//                                         <label htmlFor="gender" className="form-label">Gender</label>
//                                         <select className="form-select" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
//                                             <option value="">{employee?.gender === 1 ? 'Male' : employee?.gender === 0 ? 'Female' : ''}</option>
//                                             <option value="male">Male</option>
//                                             <option value="female">Female</option>
//                                         </select>
//                                     </div>
//                                     <MDBInput name="dateOfStart" wrapperClass='mb-3 custom-input' type='date' id='form6Example4' label='Start Date' max={new Date().toISOString().split("T")[0]} defaultValue={parseDate(employee?.dateOfStart)} required />
//                                     <MDBInput name="dateOfBirth" wrapperClass='mb-3 custom-input' type='date' id='form6Example5' label='Date of Birth' max={new Date().toISOString().split("T")[0]} defaultValue={parseDate(employee?.dateOfBirth)} required />
//                                     <MDBInput name="address" id='form6Example6' label='Address' defaultValue={employee?.address} wrapperClass="mb-3 custom-input" required />
//                                     {roles.map((role, index,name) => (
//                                         <div key={index} className="row mb-4">
//                                             <div className="col">
//                                             <select
//                 defaultValue={Positions[role?.name]}
//                 name={`formRoleName${index}`}
//                 id={`formRoleName${index}`}
//                 onChange={(e) => handleRoleChange(index, 'name', Positions[e.target.value])}
//             >
//                 <option disabled={false}>chose a role</option>
//                 {Positions.map((position, idx) => (
//                     <option key={idx} value={position} disabled={existingPositions.includes(position)?true:false}>
//                         {position}
//                     </option>
//                 ))}
//             </select>
//                                             </div>
//                                             <div className="col">
//                                                 <MDBCheckbox required
//                                                     checked={role?.isManagerial}
//                                                     name={`formIsManagerial${index}`}
//                                                     id={`formIsManagerial${index}`}
//                                                     label='Is managerial?'
//                                                     onChange={(e) => handleRoleChange(index, 'isManagerial', e.target.checked)}
//                                                 />
//                                             </div>
//                                             <div className="col">
//                                                 <MDBInput defaultValue={parseDate(role?.dateOfStart)} name={`formDateOfStart${index}`} wrapperClass='mb-4' id={`formDateOfStart${index}`} label='Date of start' type='date' onChange={(e) => handleRoleChange(index, 'dateOfStart', e.target.value)} required />
//                                             </div>
//                                         </div>
//                                     ))}

//                                     <MDBBtn onClick={handleAddRole} color='secondary' className='mb-4' block type="button">
//                                         Add Role
//                                     </MDBBtn>
//                                     <MDBBtn className='mb-4' type='submit' block>
//                                         {employee ? 'Edit employee' : 'Add employee'}
//                                     </MDBBtn>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );

// }

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import * as ActionType from '../store/action';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddEmployee() {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.employee);
    const navigate = useNavigate();
    const [status, setStatus] = useState(employee ? employee.status : 'Status');
    const [roles, setRoles] = useState(employee ? employee.roles : [])
    const [gender, setGender] = useState(employee ? employee.gender : '');
    const Positions = ['Secretary',
        'Manager',
        'Teacher',
        'Supervisor',
        'Assistant']

    const [existingPositions, setExistingPositions] = useState([]);
    useEffect(() => {
        if (employee) {
            const positions = employee.roles.map(role => Positions[role.name]);
            setExistingPositions(positions);
        }
    }, [employee]);

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleRoleChange = (index, key, value) => {
        const updatedRoles = [...roles];
        updatedRoles[index][key] = value;
        setRoles(updatedRoles);
        // Update existing positions array
        if (key === 'name') {
            const updatedExistingPositions = [...existingPositions];
            updatedExistingPositions[index] = value;
            setExistingPositions(updatedExistingPositions);
        }
    };

    const parseDate = (date) => {
        if (date) {
            const parsedDate = new Date(date);
            const year = parsedDate.getFullYear();
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const day = String(parsedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    const handleAddRole = () => {
        setRoles([...roles, { name: '', isManagerial: false, dateOfStart: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const roleObjects = roles.map(role => ({
            name: Positions.findIndex(position => position === formData.get(`formRoleName${roles.indexOf(role)}`)),
            isManagerial: !!formData.get(`formIsManagerial${roles.indexOf(role)}`),
            dateOfStart: formData.get(`formDateOfStart${roles.indexOf(role)}`)
        }));

        const requestData = {
            idNumber: formData.get("idNumber"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            status: status === 'Active' ? 1 : 0,
            gender: gender === "male" ? 1 : 0,
            address: formData.get("address"),
            dateOfStart: formData.get("dateOfStart"),
            dateOfBirth: formData.get("dateOfBirth"),
            roles: roleObjects
        };

        try {
            if (employee) {
                await axios.put(`https://localhost:7243/api/Employees/${employee.id}`, requestData);
                console.log("Edited successfully");
                navigate('/myEmployees');
            } else {
                await axios.post("https://localhost:7243/api/Employees", requestData);
                console.log("Added successfully");
                navigate('/myEmployees');
            }
            dispatch({ type: ActionType.SET_EMPLOYEE, employee: "" });
        } catch (error) {
            console.error("Failed to add/edit employee:", error);
        }
    };

    return (
        <section className="gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">{employee ? 'Edit Employee' : 'Add Employee'}</h3>
                                <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                                    <MDBInput name="idNumber" id='form6Example0' label='ID number' defaultValue={employee?.idNumber} wrapperClass="mb-3 custom-input" required
                                        validation="Please provide a valid 9-digit ID number"
                                        pattern=".{9,9}" />
                                    <MDBInput name="firstName" id='form6Example1' label='First name' defaultValue={employee?.firstName} wrapperClass="mb-3 custom-input" required
                                        validation="Please enter a valid first name"
                                        pattern="[A-Za-z]+" />
                                    <MDBInput name="lastName" id='form6Example2' label='Last name' defaultValue={employee?.lastName} wrapperClass="mb-3 custom-input" validation="Please enter a valid last name (maximum 30 characters)"
                                        pattern=".{1,30}" />
                                    <div className="mb-3 custom-input">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <select className="form-select" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="">{employee?.gender === 1 ? 'Male' : employee?.gender === 0 ? 'Female' : ''}</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <MDBInput name="dateOfStart" wrapperClass='mb-3 custom-input' type='date' id='form6Example4' label='Start Date' max={new Date().toISOString().split("T")[0]} defaultValue={parseDate(employee?.dateOfStart)} required />
                                    <MDBInput name="dateOfBirth" wrapperClass='mb-3 custom-input' type='date' id='form6Example5' label='Date of Birth' max={new Date().toISOString().split("T")[0]} defaultValue={parseDate(employee?.dateOfBirth)} required />
                                    <MDBInput name="address" id='form6Example6' label='Address' defaultValue={employee?.address} wrapperClass="mb-3 custom-input" required />
                                    {roles.map((role, index) => (
                                        <div key={index} className="row mb-4">
                                            <div className="col">
                                                <select
                                                    defaultValue={Positions[role?.name]}
                                                    name={`formRoleName${index}`}
                                                    id={`formRoleName${index}`}
                                                    onChange={(e) => handleRoleChange(index, 'name', Positions[e.target.value])}
                                                >
                                                    <option disabled={false}>Choose a role</option>
                                                    {Positions.map((position, idx) => (
                                                        <option key={idx} value={idx} disabled={existingPositions.includes(position) ? true : false}>
                                                            {position}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col">
                                                <MDBCheckbox required
                                                    checked={role?.isManagerial}
                                                    name={`formIsManagerial${index}`}
                                                    id={`formIsManagerial${index}`}
                                                    label='Is managerial?'
                                                    onChange={(e) => handleRoleChange(index, 'isManagerial', e.target.checked)}
                                                />
                                            </div>
                                            <div className="col">
                                                <MDBInput defaultValue={parseDate(role?.dateOfStart)} name={`formDateOfStart${index}`} wrapperClass='mb-4' id={`formDateOfStart${index}`} label='Date of start' type='date' onChange={(e) => handleRoleChange(index, 'dateOfStart', e.target.value)} required />
                                            </div>
                                        </div>
                                    ))}
                                    <MDBBtn onClick={handleAddRole} color='secondary' className='mb-4' block type="button">
                                        Add Role
                                    </MDBBtn>
                                    <MDBBtn className='mb-4' type='submit' block>
                                        {employee ? 'Edit employee' : 'Add employee'}
                                    </MDBBtn>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}
