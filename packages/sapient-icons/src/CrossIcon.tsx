/** @jsxImportSource @emotion/react */
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const CrossIcon = ({ size, ...props }: IconProps) => {
  return (
    <svg width={size ?? 7} height={size ?? 6} viewBox="0 0 7 6" fill="none" {...props}>
      <path d="M6 0.5L1 5.5M6 5.5L1 0.499999" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
};
