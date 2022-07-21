import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'

type Props = {};

function setCookie(name: string, value: string, days: number) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const LoginForm = (props: Props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    const apiUrl = `${location.protocol}//${location.host}/api/auth/login`;

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.text()).then(token => {
      console.log("Received session token", token)
      setCookie("jwt_token", token, 1)
      router.push(`${location.protocol}//${location.host}/`)
    })
  
  };

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
