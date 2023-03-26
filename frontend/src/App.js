import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Authlayout from './components/layout/Authlayout';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Authlayout />}>
          <Route element={<Auth />} path="/auth" />
        </Route>
        <Route element={<Layout />}>
          <Route path="/not-found" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
