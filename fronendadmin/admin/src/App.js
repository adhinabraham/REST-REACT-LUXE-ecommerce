import logo from './logo.svg';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import './App.css';
import Login from './components/form/Login';
import Userlist from './components/Admincontrol/Userlist';
import Newproduct from './components/product/Newproduct';
import Navbar from './components/adminnavbar/Navbar';
import {CookiesProvider} from 'react-cookie'
import Navigation from './components/verticalNavigation/Navigation';
import Addcategory from './components/category/Addcategory';
import Productlist from './components/product/Productlist';
import Ordermanagement from './order/Ordermanagement';
import Dashbordgraph from './components/Dashbord/Dashbordgraph';
import Coupon from './components/Admincontrol/Coupon';
import Dashboardtwo from './components/Dashbord/Dashboardtwo';
import Sales from './components/Salesreport/Sales';
import Salesreport from './components/Salesreport/Salesreport';
import Productoffer from './components/product/Productoffer';
import Offerproducts from './components/product/Offerproducts';
import Categoryoffer from './components/category/Categoryoffer';
import Offercategory from './components/category/Offercategory';



function App() {
  return (
    <div>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route exact path="/Listuser" element={<Userlist></Userlist>} />
            <Route path="/productadd" element={<Newproduct></Newproduct>} />
            <Route path='/productlist' element={<Productlist></Productlist>} />
             <Route path='/productlist' element={<Productlist></Productlist>}/>
            <Route path="/sales" element={<Salesreport></Salesreport>} />
            <Route path="/productoffer" element={<Productoffer></Productoffer>} />
            <Route path="/order" element={<Ordermanagement></Ordermanagement>} />
            <Route path="/dashboard2" element={<Dashbordgraph></Dashbordgraph>}/>
            <Route path="/dashboard" element={<Dashboardtwo></Dashboardtwo>} />
            <Route path="/coupon" element={<Coupon></Coupon>} />
            <Route path="/offerproducts" element={<Offerproducts></Offerproducts>} />
            <Route path='/productlist' element={<Productlist></Productlist>} />
            <Route path='/addcategory' element={<Addcategory></Addcategory>} />
            <Route path='/categoryoffer' element={<Categoryoffer></Categoryoffer>} />
            <Route path='/offercategory' element={<Offercategory></Offercategory>}/>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
