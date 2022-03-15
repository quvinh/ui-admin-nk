import React from 'react'
import { AppContent, AppSideNav, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <>
      <AppHeader />
      <AppContent />
      <AppSideNav />
      <AppFooter />
    </>
  )
}

export default DefaultLayout
