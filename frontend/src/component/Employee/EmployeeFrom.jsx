import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext, useAuth } from "../../context/AppContext";

const EmployeeForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useAuth();
    const {backendUrl} = useContext(AppContext)
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Only Admin can add employees
    if (!user || user.role !== "admin") {
        return <p className="text-red-500 text-center text-lg">Access Denied! Only Admins can add employees.</p>;
    }
 
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
    }, [])

    const handleSelect = async(e)=>{
        const deptId =  e.target.value;
        setValue("department", deptId);


    }

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
            
            const res = await axios.post(backendUrl+'/api/employee/register', data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success) {
                toast.success("Employee added successfully!");
                reset();
            } else {
                setErrorMessage(res.data.message || "Failed to add employee.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add Employee</h2>
            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block">Name</label>
                    <input {...register("name", { required: "Name is required" })} className="input-field" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block">Employee ID</label>
                    <input {...register("employeeId", { required: "Name is required" })} className="input-field" />
                    {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId.message}</p>}
                </div>


                <div>
                    <label className="block">Email</label>
                    <input {...register("email", { required: "Email is required" })} className="input-field" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block">Phone</label>
                    <input {...register("phone", { required: "Phone number is required" })} className="input-field" />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
                <div>
                    <label className="block">Gender</label>
                    <select {...register("gender", { required: "Gender is required" })} className="input-field">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

                <div>
                    <label className="block">Salary</label>
                    <input type="number" {...register("salary", { required: "Salary is required" })} className="input-field" />
                    {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                </div>

                <div>
                <label className="block">Select Department</label>
                <select {...register("department", { required: "Department is required" })} onChange={handleSelect} className="input-field">
                    <option value="">-- Select a Department --</option>
                    {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                            {dept.name}
                        </option>
                    ))}
                </select>
                {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
               </div>


                <div>
                    <label className="block">Designation</label>
                    <input {...register("designation", { required: "Designation is required" })} className="input-field" />
                    {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
                </div>


                <div>
                    <label className="block">Joining Date</label>
                    <input type="date" {...register("dateOfJoining", { required: "Joining date is required" })} className="input-field" />
                    {errors.dateOfJoining && <p className="text-red-500 text-sm">{errors.dateOfJoining.message}</p>}
                </div>

                <div className="col-span-2 text-center">
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                        {loading ? "Adding..." : "Add Employee"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
