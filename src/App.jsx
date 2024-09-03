import { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from './page/home/Home';
import About from './page/about/About'
import Contact from './page/contact/Contact'
import Category from './page/category/Category';
import Product from './page/product/Product';
import Error_page from './page/Error_page';

import Dashboard from './page/dashboard/Dashboard';
import Success from './page/success/Success';
import Test from './page/Test';
import AllCategory from './page/allcategory/AllCategory';
import MyOrders from './page/dashboard/MyOrders';
import Cart from './page/cart/Cart';
import Settings from './page/dashboard/Settings';
import SignUp from './page/signup/SignUp';
import Account from './page/account/Account';

import SuperAccount from './page/superAdmin/SuperAccount';
import Super_Dashboard from './page/superAdmin/page/Super_Dashboard';
import SuperAdmin_Users from './page/superAdmin/page/SuperAdmin_Users';
import HomeTemplate from './HomeTemplate';
import SuperTemplate from './SuperTemplate';
import SuperAdmin_Website from './page/superAdmin/page/SuperAdmin_Website';
import SuperAdmin_Settings from './page/superAdmin/page/SuperAdmin_Settings';
import SuperAdmin_Orders from './page/superAdmin/page/SuperAdmin_Orders';
import SuperAdmin_Products from './page/superAdmin/page/SuperAdmin_Products';
import SuperAdmin_Cat from './page/superAdmin/page/SuperAdmin_Cat';
import SuperAdmin_EditProduct from './page/superAdmin/page/SuperAdmin_EditProduct';
import SuperAdmin_AddProduct from './page/superAdmin/page/SuperAdmin_AddProduct';
import SuperAdmin_AddCat from './page/superAdmin/page/SuperAdmin_AddCat';
import SuperAdmin_EditCat from './page/superAdmin/page/SuperAdmin_EditCat';
import SuperAdmin_EditUser from './page/superAdmin/page/SuperAdmin_EditUser';
import SuperAdmin_AddSection from './page/superAdmin/page/SuperAdmin_AddSection';
import Payment from './page/payment/Payment';
import Address from './page/address/Address';
import SuperAdmin_EditSlider from './page/superAdmin/page/SuperAdmin_EditSlider';
import SuperAdmin_AddSlider from './page/superAdmin/page/SuperAdmin_AddSlider';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomeTemplate />} >
            <Route index element={<Home />} />
            <Route path="/support" element={<Contact />} />
            <Route path="/about" element={<About />} />

            <Route path="/login" element={<Account />} />
            <Route path="/create-account" element={<SignUp />} />

            <Route path="/categories" element={<AllCategory />} />
            <Route path="/category/:catName/:cat_id" element={<Category />} />
            <Route path="/:cat_name/:product_name/:pro_id" element={<Product />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order_success" element={<Success />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Error_page />} />

          </Route>

          {/* ============ Super Admin ===== */}
          <Route path="/superAdmin" element={<SuperTemplate />} >
            <Route index element={<SuperAccount />} />
            <Route path="login" element={<SuperAccount />} />

            <Route path="dashboard" element={<Super_Dashboard />} />
            <Route path="users" element={<SuperAdmin_Users />} />
            <Route path="category" element={<SuperAdmin_Cat />} />
            <Route path="product" element={<SuperAdmin_Products />} />
            <Route path="addCat" element={<SuperAdmin_AddCat />} />
            <Route path="editCat" element={<SuperAdmin_EditCat />} />
            <Route path="addProduct" element={<SuperAdmin_AddProduct />} />
            <Route path="editProduct" element={<SuperAdmin_EditProduct />} />

            <Route path="addSlider" element={<SuperAdmin_AddSlider />} />
            <Route path="editSlider" element={<SuperAdmin_EditSlider />} />

            <Route path="editUser" element={<SuperAdmin_EditUser />} />


            <Route path="orders" element={<SuperAdmin_Orders />} />
            <Route path="settings" element={<SuperAdmin_Settings />} />

            <Route path="webiste-management" element={<SuperAdmin_Website />} />
            <Route path="addSection" element={<SuperAdmin_AddSection />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )

}

export default App
