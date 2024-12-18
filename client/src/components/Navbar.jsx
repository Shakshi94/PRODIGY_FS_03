import React, { useState } from 'react'
import styled from 'styled-components';
import logo from '../utils/Images/busybuylogo.png'
import { NavLink } from 'react-router-dom';
import Button from './Button';
import {FavoriteBorder, SearchRounded, ShoppingCartOutlined,MenuRounded} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { logout } from '../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';


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

const MobileIcon = styled.div`
   color: ${({theme}) => theme.primary};
   display:none;
   @media screen and (max-width:768px){
     display: flex;
     align-items: center;
     
   }
`;

const MobileIcons = styled.div`
   color: ${({theme}) => theme.primary};
   display:none;
   @media screen and (max-width:768px){
    display: flex;
    align-items: center;
    justify-content:center;
    gap: 16px;
   }
`;

const MobileMenu = styled.ul`
      display: flex;
      flex-direction:column;
      align-items: start;
      padding:0 6px;
      gap:16px;
      list-style: none;
      width:80%;
      padding:12px 40px 24px 40px;
      background: ${({theme}) => theme.card_light + 99};
      position: absolute;
      top: 80px;
      right:0;
      transition: all 0.6s ease-in-out;
      tranform: ${({isOpen}) => (isOpen ? 'translateY(0)':'translateY(-100%)')};
      border-radius: 0 0 20px 20px;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
      opacity: ${({isOpen}) => (isOpen ? '100%':'0')};
      z-index: ${({isOpen}) => (isOpen ? '1000':'-1000')};
`;

const TextButton = styled.div`
    text-align: end;
    color: ${({theme}) => theme.text_primary};
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    font-weight: 600;
    &:hover{
      color: ${({theme})=> theme.primary};
    }

`;
const Navbar = ({ openAuth,setOpenAuth,currentUser}) => {
  const [isOpen,setIsOpen] = useState(false);
  const handleHamburger = ()=>{
      setIsOpen(!isOpen);
  }
  const dispatch = useDispatch();
  return (
    <Nav>
      <NavbarContainer>
        <MobileIcon>
          <MenuRounded style={{color:'inherit'}} onClick={handleHamburger}/>
        </MobileIcon>
        <NavLogo><Logo src={logo}/><Name>BusyBuy</Name></NavLogo>

       {isOpen && (<MobileMenu isOpen={isOpen}>
           <Navlink to="/" onClick={handleHamburger} >Home</Navlink>
           <Navlink to="/shop" onClick={handleHamburger} >Shop</Navlink>
           <Navlink to="/New_Arrivals" onClick={handleHamburger} >New&nbsp;Arrivals</Navlink>
           <Navlink to="/Orders" onClick={handleHamburger} >Orders</Navlink>
           <Navlink to="/Contact" onClick={handleHamburger} >Contact</Navlink>
           
          {currentUser ? (
            <Button
             text='Logout'
             small
             onClick={()=> dispatch(logout())} 
            />
          ):(
            <div style={{
             flex:'1',
             display:'flex',
             gap: '12px',
           }}> 
           <Button text="Sign Up" outlined small onClick={()=> setOpenAuth(!openAuth)}/>  
           <Button text="Sign&nbsp;In" small onClick={()=> setOpenAuth(!openAuth)}/>
            </div>
          )} 
           
        </MobileMenu>)}

        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/shop">Shop</Navlink>
          <Navlink to="/New_Arrivals">New&nbsp;Arrivals</Navlink>
          <Navlink to="/Orders">Orders</Navlink>
          <Navlink to="/Contact">Contact</Navlink>
         
        </NavItems>

        <MobileIcons>
          <Navlink to='/search'>
          <SearchRounded sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>

           {currentUser ? (
              <>
           
          <Navlink to='/favorite'>
          <FavoriteBorder sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>

          <Navlink to='/cart'>
          <ShoppingCartOutlined sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>
          
          
          <Avatar src={currentUser?.img} sx={{
              color: 'inherit',
              fontSize: '28px',
            }}>{currentUser?.name[0]}
          </Avatar>
    
          </>
          ):(
          <Button text="Sign&nbsp;In" small onClick={()=> setOpenAuth(!openAuth)}/>
          )} 
    
        </MobileIcons>

        <ButtonContainer>
          <Navlink to='/search'>
          <SearchRounded sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>
          {currentUser ? (
                <>
          <Navlink to='/favorite'>
          <FavoriteBorder sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>

          <Navlink to='/cart'>
          <ShoppingCartOutlined sx={{color:'inherit',fontSize:'28px'}}/>
          </Navlink>
          <Avatar src={currentUser?.img} sx={{
              color: 'inherit',
              fontSize: '28px',
            }}>{currentUser?.name[0]}
          </Avatar>
          <TextButton onClick={()=> dispatch(logout())}>Logout</TextButton>
          </>
          ):(
          <Button text="Sign&nbsp;In" small onClick={()=> setOpenAuth(!openAuth)}/>
          )}

        </ButtonContainer>

      </NavbarContainer>
    </Nav>
  )
}

export default Navbar;