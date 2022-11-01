import {
  Menu,
  MenuButton,
  MenuItem,
  MenuLink,
  MenuList,
} from '@reach/menu-button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { FiBell, FiRotateCw } from 'react-icons/fi';

import Button from 'components/Button';
import { isAxiosError } from 'lib/error';
import { sessionLogout } from 'services/authService';
import { ROUTES } from 'utils/routes';

const TopNavBar = ({ title }: { title: string }) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(() => sessionLogout(), {
    onSuccess: () => {
      router.push(ROUTES.SIGN_IN);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.code === '401') {
          toast.error('Session expired. Please login again.', {
            id: 'session-expired',
          });
          router.push(ROUTES.SIGN_IN);
        }
      }
    },
  });
  const handleLogOut = () => {
    toast.success('Logged out');
    router.push(ROUTES.SIGN_IN);
  };

  const goBack = () => {
    history.back();
  };
  return (
    <nav className="sticky top-0 z-30 bg-white border-b">
      <div>
        <div className="flex items-center h-[107px] ">
          <div className="flex items-center justify-between flex-1 px-12">
            <div className="flex flex-col gap-2">
              {/* <button
                type="button"
                className="flex items-center gap-3 text-merchaint-text-medium-grey"
                onClick={goBack}
              >
                <Back className="fill-current" />
                <p className="font-medium ">Back</p>
              </button> */}

              <div>
                <h1 className="text-3xl font-bold text-slate-700">{title}</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* <button
                type="button"
                className=" bg-merchaint-grey-200  hover:bg-merchaint-grey-base rounded-full relative p-2.5"
              >
                <FiBell className="w-5 h-5 text-slate-500" />

                <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-merchaint-red-base">
                  &nbsp;
                </span>
              </button> */}
              <Menu>
                <MenuButton
                  type="button"
                  className="bg-merchaint-grey-200 hover:bg-merchaint-grey-base rounded-full relative p-1.5"
                >
                  <div className=" flex items-center justify-center w-7 h-7">
                    <FiBell className="w-5 h-5 text-slate-500" />
                  </div>
                </MenuButton>
                <MenuList className="relative bg-white rounded-lg  w-[392px] drop-shadow-btn-menu border z-30 space-y-3">
                  <div className="px-5 pt-4 flex items-center justify-between text-cyan-500 font-semibold">
                    <h1 className=" text-slate-800 font-bold">Notification</h1>
                    <Button
                      onClick={() => queryClient.invalidateQueries()}
                      size="lg"
                      type="button"
                      variant="clear"
                      className="gap-2"
                    >
                      <FiRotateCw /> <span>Refresh</span>
                    </Button>
                  </div>

                  <Link href={ROUTES.APP.NOTIFICATION} passHref>
                    <MenuLink className="block w-full text-center border-t border-slate-300 p-4 mt-6 text-cyan-600 font-semibold hover:cursor-pointer">
                      <span>See All Notifications</span>
                    </MenuLink>
                  </Link>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  type="button"
                  className=" bg-merchaint-grey-200 hover:bg-merchaint-grey-base rounded-full relative p-1.5"
                >
                  <div className="relative bg-center bg-cover w-7 h-7">
                    <div className="grid bg-purple-500 w-7 h-7 rounded-2xl place-content-center">
                      <span className="text-xs text-white">MA</span>
                    </div>
                  </div>
                </MenuButton>
                <MenuList className="relative py-3 bg-white rounded-lg  min-w-[184px] drop-shadow-btn-menu border z-30">
                  <Link href={ROUTES.APP.PROFILE.HOME} passHref>
                    <MenuLink className="block w-full px-4 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer">
                      <span>Profile</span>
                    </MenuLink>
                  </Link>
                  <Link href={ROUTES.APP.SETTINGS.HOME} passHref>
                    <MenuLink className="block w-full px-4 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer">
                      <span>Settings</span>
                    </MenuLink>
                  </Link>
                  <MenuItem
                    className="px-4 py-2 text-body-regular text-merchaint-text-black-800 hover:cursor-pointer"
                    onSelect={handleLogOut}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
