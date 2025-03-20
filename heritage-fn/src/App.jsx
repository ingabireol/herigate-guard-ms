import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Auth = React.lazy(() => import('./components/Auth/Authent'));
import Navbar from './components/Navbar';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          {/* <Navbar /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;