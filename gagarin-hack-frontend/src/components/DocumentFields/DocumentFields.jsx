// DocumentFields.js
import React, { useState } from 'react';
import './styles/DocumentFields.css';
import FieldPtsOrSts from '../FieldPtsOrSts/FieldPtsOrSts';
import MyBtn from '../../UI/MyBtn/MyBtn';

function DocumentFields({ setDocumentFields, documentFields, onClick }) {
  const [type, setType] = useState('');
  const [customType, setCustomType] = useState('');
  const [series, setSeries] = useState('');
  const [number, setNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateBirthday, setDateBirthday] = useState('');
  const [placeOfBirthday, setPlaceOfBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [numberPage, setNumberPage] = useState('');
  // const [confidence, setConfidence] = useState('');

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    if (selectedType !== "Другое") {
      setCustomType('');
    }
  };

  const handleCustomTypeChange = (e) => {
    setCustomType(e.target.value);
  };

  const handleAddDocument = () => {
    const newFields = {
      type: type === "Другое" ? customType : type,
      series,
      number,
      fullName,
      dateBirthday,
      placeOfBirthday,
      gender,
      numberPage
    };
  
    setDocumentFields(newFields);
    onClick(newFields); // передаем newFields вместо documentFields
  };

  return (
    <div className='document__fields'>
      <div className='typeDocument'>
        <div className='typeDocument__top'>
          <p className='typeDocument__text'>Тип документа:</p>
          {/* {confidence !== '' && (
            <p className='document__confidence'>точность: {confidence}</p>
          )} */}
          
        </div>
        <select className='typeDocument__select' value={type} onChange={handleTypeChange}>
          <option disabled value="">Выберите тип документа</option>
          <option value="СТС">Свидетельство о регистрации транспортного средства</option>
          <option value="ПТС">Паспорт транспортного средства</option>
          <option value="Паспорт РФ">Паспорт РФ</option>
          <option value="В/У">Водительское удостоверение</option>
          <option value="Другое">Другое</option>
        </select>
        {type === "Другое" && (
          <input type="text" placeholder="Введите ваш документ" className='typeDocument__input' onChange={handleCustomTypeChange} />
        )}
      </div>
      <div className='mainField'>
        <FieldPtsOrSts 
        setSeries={setSeries} 
        setNumber={setNumber} 
        setFullName={setFullName} 
        setGender={setGender}
        setDateBirthday={setDateBirthday} 
        setPlaceOfBirthday={setPlaceOfBirthday} 
        setNumberPage={setNumberPage} />
      </div>
      <div className='btnAdd'>
        <MyBtn onClick={handleAddDocument}>Добавить в "Мои документы"</MyBtn>
      </div>
    </div>
  );
}

export default DocumentFields;