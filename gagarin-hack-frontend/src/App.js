  import { useState } from 'react';
  import './App.css';
  import AddDocument from './modules/AddDocument/AddDocument';
  import MyDocuments from './modules/MyDocuments/MyDocuments';
  import NavBar from './modules/NavBar/NavBar';
  import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
  import DocumentView from './modules/DocumentView/DocumentView';

  function App() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [documents, setDocuments] = useState([
      {id: 1, photo: '', type: "Паспорт РФ", series: '9912', number: '835963', fullName: 'Гулякина Анна Вадимовна', gender: 'ЖЕН', dateBirthday: '', placeOfBirthday: 'Свердловск', numberPage: '4'},
      {id: 2, photo: '', type: "Паспорт транспортного средства", series: '11 11', number: '111 111', gender: '', dateBirthday: '', placeOfBirthday: '', numberPage: '1'},
      {id: 3, photo: '', type: "Свидетельство о регистрации транспортного средства ", series: '11 11', number: '111 111', gender: '', dateBirthday: '', placeOfBirthday: '', numberPage: '1'},
      {id: 4, photo: '', type: "Водительское удостоверение", series: '11 11', number: '111 111', gender: '', dateBirthday: '29.12.1997', placeOfBirthday: 'Свердловск', numberPage: '3'},
    ])

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
            <Route path='/document/:id' element={<DocumentView/>} />
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
