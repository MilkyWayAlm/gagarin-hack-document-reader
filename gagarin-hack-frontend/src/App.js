import { useState } from 'react';
import './App.css';
import AddDocument from './modules/AddDocument/AddDocument';
import MyDocuments from './modules/MyDocuments/MyDocuments';
import NavBar from './modules/NavBar/NavBar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <div className="App _container">
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navigate to="/" replace/>}/>
          <Route path='/' element={
          <div className="documentsBlock _container2">
            <MyDocuments/>
          </div>}/>
          <Route path='/document/:id' render={() => Document} />
          <Route path='/addDocument' element={
            <div className='addDocumentBlock _container2'><AddDocument uploaded={{uploadedFiles, setUploadedFiles}}/></div>
          }
          />
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
