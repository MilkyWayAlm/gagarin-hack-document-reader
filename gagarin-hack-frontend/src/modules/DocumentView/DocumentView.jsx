import React from 'react'

import prev from '../../assets/next.svg'
import './styles/DocumentView.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ShowImg from '../../components/ShowImg/ShowImg'
import DocumentFieldsView from '../../components/DocumentFieldsView/DocumentFieldsView'

function DocumentView({documents, setDocuments}) {
    const { id }  = useParams()
    const document = documents.find(doc => doc.id === Number(id)); 
    const navigate = useNavigate();

    const deleteDocument = () => {
        console.log('DELETE', document.image)    
        setDocuments(documents.filter(doc => doc.id !== Number(id)));
        navigate('/')
    }

  return (
    <div className='documentView'>
        <div className='documentView__title'>
            <Link to='/'><img src={prev} alt="prev Icon" /></Link>
            <h1 className='documentView__title-text'>Документ</h1>
        </div>
        {document 
        
        ? <div className='documentView__form'>
            <div className='documentView-form__image'>
                <ShowImg image={document.image}/>
            </div>
                <DocumentFieldsView document={document} deleteDocument={deleteDocument}/>
            </div>
        : <div className='documentNotFound'>Документ не найден</div>
        }
        
    </div>
  )
}

export default DocumentView