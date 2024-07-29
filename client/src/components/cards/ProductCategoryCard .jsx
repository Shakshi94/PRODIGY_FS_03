import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';


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
      opacity:0.8;
    }
  
`;

const Menu = styled.div`
    width: 90%;
    position: absolute;
    z-index: 10;
    color: ${({theme}) => theme.text_primary};
    bottom:20px;
    left:50;
    rightL50;
    display:flex;
    gap:12px;
`;

const Sale = styled.div`
    position: absolute;
    z-index: 10;
    color: ${({theme}) => theme.primary};
    top: 10px;
    right:10px;
    font-size: 12px;
    font-weight: 600;
    color: white;
    background: green;
    padding: 3px 6px;
    border-radius: 4px;
    @media screen and (max-width:600px){
        font-size: 10px;
    }
`;

const Button = styled.div`
    width:100%;
    color: ${({theme})=> theme.primary};
    padding: 12px 20px;
    background: white;
    border-radius: 12px;
    text-align: center;
    font-weight: 500;
    @media screen and (max-width:600px){
      padding: 6px 14px;
    }
`;

const ProductCategoryCard  = ({category}) => {

  const navigate = useNavigate();

  return <Card onClick={() => navigate(`/shop?category=${category.name}`)}>
    <Top>
        <Image src={category.img}></Image>
        <Menu>
            <Button>{category.name}</Button>
        </Menu>
        <Sale>{category.off}</Sale>
    </Top>
  </Card>
}

ProductCategoryCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    off: PropTypes.string.isRequired,
  }).isRequired,
};


export default ProductCategoryCard ;