import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const RegisterUserForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const apiUrl = `${location.protocol}//${location.host}/api/user/create`;
    console.log("create user handler url", apiUrl);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((user) => console.log(user))
      .catch((error) => console.error(error));
  };

  return (
    <form className="box" onSubmit={handleSubmit(onSubmit)}>
      <div className="block">
        <h3 className="is-size-3">Create new</h3>
      </div>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            {...register("name")}
            className="input"
            type="text"
            placeholder="Enter you name"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            {...register("email")}
            className="input"
            type="text"
            placeholder="Enter you email address"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            {...register("password")}
            className="input"
            type="password"
            placeholder="Enter password"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-link">Create</button>
        </div>
      </div>
    </form>
  );
};

export default RegisterUserForm;
