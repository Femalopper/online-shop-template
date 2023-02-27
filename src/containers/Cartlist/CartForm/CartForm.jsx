import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSubmitBtnVisibility,
  selectConsumerData,
  setConsumerData,
} from '../../../store/cartSlice';

const CartForm = (props) => {
  const submitButton = useSelector(selectSubmitBtnVisibility);
  const orderForm = useSelector(selectConsumerData);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
    return re.test(String(email).toLowerCase());
  };

  const phoneNumber = (number) => {
    const re = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
    return re.test(number);
  };

  const checkValidity = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const currentId = event.target.name;
    const validity =
      currentId === 'name'
        ? value.length >= 2
        : currentId === 'tel'
        ? phoneNumber(value)
        : validateEmail(value);
    dispatch(setConsumerData({ validity, currentId }));
  };

  return (
    <>
      <form id="cart-data">
        <div className="make-order">
          <div>
            <input
              type="text"
              onInput={checkValidity}
              className={`make-order-field ${orderForm.name.errorClass}`}
              placeholder="Введите имя"
              name="name"
            ></input>
          </div>
          <div>
            <input
              type="tel"
              onInput={checkValidity}
              className={`make-order-field ${orderForm.tel.errorClass}`}
              placeholder="Введите телефон +7(✗✗✗)✗✗✗-✗✗-✗✗"
              name="tel"
              maxLength="16"
            ></input>
          </div>
          <div>
            <input
              type="text"
              onInput={checkValidity}
              className={`make-order-field ${orderForm.mail.errorClass}`}
              placeholder="Введите e-mail"
              name="mail"
            ></input>
          </div>
          <div>
            <a href="#">
              <input id="payment" className="payment" value="Оплатить" readOnly />
            </a>
          </div>
        </div>
        <div className="form-buttons">
          <button onClick={props.close}>Продолжить покупки</button>
          <button onClick={props.send} id="submit" disabled={submitButton}>
            Сделать заказ
          </button>
        </div>
      </form>
    </>
  );
};

export default CartForm;
