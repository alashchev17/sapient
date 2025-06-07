/** @jsxImportSource @emotion/react */
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const RevealPasswordIcon = ({ size = 18, ...props }: IconProps) => {
  return (
    <svg width={size} height={size / 1.5} viewBox="0 0 16 12" fill="none" {...props}>
      <path
        d="M8 7.72413C8.9665 7.72413 9.75 6.96173 9.75 6.02127C9.75 5.0808 8.9665 4.3184 8 4.3184C7.0335 4.3184 6.25 5.0808 6.25 6.02127C6.25 6.96173 7.0335 7.72413 8 7.72413Z"
        stroke="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 10.9989C13.3397 11.0862 15 6.08676 15 6.08676C15 6.08676 13.4071 1 8 1C2.59295 1 1 6.08676 1 6.08676C1 6.08676 2.66026 10.9115 8 10.9989ZM8 7.72413C8.9665 7.72413 9.75 6.96173 9.75 6.02127C9.75 5.0808 8.9665 4.3184 8 4.3184C7.0335 4.3184 6.25 5.0808 6.25 6.02127C6.25 6.96173 7.0335 7.72413 8 7.72413Z"
        stroke="currentColor"
      />
    </svg>
  );
};
