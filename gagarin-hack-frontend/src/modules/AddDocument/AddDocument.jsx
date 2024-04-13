// AddDocument.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DragImg from '../../components/DragImg/DragImg';
import MyBtn from '../../UI/MyBtn/MyBtn';
import DocumentFields from '../../components/DocumentFields/DocumentFields';
import prev from '../../assets/next.svg';
import camera from '../../assets/camera.svg';
import './styles/AddDocument.css';
import Service from '../../api/Service'

function AddDocument({ uploaded, setDocuments, documents }) {
  const navigate = useNavigate();
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
  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    setIsDisabled(!uploadedFiles || uploadedFiles.length === 0);
  }, [uploadedFiles]);

  const handleAddDocument = (fields) => {
    const newDocument = {
      id: documents.length + 1,
      image: uploadedFiles.length > 0 ? uploadedFiles[0] : '', // Add image if available
      ...fields
    };
  
    console.log(newDocument);
    setDocuments(prevDocuments => [...prevDocuments, newDocument]);
  
    // Optionally, clear uploaded files or perform other actions
    setUploadedFiles([]);

    navigate('/');
  };

  async function sendDataToServer(image){
    const response = await Service.sendDataToServer(image)
    setServerResponse(response);

    console.log(response)
    console.log("ТИП: ", response[0].type)
    console.log("НОМЕР: ", response[0].number)
    console.log("СЕРИЯ: ", response[0].series)
    console.log("ТОЧНОСТЬ ", response[0].confidence)
    console.log("НОМЕР СТРАНИЦЫ: ", response[0].page_number)
  }

  return (
    <div className='addDocument'>
      <div className='addDocument__title'>
        <Link to='/'><img src={prev} alt="prev Icon" /></Link>
        <h1 className='addDocument__title-text'>Новый документ</h1>
      </div>
      <div className='addDocument__form'>
        <div className='addDocument-form__image'>
          <div className='addDocument-form__btns'>
            <DragImg uploaded={uploaded} />
            <div className='camera'>
              <img src={camera} alt='camera' className='camera-img'/>
              <div className='camera-text'>Сделать фото</div>
            </div>
          </div>
          <div className={isDisabled ? 'disabled' : ''}>
            <MyBtn onClick={() => sendDataToServer(uploadedFiles[0])}>Обработать данные</MyBtn>
          </div>
        </div>
        <div>
        <DocumentFields 
        setDocumentFields={setDocumentFields} 
        documentFields={documentFields} 
        onClick={handleAddDocument}
        serverResponse={serverResponse}/>
        </div>
      </div>
    </div>
  );
}

export default AddDocument;
