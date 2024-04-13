import React from 'react'

import cl from "./BtnDelete.module.css"

function BtnDelete({children, onClick}) {
  return (
    <div onClick={onClick} className={cl.btnDelete}>{children}</div>
  )
}

export default BtnDelete