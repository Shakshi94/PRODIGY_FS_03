import React from 'react'
import styled from 'styled-components';
import bestSeller from "../../utils/Images/bestseller.jpg";
import {CircularProgress,Rating,} from '@mui/material'
import {FavoriteRounded,AddShoppingCartOutlined } from '@mui/icons-material'
const Card = styled.div`
    width: 250px;
    display:flex;
    flex-direction: column;
    gap: 16px;
    transition: all 0.3s ease-out;
    cursor: pointer;
    @media screen and (max-width:600px){
        width:170px;
    }
`;
const Image = styled.img`
    width: 100%;
    height: 320px;
    display:flex;
    border-radius: 6px;
    object-fit: cover;
    transition: all 0.3s ease-out;
     @media screen and (max-width: 600px){
        height: 240px;
    }
`;


const Menu = styled.div`
    position: absolute;
    z-index: 10;
    color: ${({theme}) => theme.text_primary};
    top:14px;
    right: 14px;
    display: none;
    flex-direction: column;
    gap:12px;

`;
const Top = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;
    position: relative;
    border-radius: 6px;
    transition: all 0.3s ease-out;
    &:hover { 
    color: ${({theme}) => theme.primary};
    }
    &:hover ${Image}{ 
      opacity:0.9;
    }
    &:hover ${Menu}{ 
      display: flex;
    }
`;
const MenuItems = styled.div`
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background: white;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
`;
const Rate = styled.div`
    position: absolute;
    z-index: 10;
    color: ${({theme}) => theme.text_primary};
    bottom: 8px;
    left: 8px;
    padding: 4px 8px;
    background: white;
    align-items: center;
    opacity: 0.9;
`;
const Details = styled.div`
    display:flex;
    gap:6px;
    flex-direction: column;
    padding: 4px 10px;
`;
const Title = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: ${({theme}) => theme.text_primary};

`;
const Desc = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({theme}) => theme.text_primary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const Span = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.text_secondary + 60};
    text-decoration: line-through;
    text-decoration-color: ${({theme}) => theme.text_secondary + 50};
`;
const Percent = styled.div`
     font-size: 12px;
    font-weight: 500;
    color:green;

`;
const Price = styled.div`
    display:flex;
    align-items: center;
    gap:8px;
    font-size: 18px;
    font-weight: 500;
    color: ${({theme}) => theme.text_primary};
`;


const ProductCard = () => {
  return <Card>
    <Top>
        <Image src={bestSeller}></Image>
        <Menu>
          <MenuItems>
           <FavoriteRounded sx={{fontSize: "14px",color:'red'}}/>
          </MenuItems>  
          <MenuItems>
           <AddShoppingCartOutlined sx={{fontSize: "20px",color:'inherit'}}/>
          </MenuItems>
        </Menu>
        <Rate>
             <Rating value={3.5} sx={{fontSize: "14px"}}/>
        </Rate>
    </Top>
    <Details>
        <Title>Title</Title>
        <Desc>Desc</Desc>
        <Price>&#8377;1200 <Span>&#8377;1500</Span><Percent>20%off</Percent></Price>
    </Details>
  </Card>
}

export default ProductCard;