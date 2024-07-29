import  { useEffect, useState} from 'react'
import styled from 'styled-components';
import {CircularProgress,Rating,} from '@mui/material'
import {FavoriteRounded,AddShoppingCartOutlined, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from '../../redux/reducers/snackbarSlice';
import { useDispatch } from 'react-redux';
import { addToFavourite, getFavourite, removeFromFavourite } from '../../api';
import PropTypes from 'prop-types';

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


const ProductCard = ({product}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    const addFavorite = async () =>{
        setFavorite(true);
        const token = localStorage.getItem("BusyBuy-app-token");
        await addToFavourite(token,{productID:product?._id})
            .then((res)=>{
                setFavorite(true);
                setFavoriteLoading(false);
            })
            .catch((err)=>{
                setFavoriteLoading(false);
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: 'error',
                    })
                );
            });

        
    }

    
    const removeFavorite = async () =>{
        setFavorite(false);
        const token = localStorage.getItem("BusyBuy-app-token");
        await removeFromFavourite(token,{productID:product?._id})
            .then((res)=>{
                setFavorite(false);
                setFavoriteLoading(false);
            })
            .catch((err)=>{
                setFavoriteLoading(false);
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: 'error',
                    })
                );
            });
    }

    const checkFavourite = async () => {
        setFavorite(true);
        const token = localStorage.getItem("BusyBuy-app-token");
        await getFavourite(token,{productID:product?._id})
        .then((res)=>{
                const isFavourite = res.data?.some(
                    (favorite) => favorite._id === product?._id
                );
                setFavorite(isFavourite);
                setFavoriteLoading(false);
            })
            .catch((err)=>{
                setFavoriteLoading(false);
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: 'error',
                    })
                );
            });
    }

    useEffect(()=> {
        checkFavourite();
    },[favorite]);

  return (
  <Card>
    <Top>
        <Image src={product?.image}></Image>
        <Menu>
          <MenuItems 
          onClick={()=> (favorite ? removeFavorite(): addFavorite())}
          >
          {favoriteLoading ? (
            <CircularProgress sx={{fontSize: "20px"}}/>
          ):(
            <>
            {favorite ?(
                 <FavoriteRounded sx={{fontSize: "20px",color:'red'}}/>
                ):( 
                <FavoriteBorder sx={{fontSize: "20px"}}/>
                ) }
           </>
            ) }
           
          </MenuItems>  
          <MenuItems>
           <AddShoppingCartOutlined sx={{fontSize: "20px",color:'inherit'}}/>
          </MenuItems>
        </Menu>
        <Rate>
             <Rating value={3.5} sx={{fontSize: "20px"}}/>
        </Rate>
    </Top>
    <Details onClick={() => navigate(`/shop/${product._id}`)}>
        <Title>{product?.title}</Title>
        <Desc>{product?.name}</Desc>
        <Price>&#8377;{product?.price?.org}<Span>&#8377;${product?.price?.mrp}</Span><Percent>${product?.price?.off}%off</Percent></Price>
    </Details>
  </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.shape({
      org: PropTypes.number.isRequired,
      mrp: PropTypes.number.isRequired,
      off: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;