import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext, useAuth } from "../../context/AppContext";
import { toast } from "react-toastify";

const EditDepartmentForm = () => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const { user } = useAuth();
    const { backendUrl } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState(null);

    // Only Admin can edit departments
    if (!user || user.role !== "admin") {
        return <p className="text-red-500 text-center text-lg">Access Denied! Only Admins can Edit departments.</p>;
    }

    // Fetch departments from API
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axios.get(backendUrl+'/api/department/all-departments');
                if (res.data.success) {
                    setDepartments(res.data.data);
                } else {
                    setErrorMessage("Failed to fetch departments.");
                }
            } catch (error) {
                console.error(error);
                setErrorMessage("Error fetching departments.");
            }
        };
        fetchDepartments();
    }, []);

    // Handle department selection
    const handleSelect = (e) => {
        const deptId = e.target.value;
        const dept = departments.find((d) => d._id === deptId);
        setSelectedDept(dept);

        if (dept) {
            setValue("name", dept.name);
            setValue("description", dept.description);
        } else {
            reset();
        }
    };

    // Submit update request
    const onSubmit = async (data) => {
        if (!selectedDept) {
            setErrorMessage("Please select a department to edit.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("Authentication failed. Please log in again.");
                setLoading(false);
                return;
            }

            const res = await axios.put(`${backendUrl}/api/department/edit`, {
                id: selectedDept._id,
                ...data,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                toast.success("Department edited successfully!");
                reset();
                setSelectedDept(null);
            } else {
                setErrorMessage(res.data.message || "Failed to edit department.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error editing department. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Department</h2>
            {errorMessage && <p className="text-red-500 mb-2 text-center">{errorMessage}</p>}

            {/* Select Department */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Select Department</label>
                <select onChange={handleSelect} className="border p-2 w-full rounded">
                    <option value="">-- Select a Department --</option>
                    {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                            {dept.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Edit Form */}
            {selectedDept && (
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div>
                        <label className="block">Department Name</label>
                        <input
                            {...register("name", { required: "Department name is required" })}
                            className="border p-2 w-full rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block">Description</label>
                        <textarea
                            {...register("description")}
                            className="border p-2 w-full rounded"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {loading ? "Editing..." : "Update Department"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDepartmentForm;
