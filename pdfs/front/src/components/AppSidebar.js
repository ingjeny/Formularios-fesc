import React from 'react'
import { useSelector } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { sygnet } from '../assets/brand/sygnet'
import { AppSidebarNav } from './sidebar/AppSidebarNav'


import items from '../utils/sidebarnav'


const AppSidebar = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" height={35}></CIcon>
        <img 
          src='https://www.fesc.edu.co/portal/images/simbolos/logotipo.png' height={"80px"} 
          style={{marginTop: "10px", marginBottom: "10px", marginLeft: "-10%"}}>
        </img>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
          <AppSidebarNav items={items} />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
