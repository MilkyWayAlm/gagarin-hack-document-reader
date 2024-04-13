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

  const handleAddDocument = () => {
    const newDocument = {
      id: documents.length + 1,
      photo: '', // Add photo if available
      type: documentFields.type,
      series: documentFields.series,
      number: documentFields.number,
      fullName: documentFields.fullName,
      dateBirthday: documentFields.dateBirthday,
      placeOfBirthday: documentFields.placeOfBirthday,
      gender: documentFields.gender,
      numberPage: documentFields.numberPage
    };
  
    console.log(documents)
    setDocuments(prevDocuments => [...prevDocuments, newDocument]);
    console.log(documents)
  
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
        <DocumentFields setDocumentFields={setDocumentFields} onClick={handleAddDocument} />
      </div>
    </div>
  );
}

export default AddDocument;
