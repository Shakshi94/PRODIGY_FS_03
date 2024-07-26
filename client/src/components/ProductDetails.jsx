import React, { useState } from "react";
import styled from "styled-components";
import { Rating } from '@mui/material';
import Button from '../components/Button';
import { FavoriteRounded } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  width: 100%;
  padding: 12px;
  gap: 32px;
  @media (max-width: 750px){
    flex-direction: column;
    justify-content: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 750px){
    margin-top: 10rem;
  }
`;

const Image = styled.img`
  height: 400px;
  border-radius: 12px;
  @media (max-width: 750px){
    height: 200px;
    flex-direction: column;
    justify-content: center;
  }
`;

const Details = styled.div`
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({theme}) => theme.text_primary};
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({theme}) => theme.text_primary};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({theme}) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({theme}) => theme.text_secondary + 50};
`;

const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({theme}) => theme.text_primary};
`;

const Percent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: green;
`;

const Sizes = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Items = styled.div`
  display: flex;
  gap: 12px;
`;

const Item = styled.div`
  border: 1px solid ${({theme, selected}) => (selected ? theme.primary : theme.text_secondary)};
  font-size: 14px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({theme, selected}) => (selected ? theme.primary : 'transparent')};
  color: ${({theme, selected}) => (selected ? '#fff' : theme.text_primary)};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 0px;
`;

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState('S');

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <Image src='https://assets.ajio.com/medias/sys_master/root/20220318/8lV3/62341b9ef997dd03e21cefa8/-473Wx593H-464032669-white-MODEL.jpg'></Image>
        </ImageWrapper>
        <Details>
          <div>
            <Title>Title</Title>
            <Name>Name</Name>
          </div>
          <Rating value={3.5} sx={{ fontSize: "20px" }} />
          <Price>&#8377;1200 <Span>&#8377;1500</Span><Percent>20% off</Percent></Price>
          <Desc>Product Desc</Desc>
          <Sizes>
            <Items>
              {['S', 'M', 'L', 'XL'].map(size => (
                <Item
                  key={size}
                  selected={selectedSize === size}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </Item>
              ))}
            </Items>
          </Sizes>
          <ButtonWrapper>
            <Button text='Add to Cart' full outlined />
            <Button text='Buy Now' full />
            <Button leftIcon={
              <FavoriteRounded sx={{ fontSize: '22px', color: 'red' }} />
            }
             full 
             outlined
            />
          </ButtonWrapper>
        </Details>
      </Wrapper>
    </Container>
  );
}

export default ProductDetails;
