import React from 'react'
import cl from './MyBtn.module.css'

function MyBtn({children}) {
  return (
    <a className={cl.myBtn}>{children}</a>
  )
}

export default MyBtn