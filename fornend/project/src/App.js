
import {BrowserRouter,Route, Routes} from 'react-router-dom'

import './App.css';
import Header from './components/Header /Header ';
import Footer from './components/Footer/Footer';
import Siginup from './components/forms/Siginup';
import Login from './components/forms/Login';
import Home from './components/body/Home';
import Showproduct from './components/products/Showproduct';
import Mobileverification from './components/forms/Mobileverification';
import {CookiesProvider} from 'react-cookie'
import Cart from './components/cart/Cart';
import ShippingAddress from './components/order/ShippingAddress';
import Orderplacement from './components/order/Orderplacement';
import Userform from './components/forms/Userform';
import Orderupdate from './components/order/Orderupdate';
import OrderDetails from './components/order/OrderDetails';



function App() {
  return (
    <div>
      <CookiesProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/siginup" element={<Siginup />} />
            <Route path="/otp" element={<Mobileverification />} />
            <Route path="/showproduct/:id" element={<Showproduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ShippingAddress />} />
            <Route path="/order" element={<Orderplacement />} />
            <Route path="/user" element={<Userform />} />
            <Route path="/orderdetails" element={<Orderupdate />} />
            <Route path="/userorder" element={<OrderDetails />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
