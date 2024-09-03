import React, { useState } from 'react'

const Test = () => {
    
    
    const [position, setPosition] = useState({
        x: 0,
        y: 0
      });
      const cursor="/assets/common/cursor.png"

    return (
    <>
    
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        cursor:"none"
      }}>
      <div style={{
        position: 'fixed',
        backgroundColor: "#000",
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: "5px",
        height: "5px",
      }} />
    </div>
    </>
  )
}

export default Test