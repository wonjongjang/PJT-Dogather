import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isMouseEnter, setMouseEnter] = useState(false);

  const json = JSON.stringify({
    userId: id,
    userPw: password,
  });

  const onChangeIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    console.log("login", id, password);
    console.log(json);

    axios({
      method: "POST",
      url: "http://i6e104.p.ssafy.io:8080/user/login",
      data: json,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // 성공시
        console.log(response);
      })
      .catch((error) => {
        // 실패시
        console.log(error.response);
      })
      .finally(() => {});
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          value={id}
          onChange={onChangeIdInput}
          type="text"
          placeholder="아이디를 입력하세요."
        />
        <br />
        <input
          value={password}
          onChange={onChangePasswordInput}
          type="text"
          placeholder="비밀번호를 입력하세요."
        />
        <button>드가자</button>
      </form>
    </div>
  );
}

export default Login;
