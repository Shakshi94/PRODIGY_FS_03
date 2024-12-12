import React, { useState } from 'react'
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { userSignUp } from '../api';

import { loginSuccess } from '../redux/reducers/userSlice';
import { openSnackbar } from '../redux/reducers/snackbarSlice';
const Container = styled.div`
  width:100%;
  max-width:500px;
  display: flex;
  flex-direction: column;
  gap:36px;
`;
const Title = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: ${({theme} )=> theme.primary};
`;
const Span = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({theme} )=> theme.text_secondary + 90};
`;

const Spann = styled.span`
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;

  @keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(14deg);
  }
  30% {
    transform: rotate(-8deg);
  }
  40% {
    transform: rotate(14deg);
  }
  50% {
    transform: rotate(-4deg);
  }
  60% {
    transform: rotate(10deg);
  }
  70% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
`;

const SignUp = ({setOpenAuth}) => {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const [buttonDisable,setButtonDisable] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
   const validateInputs = () =>{
    if(!email || !password || !name){
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisable(true);

    if(validateInputs()){
       await userSignUp({name,email,password})
        .then((res)=> {
          dispatch(loginSuccess(res.data));
          dispatch(openSnackbar({
            message: "Sign Up Successful",
            severity: "success",
          })
        ); 
        
        setLoading(false);
        setButtonDisable(false);
        setOpenAuth(false);
      }).catch((err) => {
        if(err.response.data.message){
          setLoading(false);
          setButtonDisable(false);
          alert(err.response.data.message);
          dispatch(
            openSnackbar({
              message: err.response.data.message,
              severity: 'error',
            })
          );
        }else{
          setLoading(false);
          setButtonDisable(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: 'error',
            })
          )
        }
      })
    }


    setButtonDisable(false);
      setLoading(false);
  };
  return <Container>
    <div>
      <Title>Create New Account<Spann>👋</Spann></Title>
      <Span>Please enter details to create a new account</Span>
    </div>

    <div style={{display:'flex',gap:'20px',flexDirection:'column'}}>

       <TextInput 
        label='Full Name' 
        placeholder='Enter your full name'
        value={name}
        handelChange={(e) => setName(e.target.value)}
      />

      <TextInput 
        label='Email Address' 
        placeholder='Enter your email address'
        value={email}
        handelChange={(e) => setEmail(e.target.value)}
      />

      <TextInput 
        label='Password' 
        placeholder='Enter your Password'
        password
        value={password}
        handelChange={(e) => setPassword(e.target.value)}
      />
      <Button text='Sign Up' onClick={handleSignUp} isLoading={loading} isDisabled={buttonDisable}></Button>
    </div>
  </Container>
}

export default SignUp;