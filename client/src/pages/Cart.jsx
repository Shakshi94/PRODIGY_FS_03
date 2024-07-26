import styled from 'styled-components';
import img from '../utils/Images/signupandlogin.jpg';
import TextInput from '../components/TextInput';
import Button from '../components/Button'
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
  return (
  <Container>
    <Section>
      <Title>Your Shopping Cart</Title>
      <Wrapper>
        <Left>
          <Table>
            <TableItem bold flex>Product</TableItem>
            <TableItem bold>Price</TableItem>
            <TableItem bold>Quantity</TableItem>
            <TableItem bold>Subtotal</TableItem>
          </Table>

           <Table>
            <TableItem bold flex>
              <Product>
                <Img src={img}/>
                <Details>
                  <ProTitle>Title</ProTitle>
                  <ProDesc>Desc</ProDesc>
                  <ProSize>Size:&nbsp;&nbsp;XL</ProSize>
                </Details>
              </Product>
            </TableItem>
            <TableItem bold>&#8377;45000</TableItem>
            <TableItem bold>
              <Counter><div style={{cursor:'pointer'}}>-</div>2<div style={{cursor:'pointer'}}>+</div></Counter></TableItem>
            <TableItem bold>&#8377;46000</TableItem>
          </Table>

        </Left>
        <Right>
          <SubTotal>SubTotal: 46000.60</SubTotal>
          <Delivery>
            DeliveryDeatils:
            <div>
              <div style={{display: 'flex', gap: '6px'}}>
                <TextInput small placeholder='First Name'/>
                <TextInput small placeholder='Last Name'/>
              </div>
              <TextInput small placeholder='Email Address'/>
              <TextInput small placeholder='Phone No. +91 XXXXX XXXXX'/>
              <TextInput 
              small 
              textArea 
              rows={5}
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
          <Button text='Place Order' small/>
        </Right>
      </Wrapper>
    </Section>
  </Container>
  )
}

export default Cart;