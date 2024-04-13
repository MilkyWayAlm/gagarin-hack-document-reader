import React from 'react'

import prev from '../../assets/next.svg'
import './styles/DocumentView.css'
import { Link, useParams } from 'react-router-dom'
import ShowImg from '../../components/ShowImg/ShowImg'
import DocumentFieldsView from '../../components/DocumentFieldsView/DocumentFieldsView'

function DocumentView({documents, setDocuments}) {
    const { id }  = useParams()
    const document = documents.find(doc => doc.id === Number(id)); 

    const deleteDocument = () => {
        setDocuments(documents.filter(doc => doc.id !== Number(id)));
    }

  return (
    <div className='documentView'>
        <div className='documentView__title'>
            <Link to='/'><img src={prev} alt="prev Icon" /></Link>
            <h1 className='documentView__title-text'>Документ</h1>
        </div>
        <div className='documentView__form'>
            <div className='documentView-form__image'>
                <ShowImg photo={document.photo}/>
            </div>
            <div className='disabledView'>
                <DocumentFieldsView document={document} deleteDocument={deleteDocument}/>
            </div>
        </div>
    </div>
  )
}

export default DocumentView