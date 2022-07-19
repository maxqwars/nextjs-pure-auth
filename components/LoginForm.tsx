import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form className="box" onSubmit={handleSubmit(onSubmit)}>
      <div className="block">
        <h3 className="is-size-3">Log in</h3>
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
          <button className="button is-link">Log in</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
