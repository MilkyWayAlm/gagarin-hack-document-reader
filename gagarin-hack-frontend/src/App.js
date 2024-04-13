  import { useState } from 'react';
  import './App.css';
  import AddDocument from './modules/AddDocument/AddDocument';
  import MyDocuments from './modules/MyDocuments/MyDocuments';
  import NavBar from './modules/NavBar/NavBar';
  import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
  import DocumentView from './modules/DocumentView/DocumentView';

  function App() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [documents, setDocuments] = useState([])

    return (
      <div className="App _container">
        <NavBar/>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Navigate to="/" replace/>}/>
            <Route path='/' element={
            <div className="documentsBlock _container2">
              <MyDocuments documents={documents}/>
            </div>}/>
            <Route path='/document/:id' element={
            <div className='documentViewBlock _container2'>
              <DocumentView documents={documents} setDocuments={setDocuments}/>
            </div>
            } />
            <Route path='/addDocument' element={
              <div className='addDocumentBlock _container2'>
                <AddDocument 
                uploaded={{uploadedFiles, setUploadedFiles}} 
                setDocuments={setDocuments} 
                documents={documents}/>
              </div>
            }
            />
          </Routes>      
        </BrowserRouter>
      </div>
    );
  }

  export default App;
