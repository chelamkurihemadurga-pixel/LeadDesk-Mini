import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import API, { updateStatus, deleteLead } from "../services/api";

function AdminDashboard() {

    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const loadLeads = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await API.get("/leads", {
                params: {
                    search,
                    status: statusFilter
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLeads(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to load leads");

        }

    };

    useEffect(() => {
        loadLeads();
    }, [search, statusFilter]);

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>LeadDesk Admin Dashboard</h1>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>

            </div>

            <div className="controls">

                <input
                    type="text"
                    placeholder="Search by Name or Email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                </select>

            </div>

            <div className="stats">

                <div className="card">
                    <h2>{leads.length}</h2>
                    <p>Total Leads</p>
                </div>

                <div className="card">
                    <h2>{leads.filter(l => l.status === "New").length}</h2>
                    <p>New Leads</p>
                </div>

                <div className="card">
                    <h2>{leads.filter(l => l.status === "Completed").length}</h2>
                    <p>Completed</p>
                </div>

                <div className="card">
                    <h2>{leads.filter(l => l.status === "Rejected").length}</h2>
                    <p>Rejected</p>
                </div>

            </div>
            <div className="table-container">
            <table>

                <thead>

                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Budget</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {leads.length === 0 ? (

                        <tr>
                            <td colSpan="7">
                                No Leads Found
                            </td>
                        </tr>

                    ) : (

                        leads.map((lead, index) => (

                            <tr key={lead.id}>

                                <td>{index + 1}</td>

                                <td>{lead.name}</td>

                                <td>{lead.email}</td>

                                <td>{lead.budget}</td>

                                <td>{lead.message}</td>

                                <td>

                                    <select
                                        className={`status-select ${lead.status.toLowerCase()}`}
                                        value={lead.status}
                                        onChange={(e) => {

                                            updateStatus(
                                                lead.id,
                                                e.target.value
                                            ).then(() => {
                                                loadLeads();
                                            });

                                        }}
                                    >

                                        <option>New</option>
                                        <option>Contacted</option>
                                        <option>Completed</option>
                                        <option>Rejected</option>

                                    </select>

                                </td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={() => {

                                            if (window.confirm("Delete this lead?")) {

                                                deleteLead(lead.id)
                                                    .then(() => {
                                                        loadLeads();
                                                    });

                                            }

                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>
                </div>
        </div>

    );

}

export default AdminDashboard;