
// import * as ActionType from '..//store/action';
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from 'sweetalert2';
// import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
// import { useDispatch } from 'react-redux';

// const MyEmployees = () => {
//   const [employees, setEmployees] = useState([]);
//   const [currentUserCity, setCurrentUserCity] = useState('');
//   const dispatch = useDispatch();
//   const nevigate = useNavigate();

//   const handleEdit = (employee) => {
//     console.log("ll");
//     console.log(employee);
//     dispatch({ type: ActionType.SET_EMPLOYEE, employee: employee });
//     nevigate(`/addEmployee`, { state: { employee: employee } });
//   };

//   useEffect(() => {
//     console.log("Fetching employees...");
//     getUserCity();
//     axios
//       .get("https://localhost:7243/api/Employees")
//       .then((response) => {
//         console.log("Employees fetched successfully:", response.data);
//         setEmployees(response.data);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch employees:", error);
//       });
//   }, []);

//   const getUserCity = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(async function (position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;

//         const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
//         const data = await response.json();

//         if (response.ok && data.address) {
//           let city = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.county;
//           if (city) {
//             city = city.toString();
//             console.log("המיקום הנוכחי שלך הוא: " + city);
//             setCurrentUserCity(city);
//             return city;
//           } else {
//             console.log('לא נמצא שם עיר בתוצאות');
//           }
//         } else {
//           console.log('לא נמצאה כתובת');
//         }
//       });
//     } else {
//       console.log("Geolocation is not supported by this browser.");
//     }
//   };


//   const handleFilterByCity = () => {
//     const filteredEmployees = employees.filter(employee => {
//       return currentUserCity === employee.address;
//     });
//     setEmployees(filteredEmployees);
//   };

//   const Delete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`https://localhost:7243/api/Employees/${id}`)
//           .then((response) => {
//             console.log("Employee deleted successfully:", response.data);
//             setEmployees(employees.filter((employee) => employee.id !== id));
//             Swal.fire(
//               'Deleted!',
//               'Your file has been deleted.',
//               'success'
//             );
//           })
//           .catch((error) => {
//             console.error("Error deleting employee:", error);
//             Swal.fire(
//               'Error!',
//               'An error occurred while deleting the employee.',
//               'error'
//             );
//           });
//       }
//     });
//   };

//   function parseDate(date) {
//     return new Date(date).toLocaleDateString();
//   }

//   const handleButtonClick = () => {
//     nevigate("/addEmployee");
//   };

//   return (
//     <div style={{ backgroundColor: '#eee' }}>
//       <div style={{ width: '80vw', margin: '0 auto', padding: '30px', borderRadius: '10px' }}>
//         <MDBTable style={{ borderRadius: '10px' }} responsive sm bordered >
//           <MDBTableHead style={{ backgroundColor: 'grey', color: '#e9ecef' }}>
//             <tr>
//               <th scope='col'>First name</th>
//               <th scope='col'>Last name</th>
//               <th scope='col'>Date of start</th>
//               <th scope='col'>Actions</th>
//             </tr>
//           </MDBTableHead>
//           <MDBTableBody>
//             {employees.map((employee, index) => (
//               employee.status === 1 && (
//                 <tr key={employee.id} style={{ backgroundColor: '#ffffff' }}>
//                   <td>
//                     <div className='d-flex align-items-center'>
//                       <img
//                         src={employee.gender === 1 ? `https://eyaldrori.co.il/wp-content/uploads/2020/06/man.png` : `https://img.lovepik.com/element/45004/6432.png_860.png`}
//                         alt=''
//                         style={{ width: '45px' }}
//                         className='rounded-circle'
//                       />
//                       <div className='ms-3'>
//                         <p className='fw-bold mb-1'>{employee.firstName}</p>
//                         <p className='text-muted mb-0'>id: {employee.idNumber}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td><p className='fw-bold mb-1'>{employee.lastName}</p></td>
//                   <td><p className='fw-bold mb-1'>{parseDate(employee.dateOfStart)}</p></td>
//                   <td style={{ width: '180px' }}>
//                     <MDBBtn onClick={() => handleEdit(employee)} color='light' rounded size='sm' style={{ marginRight: '6px' }}>
//                       <MDBIcon icon='pen' className="me-2" />
//                     </MDBBtn>
//                     <MDBBtn onClick={() => { Delete(employee.id) }} color='light' rounded size='sm'>
//                       <MDBIcon icon='trash' className="me-2" />
//                     </MDBBtn>
//                   </td>
//                 </tr>
//               )
//             ))}
//           </MDBTableBody>
//         </MDBTable>
//         <MDBBtn onClick={handleButtonClick} color='light' rounded size='sm' className='me-2'>
//           לעמוד הוספת עובד
//         </MDBBtn>
//         <MDBBtn onClick={handleFilterByCity} color='primary' rounded size='sm'>
//           סנן לפי העיר הנוכחית שלי
//         </MDBBtn>
//       </div>
//     </div>
//   );
// }

