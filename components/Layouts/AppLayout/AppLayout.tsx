import React from 'react';

import usePathHook from 'hooks/use-path.hook';

import LeftSideBar from './LeftSideBar';
import TopNavBar from './TopNavBar';

type Props = {
  children: React.ReactNode;
  title: string;
};

const AppLayout = ({ children, title }: Props) => {
  const { path } = usePathHook();

  return (
    <div>
      <div>
        <div className="flex h-screen overflow-hidden bg-white">
          <LeftSideBar />
          <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
            <TopNavBar title={title} />
            <main className="relative">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
