import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import Logo from '../../../images/Logo.png';
import toast, { Toaster } from 'react-hot-toast';
import { useLogin } from '../../../context/AuthContext';
import axios from 'axios';
// import { EditDataUser } from '../../akunSetting';
import Cookies from 'js-cookie'; // 


const Header = () => {
  const { isLoggedIn, checkLoginStatus, login, logout } = useLogin();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(
  ); // untuk menyimpan data pengguna yang dipilih


  useEffect(() => {
    const loggedInUser = checkLoginStatus();
    setUser(loggedInUser);
  }, [checkLoginStatus]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedUser(user);
    console.log(selectedUser)
  }


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [password, setPassword] = useState('');

  const [isValidPassword,setValidPassoword] = useState(true);



  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setValidPassoword(
    newPass !== "" && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPass)
    )
  } 

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    // console.log(selectedUser)
    // const response = await EditDataUser(selectedUser)
    // Proses update nama, email, atau password di sini
    // handleCloseModal();
    // try {
      const csrfToken = Cookies.get('XSRF-TOKEN');

      if (csrfToken) {
          axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
      }
      console.log(selectedUser)
      const updateUser = await toast.promise(
          axios.post(`http://localhost:8000/users/update/${selectedUser.id}`, selectedUser, { withCredentials: true })
          .then(() => {
            // Simpan data pengguna ke localStorage setelah berhasil update
            localStorage.setItem('user', JSON.stringify(selectedUser));
            handleCloseModal()
          })
          ,{
              loading: "Sedang Mengubah Data",
              success: "Data Berhasil Diubah!",
              error: "Terjadi Kesalahan",
          }
      )
  };

  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Materi', href: '#', isDropdown: true },
    { name: 'Pelatihan', href: 'Pelatihan' },
  ];

  const navdrop = [
    { name: 'Full-Stack', href: '/full-stack' },
    { name: 'Front-End', href: '/front-end' },
    { name: 'Back-End', href: '/back-end' },
  ];

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
                <Menu key={item.name} as="div" className="relative inline-block text-left">
                  <MenuButton className="text-sm font-semibold text-gray-100 px-2 py-1 hover:bg-gray-100 rounded hover:text-black">
                    {item.name}
                  </MenuButton>
                  <MenuItems className="absolute mt-2 w-40 origin-top-right text-center rounded-md bg-white shadow-lg">
                    <div className="py-1">
                      {navdrop.map((dropItem) => (
                        <MenuItem key={dropItem.name}>
                          {({ active }) => (
                            <a
                              href={dropItem.href}
                              className={`block px-4 py-2 font-semibold text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                            >
                              {dropItem.name}
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
            <MenuItems className="absolute -right-24 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg">
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
                        <button
                          onClick={handleOpenModal}
                          className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                        >
                          Account settings
                        </button>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form onSubmit={handleUpdateAccount} className="space-y-6">
              <h5 className="text-xl font-medium text-gray-900">Account Settings</h5>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={user?.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={user?.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  disabled
                  defaultValue={user?.role}
                  className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Ganti Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder="Password Baru"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                />
                {!isValidPassword && password!== ""? (
                  <span className='text-red-500 text-[0.9em] absolute'>
                      Minimal 8 Karakter Berupa Huruf, Angka, Dan Simbol
                  </span>
              ) : ""}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                disabled={!isValidPassword}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
