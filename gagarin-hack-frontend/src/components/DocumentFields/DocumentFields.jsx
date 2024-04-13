// DocumentFields.js
import React, { useEffect, useState } from 'react';
import './styles/DocumentFields.css';
import FieldPtsOrSts from '../FieldPtsOrSts/FieldPtsOrSts';
import MyBtn from '../../UI/MyBtn/MyBtn';

function DocumentFields({ setDocumentFields, documentFields, onClick, serverResponse, time}) {
  const [type, setType] = useState('');
  const [customType, setCustomType] = useState('');
  const [series, setSeries] = useState('');
  const [number, setNumber] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [dateBirthday, setDateBirthday] = useState('');
  // const [placeOfBirthday, setPlaceOfBirthday] = useState('');
  // const [gender, setGender] = useState('');
  const [numberPage, setNumberPage] = useState('');
  const [confidence, setConfidence] = useState('');
  const [timeTaken, setTimeTaken] = useState();

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
      // fullName,
      // dateBirthday,
      // placeOfBirthday,
      // gender,
      numberPage
    };
  
    setDocumentFields(newFields);
    onClick(newFields);
  };

  useEffect(() => {
    if(serverResponse){
      let serverType = serverResponse.type || ' ';
      console.log(serverType);
      if (serverType === "personal_passport"){
        setType("Паспорт РФ")
      } else if (serverType === "vehicle_certificate"){
        setType("Свидетельство о регистрации транспортного средства")
      } else if (serverType === "vehicle_passport"){
        setType("Паспорт транспортного средства")
      } else if (serverType === "driver_license"){
        setType("Водительское удостоверение")
      } else {
        setType("Другое");
        setCustomType(serverType);
      }

      setNumber(serverResponse.number || ' ')
      setSeries(serverResponse.series || ' ')
      setConfidence(serverResponse.confidence || ' ')
      setNumberPage(serverResponse.page_number || ' ')
    }
  }, [serverResponse])

  useEffect(() => {
    setTimeTaken(time)
  }, [time])

  return (
    <div className='document__fields'>
      {confidence !== '' && (
        <div className='document__characteristics'>
          <p className='document__confidence'>точность: {confidence}</p>
          <p className='document__confidence'>время запроса: {timeTaken} мс</p>
        </div>
      )}
      <div className='typeDocument'>
        <div className='typeDocument__top'>
          <p className='typeDocument__text'>Тип документа:</p>          
        </div>
        <select className='typeDocument__select' value={type} onChange={handleTypeChange}>
          <option disabled value="">Выберите тип документа</option>
          <option value="СТС">Свидетельство о регистрации транспортного средства</option>
          <option value="Паспорт транспортного средства">Паспорт транспортного средства</option>
          <option value="Паспорт РФ">Паспорт РФ</option>
          <option value="Водительское удостоверение">Водительское удостоверение</option>
          <option value="Другое">Другое</option>
        </select>
        {type === "Другое" && (
          <input value={customType} type="text" placeholder="Введите ваш документ" className='typeDocument__input' onChange={handleCustomTypeChange} />
        )}
      </div>
      <div className='mainField'>
        <FieldPtsOrSts 
        fields={{
          number,
          series,
          numberPage,
        }}
        setFields={{
          setSeries,
          setNumber,
          setNumberPage,
        }}
        serverResponse={serverResponse}
        />
      </div>
      <div className='btnAdd'>
        <MyBtn onClick={handleAddDocument}>Добавить в "Мои документы"</MyBtn>
      </div>
    </div>
  );
}

export default DocumentFields;
