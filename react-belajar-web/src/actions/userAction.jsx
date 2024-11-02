import axios from "axios";

export const sumbitData = async (formData, setLoading) => {
    try {
        const response = await axios.post('api/signup', formData);
        const data = response.data;

        if (data.success) {
            alert("Berhasil Membuat Akun");

        } else {
            alert(data.message || "Registration failed");
        }
    } catch (err) {
        alert("Error: " + err.message)
    } finally {
        setLoading(false)
    }
}