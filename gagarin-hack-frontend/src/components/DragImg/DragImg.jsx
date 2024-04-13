import React, { useState } from 'react'
import './styles/DragImg.css'

import addImage from '../../assets/dragImg.svg'
import deleteImage from '../../assets/deleteImage.svg'

function DragImg({ uploaded }) {
    const [drag, setDrag] = useState(false)
    const {uploadedFiles, setUploadedFiles} = uploaded
    
    if (!uploaded) {
        return <div>Loading...</div>;
    }

    function dragStartHandler(e){
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e){
        e.preventDefault()
        setDrag(false)
    }

    function onDropHandler(e){
        e.preventDefault()
        let file = e.dataTransfer.files[0];

        const reader = new FileReader();
        reader.onloadend = function(){
            setUploadedFiles([reader.result])
        }
        reader.readAsDataURL(file);

        setDrag(false)
    }

    function onDeleteHandler(){
        setUploadedFiles([]);
    }

    function onFileInputChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
            setUploadedFiles([reader.result])
        }
        reader.readAsDataURL(file);
    }

  return (
    <div>
        {drag
            ? <div className='drop-area addFiles'
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => onDropHandler(e)}
            >
                <img src={addImage} alt="addFiles" />
                <div>Отпустите документ</div>
            </div>        
            : uploadedFiles.length > 0 
                ? 
                <div className='uploadedFile'>
                    <div className='uploadedImgContainer'>
                        <img 
                        src={uploadedFiles[0]} 
                        alt='Загруженное изображение' 
                        className='uploadedImg' />
                        <img src={deleteImage} alt='deleteIconImage' className='uploadedFile__delete' onClick={() => onDeleteHandler()} />
                    </div>                    
                </div>
                :           
                <div className='drop-area'
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >
                    <label htmlFor="fileInput">
                        <div className='drop-area'>
                            <img src={addImage} alt='addImg' className='drop-area__add'/>
                            <div>Добавьте фото документа</div>
                        </div>
                    </label>
                    <input 
                    type='file' 
                    accept="image/*" 
                    id="fileInput" 
                    name="file" 
                    onChange={onFileInputChange} 
                    style={{ display: "none" }}/>
                    
                </div>        
        }

    </div>
  )
}

export default DragImg