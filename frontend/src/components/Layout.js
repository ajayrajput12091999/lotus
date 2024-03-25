import React from 'react'
import { Header } from './Header.js'
import { Footer } from './Footer'

export const Layout = ({children}) => {
  return (
    <>
        <Header/>
            <div className='container'>
            <main style={{minHeight:"85vh"}}>
            {children}    
            </main>
            </div>
            
        <Footer/>
    </>
    
  )
}
