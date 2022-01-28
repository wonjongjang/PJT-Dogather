import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface ILoginForm {
  userId: string;
  userPw: string;
}

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 68px;
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const signin = (data: ILoginForm) => {
    console.log(data);
    axios({
      method: "POST",
      url: "http://i6e104.p.ssafy.io/user/login",
      data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // 성공시
        console.log(response);
        console.log(response.data);
        const JWT = jwt_decode(response.data.jwt);
        console.log(JWT);
        // localStorage.setItem('token', response.data.jwt)
      })
      .catch((error) => {
        // 실패시
        console.log(error.response);
        const errorMessage = error.response.data.msg;
        if (errorMessage === "wrongPw") {
          alert("비밀번호가 틀렸습니다.");
        } else {
          alert("존재하지 않는 아이디입니다.");
        }
      })
      .finally(() => {});
  };
  return (
    <>
      <div>
        <h1>Login</h1>
        <LoginForm onSubmit={handleSubmit(signin)}>
          <input
            {...register("userId", {
              required: "ID는 필수입력사항입니다.",
              minLength: { value: 4, message: "아이디가 너무 짧습니다." },
            })}
            placeholder="id"
          />
          <span>{errors?.userId?.message}</span>
          <br />
          <input
            {...register("userPw", {
              required: "비밀번호는 필수입력사항입니다.",
            })}
            placeholder="Password"
          />
          <span>{errors?.userPw?.message}</span>
          <button>드가자</button>
        </LoginForm>
      </div>
    </>
  );
}

export default Login;
