import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserForm = ({ user, setUser }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    if (user._id) {
      axios.put(`/api/users/${user._id}/`, data);
    } else {
      axios.post("/api/users", data);
    }

    setUser(null);
  };

  useEffect(() => {
    if (user) reset({ ...user, password: "" });
    console.log("miuser", user);
  }, [user]);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="user-form">
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="ui form">
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            placeholder="First Name"
          />
          {errors.firstName && <span>This field is required</span>}
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Last Name"
          />
          {errors.lastName && <span>This field is required</span>}
        </div>

        <div className="field">
          <label>E-Mail</label>
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="E-Mail"
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="field">
          <label>Role</label>
          <select {...register("role", { required: true })} placeholder="Role">
            <option>REGISTRAR</option>
            <option>ADMIN</option>
          </select>

          {errors.email && <span>This field is required</span>}
        </div>

        <div className="field">
          <label>Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && <span>This field is required</span>}
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="text"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && <span>This field is required</span>}
        </div>

        <button className="ui button" type="submit">
          Submit
        </button>
        <button
          className="ui button"
          type="submit"
          onClick={() => setUser(null)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
