import styled from 'styled-components';
import TextInput from '../components/TextInput';
import Button from '../components/Button'
import { addToCart, getCart, placeOrder, removeFromCart } from '../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { openSnackbar } from '../redux/reducers/snackbarSlice';
import { DeleteOutline } from '@mui/icons-material';

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
    justify-content: ${({center}) => (center ? 'center':'space-between')}
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    gap: 32px;
    width: 100%;
    padding: 12px;
    @media (max-width: 750px){
      flex-direction: column;
    }
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap:12px;
    @media (max-width: 750px){
        flex: 1.2;
    }
`;

const Table = styled.div`
    font-size: 16px;
    display: flex;
    align-items: center;
    gap:30px;
    ${({head}) => head && `margin-bottom: 22px`}
`;
const TableItem = styled.div`
    ${({flex}) => flex && `flex:1;`}
     ${({bold}) => bold && `font-weight: 600; font-size: 18px;`}
`;

const Counter = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    border: 1px solid ${({theme}) => theme.text_secondary + 99};
    border-radius: 8px;
    padding: 4px 12px;
`;

const Product = styled.div`
    display: flex;
    gap: 16px;

`;
const Img = styled.img`
    height: 80px;
`;

const Details = styled.div``;
const ProTitle= styled.div`
    color: ${({theme}) => theme.primary};
    font-size: 16px;
    font-weight: 500;
`;
const ProDesc = styled.div`
    color: ${({theme}) => theme.text_primary};
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const ProSize = styled.div`
    font-size: 14px;
    font-weight: 400;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap:  12px;
    @media (max-width: 750px){
        flex: 0.8;
    }
`;

const SubTotal = styled.div`
    font-size: 22px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
`;
const Delivery = styled.div`
    font-size: 18px;
    font-weight: 500;
    display: flex;
    gap: 6px;
    flex-direction: column;
