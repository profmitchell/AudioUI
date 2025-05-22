import React from 'react';

export const container = (size: number): React.CSSProperties => ({
  position: 'relative',
  width: `${size}px`,
  height: `${size}px`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'grab',
  userSelect: 'none',
  touchAction: 'none'
});

export const knob = (size: number, angle: number, color: string, isDragging: boolean): React.CSSProperties => ({
  position: 'relative',
  width: `${size * 0.8}px`,
  height: `${size * 0.8}px`,
  borderRadius: '50%',
  backgroundColor: '#333',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: isDragging 
    ? 'inset 0 0 10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 255, 255, 0.2)' 
    : 'inset 0 0 10px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.3)',
  transform: `rotate(${angle}deg)`,
  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
  cursor: isDragging ? 'grabbing' : 'grab'
});

export const indicator = (size: number, color: string): React.CSSProperties => ({
  position: 'absolute',
  top: '10%',
  left: '50%',
  width: '2px',
  height: '30%',
  backgroundColor: color,
  transform: 'translateX(-50%)',
  borderRadius: '1px',
  boxShadow: `0 0 5px ${color}`
});

export const valueDisplay: React.CSSProperties = {
  marginTop: '8px',
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center'
}; 