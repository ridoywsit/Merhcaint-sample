import React from 'react';

import { useHasMounted } from 'hooks/use-has-mounted';

type Props = {
  children: React.ReactNode;
};

const ClientOnly = ({ children }: Props) => {
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
