import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowCart, selectCounter, cartSwitcherVisibility } from '../../store/cartSlice';
import './Header.css';

const Header = (props) => {
  const catries = props.data.nav;
  const cat = catries.map((item, index) => (
    <li key={index}>
      <NavLink to={item.link} className="navlink">
        {item.text}
      </NavLink>
    </li>
  ));

  const visibility = useSelector(selectShowCart);
  const cartCounter = useSelector(selectCounter);
  const dispatch = useDispatch();

  const openCart = (event) => {
    event.preventDefault();
    dispatch(cartSwitcherVisibility());
  };

  return (
    <div className={visibility} id="goods">
      <div className="menu">
        <div className="logo">Shellac Butik</div>
        <nav>
          <ul>{cat}</ul>
        </nav>
        <img src={require('../../img/cart.png')} className="mini-cart" alt="mini-cart-img" width="30" height="30" onClick={openCart}></img>
        <span className="circle">{cartCounter}</span>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
