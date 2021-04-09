import React from "react";

function FormLogin({ props }) {
  const {
    onSubmitHandler,
    onChangeHandler,
    stateFormData,
    stateFormError,
    stateFormMessage,
  } = props;
  return (
    <div className="ui centered card">
      <form
        className="ui form"
        method="POST"
        onSubmit={onSubmitHandler}
      >
        <div className="form-group">
          <h2>Login</h2>
          <hr />
          {stateFormMessage.status === "error" && (
            <h4 className="warning text-center">{stateFormMessage.error}</h4>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Username</label>
          <input
            className="form-control"
            type="text"
            id="email"
            name="email"
            placeholder="user"
            onChange={onChangeHandler}
            value={stateFormData.email.value}
          />
          {stateFormError.email && (
            <span className="warning">{stateFormError.email.hint}</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChangeHandler}
            value={stateFormData.email.password}
          />
          {stateFormError.password && (
            <span className="warning">{stateFormError.password.hint}</span>
          )}
        </div>
        <div>
          <button type="submit" className="btn btn-block btn-warning">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
export default FormLogin;
