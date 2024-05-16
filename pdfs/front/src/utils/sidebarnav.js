import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilDrop,
  cilPuzzle,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const sidebarnav = [
  {
    component: CNavTitle,
    name: 'Navegación',
  },
  {
    component: CNavItem,
    name: 'Creación de PRAE',
    to: '/create',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Ver documentos creados',
    to: '/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default sidebarnav
