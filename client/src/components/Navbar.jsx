import React from 'react'
import styled from 'styled-components';
import logo from '../utils/Images/busybuylogo.png'
import { NavLink } from 'react-router-dom';
import Button from './Button';
import {FavoriteBorder, SearchRounded, ShoppingCartOutlined} from '@mui/icons-material';


const Nav = styled.div`
    background-color: ${({theme})=>theme.bg};
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    color: white;
`;
const NavbarContainer = styled.div`
     width: 100%;
     max-width: 1400px;
     padding: 0 24px;
     display: flex; 
     gap: 14px;
     align-items: center;
     justify-content: space-between;
     font-size: 1rem;
`;

const NavLogo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 6px;
    font-weight: 500;
    font-size: 18px;
    text-decoration: none;
    color: inherit;
`;
 
const NavItems = styled.ul`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:32px;
    padding:0 6px;
    list-style: none;
    @media screen and (max-width:768px){
    display:none;
    
    }
`;

const Navlink = styled(NavLink)`
    display: flex;
    align-items: center;
    color :${({theme}) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 1s slide-in;
    text-decoration: none;
    &:hover { 
    color: ${({theme}) => theme.primary};
    }
    &.active {
      color: ${({theme}) => theme.primary};
      border-bottom: 1.8px solid ${({theme}) => theme.primary};
    }
`;


const ButtonContainer = styled.div`
   width:100%;
   height:100%;
   display:flex;
   justify-content:flex-end;
   gap:28px;
   align-items:center; 
   padding:0 6px;
   color: ${({theme}) => theme.primary};
   @media screen and (max-width:768px){
   display:none;
   }
`;

const Logo = styled.img`
       height:34px;
`;

const Name = styled.p`
    color: ${({theme}) => theme.primary};
`;

const Navbar = () => {
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo><Logo src={logo}/><Name>BusyBuy</Name></NavLogo>

        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/Shop">Shop</Navlink>
          <Navlink to="/New_Arrivals">New&nbsp;Arrivals</Navlink>
          <Navlink to="/Orders">Orders</Navlink>
          <Navlink to="/Contact">Contact</Navlink>
        </NavItems>

        <ButtonContainer>
          <Navlink to='/search'>
          <SearchRounded sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>

          <Navlink to='/favorite'>
          <FavoriteBorder sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>

          <Navlink to='/cart'>
          <ShoppingCartOutlined sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>

          <Button text="SignIn" small></Button>
        </ButtonContainer>

      </NavbarContainer>
    </Nav>
  )
}

export default Navbar;