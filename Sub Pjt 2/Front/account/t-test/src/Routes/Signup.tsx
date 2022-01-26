import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface ISignUpForm {
  userId: string;
  userPw: string;
  checkPw: string;
  userName: string;
  userNickname: string;
  userAddr: string;
  userAddrDetail: string;
  userZip: number;
  userTel: string;
  userEmail: string;
}

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

function Singup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpForm>();

  const onValid = (data: ISignUpForm) => {
    console.log(data);
    if (data.userPw !== data.checkPw) {
      setError(
        "checkPw",
        { message: "비밀번호가 다릅니다" },
        { shouldFocus: true } // error 발생 시 입력위치 이동
      );
    } else {
      axios({
        method: "POST",
        url: "http://i6e104.p.ssafy.io/user/register",
        data,
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
    }
  };
  console.log(errors);

  return (
    <>
      <h1>회원 가입</h1>
      <SignUpForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register("userId", {
            required: "ID는 필수입니다.",
            minLength: { value: 4, message: "아이디가 너무 짧습니다." },
          })}
          placeholder="id"
        />
        <span>{errors?.userId?.message}</span>
        <input
          {...register("userPw", { required: "비밀번호는 필수입니다." })}
          placeholder="password"
        />
        <span>{errors?.userPw?.message}</span>
        <input
          {...register("checkPw", { required: "비밀번호 확인 필수입니다." })}
          placeholder="비밀번호 확인"
        />
        <span>{errors?.checkPw?.message}</span>
        <input
          {...register("userName", { required: "이름은 필수입니다." })}
          placeholder="name"
        />
        <span>{errors?.userName?.message}</span>
        <input
          {...register("userNickname", { required: "닉네임은 필수입니다." })}
          placeholder="nickname"
        />
        <span>{errors?.userNickname?.message}</span>
        <input
          {...register("userAddr", { required: "주소는 필수입니다." })}
          placeholder="address1"
        />
        <span>{errors?.userAddr?.message}</span>
        <input
          {...register("userAddrDetail", { required: "주소는 필수입니다." })}
          placeholder="address2"
        />
        <span>{errors?.userAddrDetail?.message}</span>
        <input
          {...register("userZip", {
            required: "우편번호는 필수입니다.",
            pattern: {
              value: /^[0-9]+$/,
              message: "우편번호는 숫자만 입력 가능합니다.",
            },
          })}
          placeholder="zip"
        />
        <span>{errors?.userZip?.message}</span>
        <input
          {...register("userTel", { required: "전화번호는 필수입니다." })}
          placeholder="000-0000-0000"
        />
        <span>{errors?.userTel?.message}</span>
        <input
          {...register("userEmail", { required: "이메일은 필수입니다." })}
          placeholder="email"
        />
        <span>{errors?.userEmail?.message}</span>
        <button>가입</button>
      </SignUpForm>
    </>
  );
}
export default Singup;

/* function Singup() {
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

export default Singup; */
