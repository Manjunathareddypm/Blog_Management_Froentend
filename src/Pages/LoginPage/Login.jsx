
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import backgroundImage from "../../assest/backround-image.png";
import styled from "@emotion/styled";
import { signedup } from "../../Services/blogs.service";
import { signedin } from "../../Services/blogs.service";
import { useDispatch } from "react-redux";
import { setAuthorName } from "../../redux/Slice/HomeDashboardSlice";
import { addTokenToSystem, setAuthenticated } from "../../redux/Slice/Authentications";
export let Author
const fullnameRegex = /^[A-Z]{1}[a-z ]{1,}[ ]{1}[A-Z]{1}[a-z ]{2,}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/

const Component = styled(Box)`
  width: 400px;
  margin: auto ;
  background-color: aliceblue;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.4);
 
`;
const Image = styled("img")({
  width: "100px",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  alignitems: center;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  height: 48px;
  border-radius: 2px;
`;
const SignupButton = styled(Button)`
   text-transform: none;
   background: #fff;
   color:#2874f0;
   height:48px;
   border-radius: 2px;
   box shadow: 0px 2px 4px 0 rgb(0 0 0/ 20%);
   `;

function Login() {

  const imageURL = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  const [account, toggleAccount] = useState("login");
  const [selectuser, setselectuser] = React.useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handleChange = (event) => {
    setselectuser(event.target.value);
  };
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const [signinObj, setSiginObj] = React.useState({
    email: "",
    password: "",
  });

  const [signupObj, setSigupObj] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errorObj, setErrorObj] = React.useState({
    fullNameError: false,
    fullNameHelper: "",
    emailError: false,
    emailHelper: "",
    passwordError: false,
    passwordHelper: "",
  });
  const takefullname = (fname) => {
    setSigupObj((prevState) => ({
      ...prevState,
      fullName: fname.target.value,
    }));
  };

  const takeEmailsignup = (event) => {
    setSigupObj((prevState) => ({ ...prevState, email: event.target.value }));
  };

  const takePasswordsignup = (e) => {
    setSigupObj((prevState) => ({ ...prevState, password: e.target.value }));
  };

  const takeEmail = (event) => {
    setSiginObj((prevState) => ({ ...prevState, email: event.target.value }));
  };
  const takePassword = (e) => {
    setSiginObj((prevState) => ({ ...prevState, password: e.target.value }));
  };
  const submit = async () => {
    let emailTest = emailRegex.test(signinObj.email);
    let passwordTest = passwordRegex.test(signinObj.password);

    if (emailTest === false) {
      setErrorObj((prevState) => ({
        ...prevState,
        emailError: true,
        emailHelper: "Enter valid email",
      }));
    } else {
      setErrorObj((prevState) => ({
        ...prevState,
        emailError: false,
        emailHelper: "",
      }));
    }
    if (passwordTest === false) {
      setErrorObj((prevState) => ({
        ...prevState,
        passwordError: true,
        passwordHelper: "Enter valid password",
      }));
    } else {
      setErrorObj((prevState) => ({
        ...prevState,
        passwordError: false,
        passwordHelper: "",
      }));
    }
    
      let response = await signedin(signinObj);
      if (response.data.code == 200) {
        window.location.reload()
        await localStorage.setItem('token', response.data.data)
        await localStorage.setItem('author', signinObj.email)
        dispatch(setAuthorName(signinObj.email))
        dispatch(addTokenToSystem(response.data.data))
        dispatch(setAuthenticated(true))
      }
    
  };

  const submitforsignup = async () => {
    let fullnameTest = fullnameRegex.test(signupObj.fullName);
    console.log(fullnameTest, "Test");
    let emailTest = emailRegex.test(signupObj.email);
    let passwordTest = passwordRegex.test(signupObj.password);

    if (fullnameTest === false) {
      setErrorObj((prevState) => ({
        ...prevState,
        fullNameError: true,
        fullNameHelper: "enter first letter of both first and last name capital and having a space in between",
      }));
    } else {
      setErrorObj((prevState) => ({
        ...prevState,
        fullNameError: false,
        fullNameHelper: "",
      }));
    }

    if (emailTest === false) {
      setErrorObj((prevState) => ({
        ...prevState,
        emailError: true,
        emailHelper: "enter valid email",
      }));
    } else {
      setErrorObj((prevState) => ({
        ...prevState,
        emailError: false,
        emailHelper: "",
      }));
    }
    if (passwordTest === false) {
      setErrorObj((prevState) => ({
        ...prevState,
        passwordError: true,
        passwordHelper: "enter password having at least one small,cap,special character,amd number with range 8-16",
      }));
    } else {
      setErrorObj((prevState) => ({
        ...prevState,
        passwordError: false,
        passwordHelper: "",
      }));
    }
    if (fullnameTest === true && emailTest === true && passwordTest === true) {

      let response = await signedup(signupObj);
      if (response) {
        toggleSignup()
      }

    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        display:"flex",

        alignItems:"center",
        width: "100vw",
        height: "100vh",
        position: "fixed",

      }}
    >
      <Component style={{ marginTop: '28px' }}>
        <Image src={imageURL} alt="login" />
        {account == "login" ? (
          <Wrapper>
            <TextField
              label="Enter your mail id"
              variant="standard"
              onChange={takeEmail}
              error={errorObj.emailError}
              helperText={errorObj.emailHelper}
            />
            <TextField
              label="Enter your password"
              variant="standard"
              onChange={takePassword}
              type='password'
              error={errorObj.passwordError}
              helperText={errorObj.passwordHelper}
            />
            <LoginButton variant="contained" onClick={submit}>
              Login
            </LoginButton>
            <Typography style={{ marginLeft: "150px" }}>OR</Typography>
            <SignupButton onClick={toggleSignup}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
          

            <TextField
              label="Enter your fullname"
              variant="standard"
              onChange={takefullname}
              error={errorObj.fullNameError}
              helperText={errorObj.fullNameHelper}
            />
            <TextField
              label="Enter your mail id"
              variant="standard"
              onChange={takeEmailsignup}
              error={errorObj.emailError}
              helperText={errorObj.emailHelper}
            />
            <TextField
              label="Enter your password"
              variant="standard"
              onChange={takePasswordsignup}
              error={errorObj.passwordError}
              helperText={errorObj.passwordHelper}
            />
            <SignupButton onClick={submitforsignup} >Signup</SignupButton>
            <Typography style={{marginLeft:'150px'}}>OR</Typography>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Component>
    </div>
  );
}

export default Login;
