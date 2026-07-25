import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000"
});
export const deleteLead = (id) => {

    const token = localStorage.getItem("token");

    return API.delete(`/delete_lead/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};
export const updateStatus = (id, status) => {

    const token = localStorage.getItem("token");

    return API.put(
        `/update_status/${id}`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export default API;