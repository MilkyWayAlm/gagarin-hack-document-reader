import React from 'react'

import cl from "./BtnDelete.module.css"

function BtnDelete({children}) {
  return (
    <div className={cl.btnDelete}>{children}</div>
  )
}

export default BtnDelete