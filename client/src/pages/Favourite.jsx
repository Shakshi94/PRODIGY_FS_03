import React from 'react'
import styled from 'styled-components';
import ProductCard from '../components/cards/ProductCard';

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


const Title = styled.div`
    font-size:28px;
    font-weight: 500;
    display:flex;
    justify-content: ${({center}) => (center ? 'center':'center')};
    align-items: center;
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
const Favourite = ({product}) => {
  return (
  <Container>
    <Section >
      <Title>Your Favourites</Title>
      <CardWrapper>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
      </CardWrapper>
    </Section>
  </Container>
      )
}

export default Favourite;