/** @jsxImportSource @emotion/react */
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const CardIcon = ({ size = 18, ...props }: IconProps) => {
  return (
    <svg width={size} height={size / 1.5} viewBox="0 0 16 12" fill="none" {...props}>
      <path
        d="M1.43445 4.04338H14.478M2.73913 1H13.1737C14.1341 1 14.9128 1.77803 14.9128 2.7385L14.913 9.26161C14.913 10.2221 14.1344 11 13.1739 11L2.7393 10.9999C1.77883 10.9999 1.00021 10.2213 1.00019 9.26081L1 2.73918C0.999973 1.77867 1.77862 1 2.73913 1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
