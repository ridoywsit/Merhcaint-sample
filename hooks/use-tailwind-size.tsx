import React from 'react';
import { useWindowSize } from 'react-use';

const useTailWindSize = () => {
  const { width } = useWindowSize();

  if (width >= 1536) {
    return '2xl';
  } else if (width >= 1280) {
    return 'xl';
  } else if (width >= 1024) {
    return 'lg';
  } else if (width >= 768) {
    return 'md';
  } else {
    return 'sm';
  }
};

export default useTailWindSize;
