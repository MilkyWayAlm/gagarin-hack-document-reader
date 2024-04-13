import React from 'react'
import './styles/DocumentFieldsView.css'
import FieldPtsOrStsView from '../FieldPtsOrStsView/FieldPtsOrStsView'
import BtnDelete from '../../UI/BtnDelete/BtnDelete'

function DocumentFieldsView({document, deleteDocument}) {
  return (
    <div className='document__fields'>
      <div className='typeDocumentView'>
        <p className='typeDocumentView__text'>Тип документа:</p>
        <input type='text' value={document.type} className='typeDocumentView__input' readOnly/>
      </div>
      <div className='mainFieldView'>
        <FieldPtsOrStsView document={document}/>
      </div>
      <div className='btnDelete'>
        <BtnDelete onClick={deleteDocument}>Удалить документ</BtnDelete>
      </div>
    </div>
  )
}

export default DocumentFieldsView