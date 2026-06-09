import './App.css';
import {Routes, Route} from "react-router-dom";
import RegisterPage from './pages/Register';
import NavbarComponent from './components/Navbar';
import LoginPage from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListingPage from './pages/List';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Detail';
import OrdersPage from './pages/viewOdrder';
import OrderDetailPage from './pages/viewOrderDetail';
import  ProtectedR  from './components/ProtectedRoute';
function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<ProtectedR><HomePage /></ProtectedR>} />
        <Route path="/book/list" element={<ProtectedR><ListingPage /></ProtectedR>} />
        <Route path="/book/:id" element={<ProtectedR><BookDetailPage /></ProtectedR>} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<ProtectedR><OrdersPage /></ProtectedR>} />
        <Route path="/book/orders/:id" element={<ProtectedR><OrderDetailPage /></ProtectedR>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      
      <ToastContainer />
    </div>
    
  );
}

export default App;
