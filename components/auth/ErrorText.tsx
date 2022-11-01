import classNames from 'classnames';
import React from 'react';

const ErrorText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return <p className={classNames('error__text', className)}>{text}</p>;
};

export default ErrorText;
