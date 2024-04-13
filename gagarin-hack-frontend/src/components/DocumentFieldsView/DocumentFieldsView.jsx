import React from 'react'
import MyBtn from '../../UI/MyBtn/MyBtn'
import FieldDriveLicenseView from '../FieldDriveLicenseView/FieldDriveLicenseView'
import FieldPassportView from '../FieldPassportView/FieldPassportView'
import './styles/DocumentFieldsView.css'
import FieldPtsOrStsView from '../FieldPtsOrStsView/FieldPtsOrStsView'

function DocumentFieldsView({document}) {
  return (
    <div className='document__fields'>
      <div className='typeDocument'>
        <p className='typeDocument__text'>Тип документа:</p>
        <input type='text' value={document.type} className='typeDocument__input'/>
      </div>
      <div className='mainField'>
        {document.type === 'Паспорт РФ' 
        ? 
        <FieldPassportView document={document}/> 
        : document.type === 'Водительское удостоверение' || document.type === 'В/У'
        ? <FieldDriveLicenseView document={document}/> 
        : <FieldPtsOrStsView document={document}/>}
      </div>
      <div className='btnAdd'>
        <MyBtn>Удалить документ</MyBtn>
      </div>
    </div>
  )
}

export default DocumentFieldsView