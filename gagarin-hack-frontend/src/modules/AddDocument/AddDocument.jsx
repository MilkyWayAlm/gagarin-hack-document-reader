// AddDocument.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DragImg from '../../components/DragImg/DragImg';
import MyBtn from '../../UI/MyBtn/MyBtn';
import DocumentFields from '../../components/DocumentFields/DocumentFields';
import prev from '../../assets/next.svg';
import './styles/AddDocument.css';

function AddDocument({ uploaded, setDocuments, documents }) {
  const { uploadedFiles, setUploadedFiles } = uploaded;
  const [isDisabled, setIsDisabled] = useState(true);
  const [documentFields, setDocumentFields] = useState({
    type: '',
    series: '',
    number: '',
    fullName: '',
    dateBirthday: '',
    placeOfBirthday: '',
    gender: '',
    numberPage: ''
  });

  useEffect(() => {
    setIsDisabled(!uploadedFiles || uploadedFiles.length === 0);
  }, [uploadedFiles]);

  const handleAddDocument = (fields) => {
    const newDocument = {
      id: documents.length + 1,
      photo: uploadedFiles.length > 0 ? URL.createObjectURL(uploadedFiles[0]) : '', // Add photo if available
      ...fields
    };
  
    console.log(newDocument);
    setDocuments(prevDocuments => [...prevDocuments, newDocument]);
  
    // Optionally, clear uploaded files or perform other actions
    setUploadedFiles([]);
  };

  return (
    <div className='addDocument'>
      <div className='addDocument__title'>
        <Link to='/'><img src={prev} alt="prev Icon" /></Link>
        <h1 className='addDocument__title-text'>Новый документ</h1>
      </div>
      <div className='addDocument__form'>
        <div className='addDocument-form__image'>
          <DragImg uploaded={uploaded} />
          <div className={isDisabled ? 'disabled' : ''}>
            <MyBtn>Обработать данные</MyBtn>
          </div>
        </div>
        <DocumentFields setDocumentFields={setDocumentFields} documentFields={documentFields} onClick={handleAddDocument} />
      </div>
    </div>
  );
}

export default AddDocument;
