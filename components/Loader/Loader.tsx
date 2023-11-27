
import React from 'react';

import { cn } from '@/lib/utils';

interface LoaderProps {
  text: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ text, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-3 border-gray-900"></div>
      <p className="mt-4 text-gray-900">{text}</p>
    </div>
  );
};

export default Loader;
