import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { editData } from "../../actions/adminAction";
import { deleteData } from "../../actions/adminAction";
import Cookies from 'js-cookie'; // Import js-cookie jika Anda menggunakannya untuk CSRF token


const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // state untuk mengatur status modal
  const [selectedUser, setSelectedUser] = useState(null); // untuk menyimpan data pengguna yang dipilih


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/admin/users") // URL API Laravel
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching users:", error);
      });
  }, []);


  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };


  const handleDelete = async (id) => {
    try {
      const response = await deleteData(id);
      if (response) {
        console.log("User berhasil dihapus.");
      } else {
        console.log("Gagal menghapus user.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedUser);
    const response = await editData(selectedUser)   
    console.log(response);
  };
  return (
    <div className="relative overflow-x-auto">
        <Toaster/>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">
        Daftar User
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Nama</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-12 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4 align-center">
                <Link
                  onClick={() => handleOpenModal(user)}
                  className="text-blue-600 hover:underline mx-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal untuk edit */}
      {isModalOpen && selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()} // agar klik di dalam modal tidak menutup modal
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit User
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} method="put" className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                    required
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;
