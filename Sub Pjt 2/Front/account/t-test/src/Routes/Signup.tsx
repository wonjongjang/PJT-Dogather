import axios from "axios";
import React, { useState } from "react";

function Singup() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const newZip = parseInt(zip);
  const json =         JSON.stringify({
          userId: id,
          userPw: password,
          userName: name,
          userNickname: nickname,
          userAddr: address1,
          userAddrDetail: address2,
          userZip: newZip,
          userTel: phone,
          userEmail: email,
        })
  const register = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    console.log(
      "가입",
      id,
      password,
      name,
      nickname,
      address1,
      address2,
      zip,
      phone,
      email
    );
 

    axios({
      method: "POST",
      url: "http://i6e104.p.ssafy.io/user/register",
      data: json,
      headers:{
            "Content-Type": "application/json"
        }
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

  const onChangeId = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setId(value);
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };

  const onChangeName = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setName(value);
  };

  const onChangeNickname = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setNickname(value);
  };

  const onChangeAddress1 = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setAddress1(value);
  };

  const onChangeAddress2 = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setAddress2(value);
  };

  const onChangeZip = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setZip(value);
  };

  const onChangePhone = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setPhone(value);
  };

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    setEmail(value);
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={register}>
        <input value={id} onChange={onChangeId} type="text" placeholder="ID" />
        <br />
        <input
          value={password}
          onChange={onChangePassword}
          type="text"
          placeholder="password"
        />
        <br />
        <input
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder="name"
        />
        <br />
        <input
          value={nickname}
          onChange={onChangeNickname}
          type="text"
          placeholder="nickname"
        />
        <br />
        <input
          value={address1}
          onChange={onChangeAddress1}
          type="text"
          placeholder="address 1"
        />
        <br />
        <input
          value={address2}
          onChange={onChangeAddress2}
          type="text"
          placeholder="address 2"
        />
        <br />
        <input
          value={zip}
          onChange={onChangeZip}
          type="text"
          placeholder="zip"
        />
        <br />
        <input
          value={phone}
          onChange={onChangePhone}
          type="text"
          placeholder="phone"
        />
        <br />
        <input
          value={email}
          onChange={onChangeEmail}
          type="text"
          placeholder="email"
        />
        <br />
        <button>가입!~~</button>
      </form>
    </>
  );
}

export default Singup;