`;


const Cart = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload , setReload] = useState(false);
  const [products , setProducts] = useState([]);
  const [buttonLoad,setButtonLoad] = useState(false);

  const [deliveryDeatils, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completedAddress: "",
  });

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("BusyBuy-app-token");
    await getCart(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  
  const addCart = async (id) => {
    const token = localStorage.getItem("BusyBuy-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
       setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  
  const removeCart = async (id,quantity,type) => {

    const token = localStorage.getItem("BusyBuy-app-token");

    let qnt = quantity > 0 ? 1 : null;
    if (type === 'full') qnt = null;
    await removeFromCart(token,{
      productId: id,
      quantity: qnt,
    })
     .then((res)=>{
      setReload(!reload);
     })
     .catch((err)=>{
      setReload(!reload);
       dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
     });
  }

  const calculateSubtotal = () => {
    return products.reduce(
      (total,item) => total + item.quantity * item?.product?.price?.org,
      0
    );
  }

  useEffect(()=>{
    getProducts();
  },[reload]);
  
  const convertAddressToString = () => {
  return `${deliveryDeatils.firstName}, ${deliveryDeatils.lastName}, ${deliveryDeatils.completedAddress}, ${deliveryDeatils.phoneNumber}, ${deliveryDeatils.emailAddress}`;
}


  const PlaceOrder = async() => {
      setButtonLoad(true);
      try{
        const isDeliveryDetailsFilled = 
            deliveryDeatils.firstName &&
            deliveryDeatils.lastName &&
            deliveryDeatils.completedAddress &&
            deliveryDeatils.phoneNumber &&
            deliveryDeatils.emailAddress;

         if(!isDeliveryDetailsFilled){
            dispatch(
              openSnackbar({
                message: "Please fill in all required delivery details! ",
                severity: "error",
              })
            );
            return;
         }   
          const token = localStorage.getItem("BusyBuy-app-token");
          const totalAmount = calculateSubtotal().toFixed(2);
          const orderDetails = {
            products,
            address: convertAddressToString(deliveryDeatils),
            totalAmount,
          };
          await placeOrder(token,orderDetails);
          dispatch(
          openSnackbar({
            message: "Order Placed successfully!",
            severity: "success",
          })
        );
        setButtonLoad(false);
        setReload(!reload);
      }catch(err){
       dispatch(
          openSnackbar({
            message: "Failed to Place order, Please try again !",
            severity: "error",
          })
        );
      }
      setButtonLoad(false);
      setReload(!reload);
  }
  return (
  <Container>
    {loading ? (<CircularProgress/> ): (
    <Section>
      <Title>Your Shopping Cart</Title>

      {products.length === 0 ? (<>Cart is empty</>) : (
      <Wrapper>
        <Left>
          <Table>
            <TableItem bold flex>Product</TableItem>
            <TableItem bold>Price</TableItem>
            <TableItem bold>Quantity</TableItem>
            <TableItem bold>Subtotal</TableItem>
          </Table>
          {products?.map((item) => (
          <Table key={item._id}>
            <TableItem bold flex>
              <Product>
                <Img src={item?.product?.image} alt={item?.product?.title || 'Product Image'} />
                <Details>
                  <ProTitle>{item?.product?.title || 'No title'}</ProTitle>
                  <ProDesc>{item?.product?.name || 'No name'}</ProDesc>
                  <ProSize>Size:&nbsp;&nbsp;XL</ProSize>
                </Details>
              </Product>
            </TableItem>
            <TableItem bold>${item?.product?.price?.org || '0'}</TableItem>
            <TableItem bold>
              <Counter>
                <div 
                style={{ cursor: 'pointer',flex: 1 }} 
                onClick={() => removeCart(item?.product?._id , item?.quantity - 1)}
                >-</div>
                {item?.quantity}
                <div 
                style={{ cursor: 'pointer',flex: 1 }}
                onClick={() => addCart(item?.product?._id)}
                > + </div>
              </Counter>
            </TableItem>
            <TableItem bold>{" "}${(item?.quantity * item?.product?.price?.org).toFixed(2)}</TableItem>
            <TableItem>
              <DeleteOutline
              sx={{color:'red',cursor:'pointer'}}
              onClick={() => removeCart(
                item?.product?._id,
                item?.quantity - 1,
                'full'
              )}
              />
            </TableItem>
          </Table>
      ))}
        </Left>
        <Right>
          <SubTotal>SubTotal: ${calculateSubtotal().toFixed(2)}</SubTotal>
          <Delivery>
            DeliveryDeatils:
            <div>
              <div style={{display: 'flex', gap: '6px'}}>
                <TextInput 
                small 
                handelChange={(e) => setDeliveryDetails({
                ...deliveryDeatils,
                firstName: e.target.value,
              })}
              value={deliveryDeatils.firstName}
                placeholder='First Name'/>
                <TextInput 
                small
                handelChange={(e) => setDeliveryDetails({
                ...deliveryDeatils,
                lastName: e.target.value,
              })}
              value={deliveryDeatils.lastName} 
                placeholder='Last Name'/>
              </div>
              <TextInput 
              small 
              placeholder='Email Address'
              handelChange={(e) => setDeliveryDetails({
                ...deliveryDeatils,
                emailAddress: e.target.value,
              })}
              value={deliveryDeatils.emailAddress}
              />
              <TextInput 
              small 
              handelChange={(e) => setDeliveryDetails({
                ...deliveryDeatils,
                phoneNumber: e.target.value,
              })}
              value={deliveryDeatils.phoneNumber}
              placeholder='Phone No. +91 XXXXX XXXXX'/>
              <TextInput 
              small 
              textArea 
              rows="5"
              handelChange={(e) => setDeliveryDetails({
                ...deliveryDeatils,
                completedAddress: e.target.value,
              })}
              value={deliveryDeatils.completedAddress}
              placeholder='Complete Address (Address,State,Country,Pincode)'/>
            </div>
          </Delivery>

           <Delivery>
            PaymentDeatils:
            <div>
                <TextInput small placeholder='Card Number'/>
              <div style={{display: 'flex', gap: '6px'}}>
                <TextInput small placeholder='Expiry Date'/>
                <TextInput small placeholder='CVV'/>
              </div>
            </div>
          </Delivery>
          <Button 
          text='Place Order' 
          small onClick={PlaceOrder}
          isDisabled={buttonLoad}/>
        </Right>
      </Wrapper>
      )}
    </Section>
    )}
  </Container>
  )
}

export default Cart;