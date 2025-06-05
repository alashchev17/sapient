import React, { CSSProperties } from 'react';

export interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 16, 
  color = 'currentColor' 
}) => {
  const spinnerStyles: CSSProperties = {
    display: 'inline-block',
    width: `${size}px`,
    height: `${size}px`,
    border: `2px solid transparent`,
    borderTop: `2px solid ${color}`,
    borderRadius: '50%',
    animation: 'sapient-loading-spin 1s linear infinite',
  };

  const keyframesStyles = `
    @keyframes sapient-loading-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframesStyles}</style>
      <span style={spinnerStyles} aria-label="Loading" />
    </>
  );
};
