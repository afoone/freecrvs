import React, { useState } from "react";
import FormLogin from "../../components/login/FormLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const index = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stateFormMessage, setStateFormMessage] = useState({});
  const [stateFormError, setStateFormError] = useState([]);
  const [stateFormValid, setStateFormValid] = useState(false);

  const [stateFormData, setStateFormData] = useState({
    email: {
      value: "",
      label: "User",
      min: 6,
      max: 36,
      required: true,
      validator: {
        regEx: /^[a-z\sA-Z0-9\W\w]+$/,
        error: "Please insert valid username",
      },
    },
    password: {
      value: "",
      label: "Password",
      min: 4,
      max: 36,
      required: true,
      validator: {
        regEx: /^[a-z\sA-Z0-9\W\w]+$/,
        error: "Please insert valid password",
      },
    },
  });

  function validationHandler(states, e) {
    const input = (e && e.target.name) || "";
    const errors = [];
    let isValid = true;

    if (input) {
      if (states[input].required) {
        if (!states[input].value) {
          errors[input] = {
            hint: `${states[e.target.name].label} required`,
            isInvalid: true,
          };
          isValid = false;
        }
      }
      if (
        states[input].value &&
        states[input].min > states[input].value.length
      ) {
        errors[input] = {
          hint: `Field ${states[input].label} min ${states[input].min}`,
          isInvalid: true,
        };
        isValid = false;
      }
      if (
        states[input].value &&
        states[input].max < states[input].value.length
      ) {
        errors[input] = {
          hint: `Field ${states[input].label} max ${states[input].max}`,
          isInvalid: true,
        };
        isValid = false;
      }
      if (
        states[input].validator !== null &&
        typeof states[input].validator === "object"
      ) {
        if (
          states[input].value &&
          !states[input].validator.regEx.test(states[input].value)
        ) {
          errors[input] = {
            hint: states[input].validator.error,
            isInvalid: true,
          };
          isValid = false;
        }
      }
    } else {
      Object.entries(states).forEach((item) => {
        item.forEach((field) => {
          errors[item[0]] = "";
          if (field.required) {
            if (!field.value) {
              errors[item[0]] = {
                hint: `${field.label} required`,
                isInvalid: true,
              };
              isValid = false;
            }
          }
          if (field.value && field.min >= field.value.length) {
            errors[item[0]] = {
              hint: `Field ${field.label} min ${field.min}`,
              isInvalid: true,
            };
            isValid = false;
          }
          if (field.value && field.max <= field.value.length) {
            errors[item[0]] = {
              hint: `Field ${field.label} max ${field.max}`,
              isInvalid: true,
            };
            isValid = false;
          }
          if (field.validator !== null && typeof field.validator === "object") {
            if (field.value && !field.validator.regEx.test(field.value)) {
              errors[item[0]] = {
                hint: field.validator.error,
                isInvalid: true,
              };
              isValid = false;
            }
          }
        });
      });
    }
    if (isValid) {
      setStateFormValid(isValid);
    }
    setStateFormError({
      ...errors,
    });
    return isValid;
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    setStateFormData({
      ...stateFormData,
      [name]: {
        ...stateFormData[name],
        value,
      },
    });

    /* validation handler */
    validationHandler(stateFormData, e);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let data = { ...stateFormData };

    /* email */
    data = { ...data, email: data.email.value || "" };
    /* password */
    data = { ...data, password: data.password.value || "" };

    /* validation handler */
    const isValid = validationHandler(stateFormData);

    if (isValid) {
      // Call an external API endpoint to get posts.
      // You can use any data fetching library
      setLoading(!loading);
      const loginApi = await fetch(`/api/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => {
        console.error("Error:", error);
      });
      let result = await loginApi.json();
      if (result.success && result.token) {
        Cookies.set("token", result.token);
        // window.location.href = referer ? referer : "/";
        // const pathUrl = referer ? referer.lastIndexOf("/") : "/";
        Router.push("/");
      } else {
        setStateFormMessage(result);
      }
      setLoading(false);
    }
  };
  return (
    <div className="login-page">
      <FormLogin
        props={{
          onSubmitHandler,
          onChangeHandler,
          loading,
          stateFormData,
          stateFormError,
          stateFormMessage,
        }}
      />
    </div>
  );
};

export default index;
