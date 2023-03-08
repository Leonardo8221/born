import { FC } from 'react';

const AvatarPlaceholder: FC = (): JSX.Element => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_134_2210)">
      <rect
        x="1"
        y="1"
        width="40"
        height="40"
        rx="20"
        fill="url(#paint0_linear_134_2210)"
      />
      <path
        d="M13 18C13 13.5817 16.5817 10 21 10C25.4183 10 29 13.5817 29 18C29 22.4183 25.4183 26 21 26C16.5817 26 13 22.4183 13 18Z"
        fill="url(#paint1_linear_134_2210)"
      />
      <path
        d="M1 48C1 36.9543 9.95431 28 21 28C32.0457 28 41 36.9543 41 48C41 59.0457 32.0457 68 21 68C9.95431 68 1 59.0457 1 48Z"
        fill="url(#paint2_linear_134_2210)"
      />
    </g>
    <rect x="1" y="1" width="40" height="40" rx="20" stroke="#333333" />
    <defs>
      <linearGradient
        id="paint0_linear_134_2210"
        x1="19.9983"
        y1="-17.5381"
        x2="-47.3333"
        y2="41"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#DBDBDB" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_134_2210"
        x1="16"
        y1="15.5"
        x2="61"
        y2="68"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBDBDB" />
        <stop offset="1" stopColor="white" stopOpacity="0.01" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_134_2210"
        x1="16"
        y1="15.5"
        x2="61"
        y2="68"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBDBDB" />
        <stop offset="1" stopColor="white" stopOpacity="0.01" />
      </linearGradient>
      <clipPath id="clip0_134_2210">
        <rect x="1" y="1" width="40" height="40" rx="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default AvatarPlaceholder;
