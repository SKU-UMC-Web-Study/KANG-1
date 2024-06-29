// ShoppingCart.js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
  clearCart,
  calculateTotals,
} from "../redux/cartSlice";
import { openModal, closeModal } from "../redux/modalSlice";
import { CartIcon, ChevronUp, ChevronDown } from "../constants/icons";

const Banner = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 40px;
`;
const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const CartItemDetails = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const CartActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const CartSummary = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

const Button1 = styled.div`
  text-align: center;
  margin-right: 200px;
`;

const Bucket = styled.div``;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 5px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-left: 20px;
`;

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const showModal = useSelector((state) => state.modal.showModal);

  const handleAddItem = (item) => {
    dispatch(increaseItemQuantity(item));
    dispatch(calculateTotals());
  };

  const handleRemoveItem = (item) => {
    dispatch(decreaseItemQuantity({ id: item.id }));
    dispatch(calculateTotals());
  };

  const handleClearCart = () => {
    dispatch(openModal());
  };

  const handleConfirmClear = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCancelClear = () => {
    dispatch(closeModal());
  };

  return (
    <Container>
      <Banner>UMC Playlist</Banner>

      <Title>당신이 선택한 음악 </Title>

      <div>
        {items.map((item) => (
          <CartItem key={item.id}>
            <CartItemImage src={item.img} alt={item.title} />
            <CartItemDetails>
              <h3>
                {item.title} | {item.singer}
              </h3>
              <p> 가격 : {item.price}</p>

              <CartActions>
                <button onClick={() => handleAddItem(item)}>
                  <ChevronUp /> {item.amount}
                </button>
                <button onClick={() => handleRemoveItem(item)}>
                  <ChevronDown /> {item.amount}
                </button>
              </CartActions>
            </CartItemDetails>
          </CartItem>
        ))}
        <CartSummary>
          <p>총 가격: {totalPrice}</p>
          <p>총 개수: {totalQuantity}</p>
          <Button1>
            <button onClick={handleClearCart}>장바구니 초기화</button>
          </Button1>
        </CartSummary>
      </div>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <p>장바구니를 모두 비우시겠습니까?</p>
            <ModalActions>
              <button onClick={handleConfirmClear}>네</button>
              <button onClick={handleCancelClear}>아니요</button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ShoppingCart;
