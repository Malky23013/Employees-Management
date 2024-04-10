import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Swal from "sweetalert2";
const schema = yup.object().shape({
  Username: yup.string().required("This field is required").min(3, "Username must contain at least 3 characters"),
  Password: yup.string().required("This field is required").min(3, "Password must contain at least 3 characters"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  
  
const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://localhost:7243/api/Auth", data);
      console.log("succeed!!!!");
      console.log(response.data.token);
      localStorage.setItem('token',response.data.token)
      dispatch({type:"SET_USERNAME",user:data.Username});
      Swal.fire({
        icon: 'success',
        title: `Hello! ${data.Username}`,
        text: 'Logged in successfully. Welcome!',
      });
      
      navigate("/myEmployees");
    } catch (error) {
      console.error(error);
      setLoginError(true);
    }
  };

  return (
<section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon icon="user" className="me-3 fa-lg fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="Username" className="form-control" placeholder="Username" {...register("Username")} />
                          {errors.Username && <p className="error">{errors.Username.message}</p>}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon icon="lock" className="me-3 fa-lg fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="Password" className="form-control" placeholder="Password" {...register("Password")} />
                          {errors.Password && <p className="error">{errors.Password.message}</p>}
                        </div>
                      </div>
                    
                      <MDBBtn type="submit" className="mb-4" block>
                        Log in
                      </MDBBtn>
                    </form>
                    {loginError && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        Invalid username or password. Please try again.
                      </Alert>
                    )}
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://www.hrus.co.il/wp-content/uploads/%D7%9E%D7%97%D7%95%D7%91%D7%A8%D7%95%D7%AA-1-1021x580.jpg" className="img-fluid" alt="Sample image" />
                    {/* https://www.hrus.co.il/wp-content/uploads/%D7%9E%D7%97%D7%95%D7%91%D7%A8%D7%95%D7%AA-1-1021x580.jpg */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
  
