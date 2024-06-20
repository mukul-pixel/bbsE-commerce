import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import { ForgotPassword } from "./Components/ForgotPassword";
import { UserHome } from "./Pages/UserHome";
import { UserAbout } from "./Pages/UserAbout";
import { UserContact } from "./Pages/UserContact";
import { UserProfile } from "./Pages/UserProfile";
import { UserCart } from "./Pages/UserCart";
import { UserLogin } from "./Pages/UserLogin";
import { UserRegister } from "./Pages/UserRegister";
import { UserEdit } from "./Pages/UserEdit";
import { AdminDashBoard } from "./Pages/AdminDashBoard";
import { AdminAddProduct } from "./Pages/AdminAddProduct";
import { PageNotFound } from "./Components/PageNotFound";
import { UserProductInfo } from "./Pages/UserProductInfo";
import { AdminViewProduct } from "./Pages/AdminViewProduct";
import { AdminViewUser } from "./Pages/AdminViewUser";
import { Checkout } from "./Components/Checkout";
import { UserProducts } from "./Pages/UserProducts";
import { AdminEnquiries } from "./Pages/AdminEnquiries";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const role = localStorage.getItem("role");
  const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://bbse-commerce.onrender.com/getProduct");
                if (response.data.status === "ok") {
                    setProducts(response.data.data);
                } else {
                    console.error("Error fetching product data:", response.data.message);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProducts();
    }, []);
  return (
    <Router>
      <Routes>
        {/* {role === 'admin'?
        <> */}
        <><Route path="admin" element={<AdminDashBoard />}></Route>
        <Route path="addProduct" element={<AdminAddProduct />}></Route>
        <Route path="/" element={<UserHome />}></Route>
        <Route path="about" element={<UserAbout />}></Route>
        <Route path="contact" element={<UserContact />}></Route>
        <Route path="profile" element={<UserProfile />}></Route>
        <Route path="cart" element={<UserCart />}></Route>
        <Route path="register" element={<UserRegister />}></Route>
        <Route path="edit" element={<UserEdit />}></Route>
        <Route path="forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/productinfo/:productId" element={<UserProductInfo />} />
        <Route path="login" element={<UserLogin />}></Route>
        <Route path="viewproduct" element={<AdminViewProduct/>}></Route>
        <Route path="viewuser" element={<AdminViewUser/>}></Route>
        <Route path="checkout" element={<Checkout/>}></Route>
        <Route path="products" element={<UserProducts products={products}/>}></Route>
        <Route path="enquiries" element={<AdminEnquiries/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
        </>
        {/* </>:
        <>
        <Route path="/" element={<UserHome />}></Route>
        <Route path="about" element={<UserAbout />}></Route>
        <Route path="contact" element={<UserContact />}></Route>
        <Route path="profile" element={<UserProfile />}></Route>
        <Route path="cart" element={<UserCart />}></Route>
        <Route path="login" element={<UserLogin />}></Route>
        <Route path="register" element={<UserRegister />}></Route>
        <Route path="edit" element={<UserEdit />}></Route>
        <Route path="/productinfo/:productId" element={<UserProductInfo />} />
        <Route path="forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="checkout" element={<Checkout/>}></Route>
        <Route path="products" element={<Products/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
        </>} */}
      </Routes>
    </Router>
  );
}

export default App;
