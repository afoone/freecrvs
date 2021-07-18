import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserForm = ({ user, setUser, addUserToList }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (user._id) {
      await axios.put(`/api/users/${user._id}/`, { ...data, _id: undefined });
    } else {
      await axios.post("/api/users", data);
    }

    addUserToList(data);

    setUser(null);
  };

  useEffect(() => {
    if (user) reset({ ...user, password: "" });
  }, [user]);

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

        <button className="ui button positive" type="submit">
          Submit
        </button>
        <button
          className="ui button negative"
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
