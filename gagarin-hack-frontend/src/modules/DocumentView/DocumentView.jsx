import React from 'react'

import prev from '../../assets/next.svg'
import './styles/DocumentView.css'
import { Link } from 'react-router-dom'
import DocumentFields from '../../components/DocumentFields/DocumentFields'
import ShowImg from '../../components/ShowImg/ShowImg'

function DocumentView({item}) {
  return (
    <div className='documentView'>
        <div className='documentView__title'>
            <Link to='/'><img src={prev} alt="prev Icon" /></Link>
            <h1 className='documentView__title-text'>Документ</h1>
        </div>
        <div className='documentView__form'>
            <div className='documentView-form__image'>
                <ShowImg/>
            </div>
            <div className='disabledView'>
                <DocumentFields/>
            </div>
        </div>
    </div>
  )
}

export default DocumentView