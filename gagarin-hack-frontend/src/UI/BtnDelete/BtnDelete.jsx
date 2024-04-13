import React from 'react'

import cl from "./BtnDelete.module.css"

function BtnDelete({children, onClick}) {
  return (
    <a onClick={onClick} className={cl.btnDelete}>{children}</a>
  )
}

export default BtnDelete