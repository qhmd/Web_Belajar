import axios from "axios";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'; // Import js-cookie jika Anda menggunakannya untuk CSRF token


export const submitForm = async (formData, setLoading) => {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }
        await toast.promise(
            axios.post("http://localhost:8000/register", formData, { withCredentials: true }),
            {
                loading: 'Saving...',
                success: "Berhasil Membuat Akun, Silahkan Login!",
                error: "Gagal Membuat Akun!",
            }
        );
    } catch (error){
        if (error.response) {
            // Cek apakah ada errors di data
            const errorMessage = error.response.data.errors 
                ? Object.values(error.response.data.errors).flat().join(", ")
                : error.response.data.message;
            toast.error(errorMessage);
        } else {
            toast.error("Terjadi Kesalahan Jaringan");
        }
    } finally {
        setLoading(false);
    }
}

export const submitLogin = async (loginData, setLoading)  => {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }

        const response = await toast.promise(
            axios.post("http://localhost:8000/login", loginData, { withCredentials: true }),{
                loading: "Sedang Login...",
                success: "Berhasil Login!",
                error: "Password/Email Salah",
            }
        );
        console.log(response.data.user)
        if (response && response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            

            // localStorage.setItem('role', response.data.user.role);
        }
        // const response = await axios.post("http://localhost:8000/login", loginData, { withCredentials: true })
        return response.data.user;
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false)
    }
}

export const submitForgotPassword = async (resetData, setLoading) => {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }
        await toast.promise(
            axios.post("http://localhost:8000/forgot-password", resetData, { withCredentials: true }),
            {
                loading: "Sedang Mengirim Token",
                success: "Token Berhasil Dikirim, Silahkan Cek E-mail!",
                error: "Email Tidak Ditemukan",
            }
        )
    } catch (error) {
        if (error.response) {
            // Cek apakah ada errors di data
            // const errorMessage = error.response.data.errors 
            //     ? Object.values(error.response.data.errors).flat().join(", ")
            //     : error.response.data.message;
            // toast.error(errorMessage);
            // toast.error("Terjadi Kesalahan Jaringan");
        }
    } finally {
        setLoading(false)
    }
}

export const submitToken = async (tokenData, setLoading) => {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }

        await toast.promise(
            axios.post('http://localhost:8000/input-token', tokenData, { withCredentials: true }),{
                loading: "Sedang Mengverifikasi Token",
                success: "Token Berhasil Diverifikasi, Silahkan Ganti Password!",
                error: "Token Salah",
            }

        )
        // toast.success(response.data.message);
        return {success : true}
    } catch (error) {
        console.log(error)
    } finally{
        setLoading(false)
    }
}

export const submitChangePassword = async (passData, setLoading) => {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }
        const response = await axios.post('http://localhost:8000/ganti-password', passData, { withCredentials: true });
        return { success : true}
    } catch (error) {
        if (error.response) {
            // Cek apakah ada errors di data
            const errorMessage = error.response.data.errors 
                ? Object.values(error.response.data.errors).flat().join(", ")
                : error.response.data.message;
            toast.error(errorMessage);
        } else {
            toast.error("Terjadi Kesalahan Jaringan");
        }
    } finally {
        setLoading(false)
    }
}