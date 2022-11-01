import React from 'react';

type SpacerProps = {
  size: number;
  axis: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
};

const Spacer = ({ size, axis, style = {}, ...delegated }: SpacerProps) => {
  const width = axis === 'vertical' ? 1 : size;
  const height = axis === 'horizontal' ? 1 : size;
  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
      {...delegated}
    />
  );
};
export default Spacer;
