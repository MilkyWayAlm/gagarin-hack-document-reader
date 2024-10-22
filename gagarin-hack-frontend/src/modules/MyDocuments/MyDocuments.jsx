    import React, { useEffect, useState } from 'react'

    import "./styles/MyDocuments.css"
    import information from "../../assets/information.svg"
    import DocumentsAdd from '../../components/DocumentsAdd/DocumentsAdd'
    import DocumentItem from '../../components/DocumentItem/DocumentItem'
    import { Link } from 'react-router-dom'

    function MyDocuments({documents}) {
        
        const [myDocuments, setMyDocuments] = useState([]);

        useEffect(() => {
            setMyDocuments(documents);
        }, [documents]);
    return (
        <div className='myDocuments'>
            <h1 className='myDocuments__title'>Мои документы</h1>
            <div className='myDocuments__info'>
                <div className='myDocuments-info__documents'>
                    <Link to='/addDocument'>
                        <DocumentsAdd/>
                    </Link>
                    <div className='documents'>
                        {
                            myDocuments && myDocuments.map((item, index) => (
                                <DocumentItem key={index} info={item}/>
                            ))
                        }
                    </div>
                </div>
                <div className='myDocuments-info__description'>
                    <div className='myDocuments-description__title'>
                        <img src={information} alt="information"/>
                        Классификатор фото-сканов
                    </div>
                    <div className='myDocuments-description__subtitle'>
                    Инструмент, созданный для облегчения процесса оформления страховых продуктов.
                    </div>
                    <div className='myDocuments-description__subtitle'>
                    Для добавления нового документа просто загрузите его фотографию, классификатор автоматически определит тип документа и основные поля.
                    </div>
                </div>
            </div>
        </div>
    )
    }

    export default MyDocuments