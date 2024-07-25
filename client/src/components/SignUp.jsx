import React from 'react'
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';

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

const SignUp = () => {
  return <Container>
    <div>
      <Title>Create New Account<Spann>👋</Spann></Title>
      <Span>Please enter details to create a new account</Span>
    </div>

    <div style={{display:'flex',gap:'20px',flexDirection:'column'}}>

       <TextInput 
        label='Full Name' 
        placeholder='Enter your full name'
      />

      <TextInput 
        label='Email Address' 
        placeholder='Enter your email address'
      />

      <TextInput 
        label='Password' 
        placeholder='Enter your Password'
      />
      <Button text='Sign Up'></Button>
    </div>
  </Container>
}

export default SignUp