import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import './login-signup.css';
import AuthContext from '../context/AuthContext'

function Login() {
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [rememberMe, setRememberMe] = useState(false);
  // const [message, setMessage] = useState('');

  const {loginUser} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target)

    const email = e.target.email.value
    const password = e.target.password.value

    loginUser(email, password)
  }

  // const handleGoogleLoginSuccess = async (credentialResponse) => {
  //   const { credential } = credentialResponse;
  //   try {
  //     const response = await fetch('http://localhost:8000/api/google-login/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ token: credential }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("Google Token : ", data.token)
  //       AuthService.saveToken(data.token); // save token in AuthService
  //       navigate('/chatbot');
  //     } else {
  //       setMessage(data.msg || 'Google login failed');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setMessage('Something went wrong!');
  //   }
  // };

  // const handleGoogleLoginFailure = (error) => {
  //   console.log('Google login failure:', error);
  //   setMessage('Google login failed. Please try again.');


  
  // };

  return (
    // <GoogleOAuthProvider clientId="762258283337-qg5rlsln6kjmmj0r74nt10qbro8kj0rg.apps.googleusercontent.com">
    <Card className="w-full h-full flex flex-col md:flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-full md:w-3/5 shrink-0 rounded-b-none md:rounded-r-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-48 md:h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="w-full md:w-2/5">
      <form action="#" className="mx-auto text-left mt-4 md:mt-20" onSubmit={handleSubmit} id="card">
        <Card className="w-full max-w-md">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-20 md:h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 px-4 md:px-6">
            <Input label="Email" size="lg" type="email" name="email"/>
            <Input label="Password" size="lg" type="password" name="password" />
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-4 px-4 md:px-6">
            <Button variant="gradient" fullWidth type="submit">
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 md:mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
      </CardBody>
    </Card>
    // </GoogleOAuthProvider>
  );
}

export default Login;
