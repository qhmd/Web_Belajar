import axios from 'axios';
import Cookies from 'js-cookie';


// Set base URL jika diperlukan
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// Ambil token CSRF dari cookie
const csrfToken = Cookies.get('XSRF-TOKEN');

// Set CSRF token di header Axios
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
}