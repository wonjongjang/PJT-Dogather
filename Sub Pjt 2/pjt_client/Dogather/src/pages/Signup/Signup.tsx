import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

function Singup() {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<ISignUpForm>();

  const onValid = (formData: ISignUpForm) => {
    // console.log(formData);

    // fetch(`http://i6e104.p.ssafy.io/user/idcheck?id=${formData.userId}`)
    //   .then((response) => {
    //     // 성공
    //     console.log(response);
    //     // 로그인 페이지로 이동
    //   })
    //   .catch((error) => {
    //     // 실패
    //     console.log(error.response);
    //   })
    //   .finally(() => {});

    fetch("http://i6e104.p.ssafy.io:8090/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.msg === "가입완료") {
          navigate("/login");
        }
      });
    // .catch((error) => {
    //   // 실패
    //   console.log(error.response);
    // })
    // .finally(() => {});
  };

  return (
    <SignUpForm onSubmit={handleSubmit(onValid)}>
      <FormTitle>회원가입</FormTitle>
      <InputDiv>
        <InputTitle>아이디</InputTitle>
        <Input
          {...register("userId", {
            required: "필수 정보입니다.",
            minLength: {
              value: 4,
              message: "4~10자의 영문 소문자, 숫자만 사용 가능합니다.",
            },
            maxLength: {
              value: 10,
              message: "4~10자의 영문 소문자, 숫자만 사용 가능합니다.",
            },
            // validate: {
            //   checkId: async (value) => {
            //     const data = await fetch(
            //       `http://i6e104.p.ssafy.io/user/idcheck?id=${value}`
            //     );
            //     return data.result;
            //   },
            // },
          })}
          placeholder="영문/숫자 4~10자"
          maxLength={10}
        />
        <ErrorMessage>{errors?.userId?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>비밀번호</InputTitle>
        <Input
          {...register("userPw", {
            required: "필수 정보입니다.",
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
              message:
                "8~16자의 영문 대 소문자, 숫자, 특수문자 조합만 사용 가능합니다.",
            },
          })}
          placeholder="영문/숫자/특수문자 조합 8~16자"
          type="password"
          maxLength={16}
        />
        <ErrorMessage>{errors?.userPw?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>비밀번호 확인</InputTitle>
        <Input
          {...register("checkPw", {
            required: "필수 정보입니다.",
            validate: {
              checkPassword: (value) => {
                const { userPw } = getValues();
                return userPw === value || "비밀번호가 일치하지 않습니다.";
              },
            },
          })}
          placeholder="비밀번호와 동일하게 입력해주세요."
          type="password"
          maxLength={16}
        />
        <ErrorMessage>{errors?.checkPw?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>이름</InputTitle>
        <Input
          {...register("userName", { required: "필수 정보입니다." })}
          // placeholder="장원종"
        />
        <ErrorMessage>{errors?.userName?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>닉네임</InputTitle>
        <Input
          {...register("userNickname", {
            required: "필수 정보입니다.",
            minLength: {
              value: 2,
              message: "2~10자의 한글, 영문 대 소문자, 숫자만 사용 가능합니다.",
            },
            maxLength: {
              value: 10,
              message: "2~10자의 한글, 영문 대 소문자, 숫자만 사용 가능합니다.",
            },
          })}
          placeholder="한글/영문/숫자 2~10자"
          maxLength={10}
        />
        <ErrorMessage>{errors?.userNickname?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>주소</InputTitle>
        <Input {...register("userAddr", { required: "필수 정보입니다." })} />
        <ErrorMessage>{errors?.userAddr?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>상세 주소</InputTitle>
        <Input
          {...register("userAddrDetail", { required: "필수 정보입니다." })}
        />
        <ErrorMessage>{errors?.userAddrDetail?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>우편번호</InputTitle>
        <Input
          {...register("userZip", {
            required: "필수 정보입니다.",
            pattern: {
              value: /^[0-9]+$/,
              message: "우편번호는 숫자만 입력 가능합니다.",
            },
          })}
          type="number"
        />
        <ErrorMessage>{errors?.userZip?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>전화번호</InputTitle>
        <Input
          {...register("userTel", {
            required: "필수 정보입니다.",
            pattern: {
              value: /^[0-9]+$/,
              message: "전화번호 양식을 지켜주세요.",
            },
          })}
          type="number"
          placeholder="숫자만 입력해주세요.   ex) 01012345678"
          maxLength={12}
        />
        <ErrorMessage>{errors?.userTel?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>이메일</InputTitle>
        <Input
          {...register("userEmail", {
            required: "필수 정보입니다.",
            pattern: {
              value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "이메일 양식을 지켜주세요.",
            },
          })}
          placeholder="dogather@email.com"
        />
        <ErrorMessage>{errors?.userEmail?.message}</ErrorMessage>
      </InputDiv>
      <Button>가입하기</Button>
    </SignUpForm>
  );
}

const FormTitle = styled.h2`
  font-weight: bold;
  font-size: 32px;
  margin: 55px;
`;

const SignUpForm = styled.form`
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
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ErrorMessage = styled.p`
  text-align: left;
  font-size: 11px;
  color: #ff3f34;
`;

const Button = styled.button`
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

export default Singup;
