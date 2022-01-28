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

function Singup() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpForm>();

  // console.log(register);
  // const

  const onValid = (data: ISignUpForm) => {
    console.log(data);
    if (data.userPw !== data.checkPw) {
      setError(
        "checkPw",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true } // error 발생 시 입력위치 이동
      );
    } else {
      fetch("http://i6e104.p.ssafy.io:8090/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          // 성공
          console.log(response);
          // 로그인 페이지로 이동
        })
        .catch((error) => {
          // 실패
          console.log(error.response);
        })
        .finally(() => {});
    }
  };
  // console.log(register("userId"));
  // console.log(register.length);
  console.log(watch().userPw);
  // console.log(errors);

  function idCheck(value: string) {
    console.log(value);
  }

  return (
    <SignUpForm onSubmit={handleSubmit(onValid)}>
      <SignUpTitle>회원가입</SignUpTitle>
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
            minLength: {
              value: 8,
              message:
                "8~16자의 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다.",
            },
            maxLength: {
              value: 16,
              message:
                "8~16자의 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다.",
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
            // validate: {
            //   passwordCheck: (value) => (idCheck(value) ? "" : ""),
            // },
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
          placeholder="장원종"
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
        />
        <ErrorMessage>{errors?.userZip?.message}</ErrorMessage>
      </InputDiv>
      <InputDiv>
        <InputTitle>전화번호</InputTitle>
        <Input
          {...register("userTel", {
            required: "필수 정보입니다.",
            pattern: {
              value: /^[0-9]+-[0-9]+-[0-9]+$/,
              message: "전화번호 양식을 지켜주세요.",
            },
          })}
          placeholder="000-0000-0000"
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
      <SignUpButton>가입하기</SignUpButton>
    </SignUpForm>
  );
}

const SignUpTitle = styled.h2`
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
  /* margin: 0 400px; */
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

const SignUpButton = styled.button`
  margin-top: 35px;
  border-radius: 10px;
  border: none;
  width: 400px;
  height: 55px;
  font-size: 18px;
  font-weight: bold;
  background-color: #1e272e;
  color: white;
`;

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
