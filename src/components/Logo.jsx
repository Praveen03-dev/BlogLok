import React from 'react'
import logoImage from '../assets/logo.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img 
        src={logoImage} 
        alt="Your Logo"
        style={{ width }}
        className="object-contain h-auto" // this ensures image maintains its aspect ratio
      />
    </div>
  )
}

export default Logo