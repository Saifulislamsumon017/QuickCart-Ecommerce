// src/components/Spinner.jsx
'use client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Spinner = ({ size = 18, className = '' }) => (
  <AiOutlineLoading3Quarters
    className={`animate-spin ${className}`}
    style={{ width: size, height: size }}
    aria-hidden="true"
  />
);

export default Spinner;
