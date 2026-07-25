import axios from "axios";

const API = axios.create({
    baseURL: "https://leaddesk-backend-4lhk.onrender.com"
   
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