import React from 'react'

import cl from "./BtnDelete.module.css"

function BtnDelete({children, onClick}) {
  return (
    <button onClick={onClick} className={cl.btnDelete}>{children}</button>
  )
}

export default BtnDelete