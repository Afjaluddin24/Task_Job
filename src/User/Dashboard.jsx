import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TaskSchemas } from "../schemas";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const initialValues = {
    text: "",
    completed: "",
    date: ""
  };

  const Username = localStorage.getItem("Username");

  const GetAllTask = async () => {
    try {
      const response = await axios.get("http://localhost:1212/api/GetAll");
      setTasks(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1212/api/DeleteTask/${id}`);
      GetAllTask();
    } catch (error) {
      console.log(error);
    }
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues,
    validationSchema: TaskSchemas,
    onSubmit: async (values) => {
      try {
        const Data = {
          text: values.text,
          completed: values.completed === "true",
          date: values.date
        };

        const response = await axios.post(
          "http://localhost:1212/api/AddTask",
          Data
        );

        alert(response.data.message);
        resetForm();
        GetAllTask();

      } catch (error) {
        console.log(error);
      }
    }
  });


  useEffect(() => {
    GetAllTask();
    
     const token = localStorage.getItem("token");
     if (token == null) {
       window.location.href = "/";
     }
   }, []);


  return (
    <div className="container-fluid">

      <div className="col-md-12 bg-info py-3 mb-4">
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-start">&nbsp;&nbsp;Dashboard</h6>
          </div>
          <div className="col-md-6 text-end">
            <b>Welcome, {Username}&nbsp;&nbsp;&nbsp;</b>
          </div>
        </div>
      </div>

      <div className="col-md-12 mt-3 mb-2">
        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-6 mt-2 mb-2">
            <b>
              Task
              <label className="text-danger">
                {errors.text && touched.text ? errors.text : null}
              </label>
            </b>
            <input
              type="text"
              name="text"
              value={values.text}
              onBlur={handleBlur}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mt-2 mb-2">
            <b>Status</b>
            <select
              name="completed"
              value={values.completed}
              onBlur={handleBlur}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Status</option>
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>
          <div className="col-md-6 mt-2 mb-2">
            <b>Date</b>
            <input
              type="date"
              name="date"
              value={values.date}
              onBlur={handleBlur}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-12 mt-3">
            <button type="submit" className="btn btn-success">
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-12 bg-success py-3 text-center mt-3">
        <b>Task Details</b>
      </div>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5">No Data</td>
            </tr>
          ) : (
            tasks.map((t, index) => (
              <tr key={t._id}>
                <td>{index + 1}</td>
                <td style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                  {t.text}
                </td>
                <td>{t.completed ? "Completed" : "Pending"}</td>
                <td>{t.createDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTask(t._id)}
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
  );
}