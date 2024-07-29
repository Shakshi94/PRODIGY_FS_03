import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import {  userSignIn } from '../api';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../redux/reducers/snackbarSlice';
import { loginSuccess } from '../redux/reducers/userSlice';


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

const TextButton = styled.div`
    display:flex;
    justify-content:start;
    width: 100%;
    text-align: end;
    color: ${({theme} )=> theme.text_primary};
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    font-weight: 500;
    &:hover { 
    color: ${({theme}) => theme.primary};
    }
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

const SignIn = () => {
  const dispatch = useDispatch();
  const [buttonLoading,setButtonLoading] = useState(false);
  const [buttonDisable,setButtonDisable] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const validateInputs = () =>{
    if(!email || !password){
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async()=>{
    setButtonLoading(true);
    setButtonDisable(true);
    if(validateInputs()){
       await userSignIn({email,password})
        .then((res)=> {
          dispatch(loginSuccess(res.data));
          dispatch(openSnackbar({
            message: "Login Successful",
            severity: "success",
          })
        );  
      }).catch((err) => {
        if(err.response){
          setButtonLoading(false);
          setButtonDisable(false);
          alert(err.response.data.message);
          dispatch(
            openSnackbar({
              message: err.response.data.message,
              severity: 'error',
            })
          );
        }else{
          setButtonLoading(false);
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

    setButtonLoading(false);
    setButtonDisable(false);
  };

  return (<Container>
    <div>
      <Title>Welcome to BusyBuy<Spann>👋</Spann></Title>
      <Span>Please login with your details here</Span>
    </div>

    <div style={{display:'flex',gap:'20px',flexDirection:'column'}}>
      <TextInput 
        label='Email Address' 
        email
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
      <TextButton>Forget Password?</TextButton>
      <Button text='Sign In' onClick={handleSignIn} isLoading={buttonLoading} isDisabled={buttonDisable}></Button>
    </div>
  </Container>
  );
}

export default SignIn