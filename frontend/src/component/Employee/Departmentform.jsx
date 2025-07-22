import { useForm } from "react-hook-form";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext, useAuth } from "../../context/AppContext";

const DepartmentForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user} = useAuth();
    const{backendUrl} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Only Admin can add departments
    if (!user || user.role !== "admin") {
        return <p className="text-red-500 text-center text-lg">Access Denied! Only Admins can add departments.</p>;
    }

    const fetchDepartments = async () => {
        try {
            const res = await axios.get(backendUrl+'/api/department/all-departments');
            if (res.data.success) {
                setDepartments(res.data.data);
            } else {
                setErrorMessage("Failed to fetch departments.");
            }
        } catch (error) {
            setErrorMessage("Error fetching departments. Try again later.");
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("Authentication failed. Please log in again.");
                setLoading(false);
                return;
            }
            
            const res = await axios.post(`${backendUrl}/api/department/add`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                alert("Department added successfully!");
                reset();
                fetchDepartments();
            } else {
                setErrorMessage(res.data.message || "Failed to add department.");
            }
        } catch (error) {
            setErrorMessage("Error adding department. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add Department</h2>
            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div>
                    <label className="block">Department Name</label>
                    <input {...register("name", { required: "Department name is required" })} className="border p-2 w-full rounded" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block">Description</label>
                    <textarea {...register("description")} className="border p-2 w-full rounded"></textarea>
                </div>

                <div className="text-center">
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                        {loading ? "Adding..." : "Add Department"}
                    </button>
                </div>
            </form>

            <h3 className="text-lg font-semibold mt-6">Departments List</h3>
            <ul className="list-disc pl-5">
                {departments.map((dept) => (
                    <li key={dept._id}>{dept.name} - {dept.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentForm;
