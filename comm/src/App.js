import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EditProfile from './Pages/EditProfile/editProfile';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About/about';
import Listing from './Pages/Listing';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import PageNotFound from './Pages/PageNotFound';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart/cart';
import Wishlist from './Pages/Wishlist/wishlist';
import { StoreProvider } from './Context/storeContext';
import EditAddress from './Pages/EditAddress/editAddress';
import Login from './Pages/LoginPage/login';
import AccountPage from './Pages/AcoountPage/accountPage';
import CreateAccount from './Pages/CreateAccount/createAccount';
import { AuthProvider } from './Context/authContext';
import AddAddress from './Pages/AddAddress/addAddress';




function Layout() {
  const location = useLocation();

  // Paths where Header & Footer should be hidden
  const noHeaderFooterPaths = ["/page-not-found"];
  const hideHeaderFooter = noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/login" element = {<Login/>}/>
        <Route path="/create-account" element = {<CreateAccount/>}/>
        <Route path="/edit-address/:addressId" element = {<EditAddress/>}/>
        <Route path="*" element={<PageNotFound />} /> {/* Handle unknown routes */}
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <StoreProvider>
        <Layout />
      </StoreProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
