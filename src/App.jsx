import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import PhotoDetail from './pages/PhotoDetail';
import UploadPhoto from './pages/UploadPhoto';
import MyGallery from './pages/MyGallery'; 
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthContext';
import EditPhoto from './pages/EditPhoto';

function App() {
  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
     
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<RequireAuth><UploadPhoto /></RequireAuth>} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/my-gallery" element={<RequireAuth><MyGallery /></RequireAuth>} />
        <Route path="/photo/:travelId" element={<PhotoDetail />} />
        <Route path="/edit/:travelId" element={<RequireAuth><EditPhoto /></RequireAuth>} />


      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;