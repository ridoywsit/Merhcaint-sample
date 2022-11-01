import Link from 'next/link';
import React from 'react';

import usePathHook from 'hooks/use-path.hook';
import Document from 'public/svg/document.svg';
import LogoDarkBase from 'public/svg/logoDarkBase.svg';
import Network from 'public/svg/network.svg';
import Settings from 'public/svg/settings.svg';
import { ROUTES } from 'utils/routes';

const LeftSideBar = () => {
  const { path } = usePathHook();
  return (
    <aside
      id="sidebar"
      className="flex overflow-y-auto bg-slate-800 w-[256px]"
      aria-label="Sidebar"
    >
      <div className="w-full">
        <div className="flex items-center justify-center h-[108px] w-full">
          <Link passHref href={ROUTES.APP.HOME}>
            <a className="">
              {/* <VisuallyHidden>Merchaint Logo</VisuallyHidden> */}
              <LogoDarkBase className="mr-[1px]" />
            </a>
          </Link>
        </div>
        <div className="flex-1">
          <ul className="menu-container">
            <li>
              <Link passHref href={ROUTES.APP.DOCUMENTS}>
                <a
                  className={`${
                    path === ROUTES.APP.DOCUMENTS ? 'active' : null
                  }`}
                >
                  <Document className="w-4 h-4 lm-svg" />
                  <span>Documents</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
