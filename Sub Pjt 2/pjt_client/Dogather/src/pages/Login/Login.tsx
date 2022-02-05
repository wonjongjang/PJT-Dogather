import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

interface ILoginForm {
  userId: string;
  userPw: string;
}

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const signin = (data: ILoginForm) => {
    console.log(data);

    fetch("http://i6e104.p.ssafy.io:8090/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const JWT = jwt_decode(result.jwt);
        console.log(JWT);
        // navigate("/");
      })
      .catch((error) => {
        // 실패
        console.log(error);
      });

    // axios({
    //   method: "POST",
    //   url: "http://i6e104.p.ssafy.io:8090/user/login",
    //   data,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     // 성공시
    //     console.log(response);
    //     console.log(response.data);
    //     const JWT = jwt_decode(response.data.jwt);
    //     console.log(JWT);
    //     // navigate("/");
    //     // localStorage.setItem('token', response.data.jwt)
    //   })
    //   .catch((error) => {
    //     // 실패시
    //     console.log(error.response);
    //     const errorMessage = error.response.data.msg;
    //     if (errorMessage === "wrongPw") {
    //       alert("비밀번호가 틀렸습니다.");
    //     } else {
    //       alert("존재하지 않는 아이디입니다.");
    //     }
    //   })
    //   .finally(() => {});
  };
  return (
    <LoginForm onSubmit={handleSubmit(signin)}>
      <LoginTitle>로그인</LoginTitle>
      <InputDiv>
        <InputTitle>아이디</InputTitle>
        <Input
          {...register("userId", {
            required: "아이디를 입력해 주세요.",
          })}
        />
        <ErrorMessage>{errors?.userId?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>비밀번호</InputTitle>
        <Input
          {...register("userPw", {
            required: "비밀번호를 입력해 주세요.",
          })}
        />
        <ErrorMessage>{errors?.userPw?.message}</ErrorMessage>
      </InputDiv>
      <LoginButton>로그인</LoginButton>
      <KakaoLoginButton src="https://user-images.githubusercontent.com/70811550/126318637-aaa3db8c-bc8d-4b5d-b378-663d5f3cb51a.png" />
    </LoginForm>
  );
}

const LoginTitle = styled.h2`
  font-weight: bold;
  font-size: 32px;
  margin: 55px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 68px;
  margin: 0 auto;
  max-width: 680px;
`;

const InputDiv = styled.div`
  margin-bottom: 20px;
`;

const InputTitle = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-top: 5px;
  margin-bottom: 1px;
  width: 400px;
  height: 45px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
`;

const ErrorMessage = styled.p`
  text-align: left;
  font-size: 11px;
  color: #ff3f34;
`;

const LoginButton = styled.button`
  margin-top: 35px;
  border-radius: 10px;
  border: none;
  width: 400px;
  height: 55px;
  font-size: 18px;
  font-weight: bold;
  background-color: #1e272e;
  color: white;
  cursor: pointer;
`;

const KakaoLoginButton = styled.img`
  margin-top: 2px;
  border-radius: 10px;
  border: none;
  width: 400px;
  height: 55px;
  cursor: pointer;
`;

export default Login;
