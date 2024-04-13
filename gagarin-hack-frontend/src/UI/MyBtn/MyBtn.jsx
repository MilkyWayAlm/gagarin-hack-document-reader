import React from 'react'

import cl from './MyBtn.module.css'

function MyBtn({children, onClick}) {
  return (
    <button onClick={onClick} className={cl.myBtn}>{children}</button>
  )
}

export default MyBtn