import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px 30px;
    padding-bottom: 200px;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    @media(max-width:768px){
    padding: 20px 12px;
    }
    background: ${({theme}) => theme.bg};
`;
const Section = styled.div`
    max-width: 1400px;
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    gap: 28px;
`;


const CardWrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
    gap:24px;
    justify-content:center;
    @media screen and (max-width:750px){
        gap:14px;
    }
`;

const Title = styled.div`
    font-size:28px;
    font-weight: 500;
    display:flex;
    justify-content: ${({center}) => (center ? 'center':'space-between')}
    align-items: center;
`;

const Wrapper = styled.div``;

const Left = styled.div`
    background: red;
`;

const Right = styled.div`
   background: blue;
`;


const Favourite = () => {
  return <Container>

    <Section>
      <Title></Title>
      <Wrapper>
        <Left>L</Left>
        <Right> R</Right>
      </Wrapper>
    </Section>
  </Container>
}

export default Favourite;