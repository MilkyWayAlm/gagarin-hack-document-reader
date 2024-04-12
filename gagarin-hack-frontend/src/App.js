import './App.css';
import MyDocuments from './modules/MyDocuments/MyDocuments';
import NavBar from './modules/NavBar/NavBar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

function App() {
  
  return (
    <div className="App _container">
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navigate to="/" replace/>}/>
          <Route path='/' element={
          <div className="documentsBlock">
            <MyDocuments/>
          </div>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
