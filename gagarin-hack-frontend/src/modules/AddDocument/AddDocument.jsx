import React from 'react'

import prev from '../../assets/next.svg'
import './styles/AddDocument.css'
import { Link } from 'react-router-dom'
import '../../App.css'
import DragImg from '../../components/DragImg/DragImg'
import MyBtn from '../../UI/MyBtn/MyBtn'
import DocumentFields from '../../components/DocumentFields/DocumentFields'

function AddDocument({uploaded}) {
  return (
    <div className='addDocument'>
        <div className='addDocument__title'>
            <Link to='/'><img src={prev} alt="prev Icon" /></Link>
            <h1 className='addDocument__title-text'>Новый документ</h1>
        </div>
        <div className='addDocument__form'>
            <div className='addDocument-form__image'>
                <DragImg uploaded={uploaded}/>
                <MyBtn>Обработать данные</MyBtn>
            </div>
            <DocumentFields/>
        </div>
    </div>
  )
}

export default AddDocument