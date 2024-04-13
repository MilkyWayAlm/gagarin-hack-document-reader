import React from 'react'
import cl from './MyBtn.module.css'

function MyBtn({children, onClick}) {
  return (
    <a onClick={onClick} className={cl.myBtn}>{children}</a>
  )
}

export default MyBtn