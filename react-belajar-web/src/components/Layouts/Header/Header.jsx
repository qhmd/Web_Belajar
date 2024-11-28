import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import Logo from '../../../images/Logo.png';
import toast, { Toaster } from 'react-hot-toast';
import { useLogin } from '../../../context/AuthContext';

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Materi', href: '#', isDropdown: true },  // Tambahkan isDropdown di sini
  { name: 'Pelatihan', href: 'Pelatihan'}
];

const navdrop = [
  { name: 'Full-Stack', href: '/full-stack' },
  { name: 'Front-End', href: '/front-end' },
  { name: 'Back-End', href: '/back-end' },
]

const Header = () => {
  const { isLoggedIn, checkLoginStatus, login, logout } = useLogin(); // Ambil context  
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Mengambil status login user saat komponen dimuat
    const loggedInUser = checkLoginStatus();
    setUser(loggedInUser);
  }, [checkLoginStatus]);

  console.log(user);

  return (
    <div className="z-9999">
      <Toaster />
      <header className="relative bg-blue-800 inset-x-0 top-0 z-50 border">
        <nav className="flex items-center justify-around p-6 lg:px-8">
          <div className="relative overflow-hidden hover:text-black">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="flex gap-x-12">
            {navigation.map((item) =>
              item.isDropdown ? (
                <Menu as="div" key={item.name} className="relative inline-block text-left active:text-black active:bg-gray-100">
                  <MenuButton className="text-sm font-semibold text-gray-100 px-2 py-1 hover:bg-gray-100 rounded hover:text-black active:text-black active:bg-gray-100 ">
                    {item.name}
                  </MenuButton>
                  <MenuItems className="absolute mt-2 w-40 origin-top-right -mx-12 text-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {navdrop.map((item) => (
                        <MenuItem>
                        {({active}) => (
                        <a
                          href={item.href}
                          className={`block px-4 py-2 font-semibold text-sm hover:bg-gray-100 rounded hover:text-black`}
                        >
                          {item.name}
                        </a>
                        )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold text-gray-100 px-2 py-1 hover:bg-gray-100 rounded hover:text-black"
                >
                  {item.name}
                </a>
              )
            )}
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex justify-center items-center">
              <UserCircleIcon className="h-9 w-9 text-gray-100" />
            </MenuButton>
            <MenuItems
              className="absolute -right-24 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <div className="px-4 py-2 text-gray-700">
                  {isLoggedIn ? `Welcome ${user?.name || 'Guest'}` : 'Silahkan Login Terlebih Dahulu'}
                </div>
                {isLoggedIn ? (
                  <>
                    {user?.role === 'admin' && (
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="/admin/dashboard"
                            className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                          >
                            Dashboard
                          </a>
                        )}
                      </MenuItem>
                    )}
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                        >
                          Account settings
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                        >
                          Log out
                        </button>
                      )}
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={login}
                        className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        Log in
                      </button>
                    )}
                  </MenuItem>
                )}
              </div>
            </MenuItems>
          </Menu>
        </nav>
      </header>
    </div>
  );
};

export default Header;