// export default MyEmployees;
import * as ActionType from '../store/action'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

const MyEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [currentUserCity, setCurrentUserCity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleExportToExcel = () => {
        const data = employees;
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Employees');
        XLSX.writeFile(wb, 'employees.xlsx');
    };

    const handleEdit = (employee) => {
        dispatch({ type: ActionType.SET_EMPLOYEE, employee: employee });
        navigate(`/addEmployee`, { state: { employee: employee } });
    };

    useEffect(() => {
        console.log("Fetching employees...");
        getUserCity();
        const token = localStorage.getItem('token');
        axios.get("https://localhost:7243/api/Employees", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log("Employees retrieved successfully:", response.data);
            setEmployees(response.data);
        })
        .catch((error) => {
            console.error("Failed to retrieve employees:", error);
        });
    }, []);

    const getUserCity = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
                const data = await response.json();
                if (response.ok && data.address) {
                    let city = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.county;
                    if (city) {
                        city = city.toString();
                        console.log("Your current city is: " + city);
                        setCurrentUserCity(city);
                        return city;
                    } else {
                        console.log('No city name found in the results');
                    }
                } else {
                    console.log('Address not found');
                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const handleFilterByCity = () => {
        const filteredEmployees = employees.filter(employee => {
            return currentUserCity === employee.address;
        });
        setEmployees(filteredEmployees);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                axios.delete(`https://localhost:7243/api/Employees/${id}`, config)
                .then((response) => {
                    console.log("Employee deleted successfully:", response.data);
                    setEmployees(employees.filter(employee => employee.id !== id));
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                })
                .catch((error) => {
                    console.error("Error deleting employee:", error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the employee.',
                        'error'
                    );
                });
            }
        });
    };

    const parseDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    const handleButtonClick = () => {
        navigate("/addEmployee");
    };

    return (
        <div style={{ backgroundColor: '#eee' }}>
            <div style={{ width: '80vw', margin: '0 auto', padding: '30px', borderRadius: '10px' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px' }}
                />
                <MDBTable responsive sm bordered>
                    <MDBTableHead style={{ backgroundColor: 'grey', color: '#e9ecef' }}>
                        <tr>
                            <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Start Date</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {employees.filter((employee) => {
                            if (searchTerm === "") {
                                return employee;
                            } else if (employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())||
                                employee.idNumber.toLowerCase().includes(searchTerm.toLowerCase())||
                                employee.dateOfStart.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return employee;
                            }
                            return null;
                        }).map((employee, index) => (
                            <tr key={employee.id} style={{ backgroundColor: '#ffffff' }}>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <img src={employee.gender === 0 ? 'https://eyaldrori.co.il/wp-content/uploads/2020/06/man.png' : 'https://img.lovepik.com/element/45004/6432.png_860.png'} alt='' style={{ width: '45px' }} className='rounded-circle' />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{employee.firstName}</p>
                                            <p className='text-muted mb-0'>ID: {employee.idNumber}</p>
                                        </div>
                                    </div>
                                </td>
                                <td><p className='fw-bold mb-1'>{employee.lastName}</p></td>
                                <td><p className='fw-bold mb-1'>{parseDate(employee.dateOfStart)}</p></td>
                                <td style={{ width: '180px' }}>
                                    <MDBBtn onClick={() => handleEdit(employee)} color='light' rounded size='sm' style={{ marginRight: '6px' }}>
                                        <MDBIcon icon='pen' className="me-2" />
                                    </MDBBtn>
                                    <MDBBtn onClick={() => handleDelete(employee.id)} color='light' rounded size='sm'>
                                        <MDBIcon icon='trash' className="me-2" />
                                    </MDBBtn>
                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
                <MDBBtn onClick={handleButtonClick} color='light' rounded size='sm' className='me-2'>Add Employee</MDBBtn>
                <MDBBtn onClick={handleFilterByCity} color='primary' rounded size='sm' className='me-2'>Filter by My Current City</MDBBtn>
                <MDBBtn onClick={handleExportToExcel} color='primary' rounded size='sm' className='me-2'>Export to Excel</MDBBtn>
            </div>
        </div>
    );
};

export default MyEmployees;

