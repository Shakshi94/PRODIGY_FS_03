import styled,{ThemeProvider} from 'styled-components';
import {lightTheme }from './utils/Themes.js';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx';
import { useState } from 'react';
import Authentication from './pages/Authentication.jsx';
import Shoplisting from './pages/Shoplisting.jsx';
import Favourite from './pages/Favourite.jsx';
import Cart from './pages/Cart.jsx';
import ProductDetails from './components/ProductDetails.jsx';

const Container = styled.div`
      width:100%;
      height:100vh;
      display:flex;
      flex-direction:column;
      background: ${({theme})=> theme.bg};
      color: ${({theme})=> theme.text_primary};
      overflow-x:hidden;
      overflow-y:hidden;
      transition: all 0.2s ease ;
`;

function App() {
  const [openAuth,setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
      <Container>
        <Navbar setOpenAuth={setOpenAuth} openAuth={openAuth}/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/shop" exact element={<Shoplisting/>}/>
          <Route path="/favorite" exact element={<Favourite/>}/>
           <Route path="/cart" exact element={<Cart/>}/>
           <Route path="/shop/:id" exact element={<ProductDetails/>}/>
        </Routes>
        {openAuth && (<Authentication openAuth={openAuth} setOpenAuth={setOpenAuth}/>)}
      </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
