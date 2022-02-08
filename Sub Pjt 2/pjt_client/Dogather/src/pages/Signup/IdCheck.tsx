import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface ISignUpForm {
    userId: string;
  }
  
function IdCheck() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
  
    const {
      register,
      formState: { errors },
    } = useForm<ISignUpForm>({ mode: "onChange" });

    const onValid = (data: ISignUpForm) => {
    
        fetch("http://i6e104.p.ssafy.io:8090/user/idcheck?id=#{여기아이디}", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => {
            // 결과나오면 처리해주
          });
      };
    
    return (<Container>
      <InputTitle>아이디</InputTitle>
        <Input2
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
        <Button2 onClick={()=> setModalIsOpen(true)}>중 복 확 인</Button2>
    </Container>);
}


const InputTitle = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;


const Container = styled.div`
    height : 10rem;
    width : 100%;
    margin-left : 1rem;
    margin-right : 1rem;
    
`;

const Input2 = styled.input`
  margin-top: 5px;
  margin-bottom: 1px;
  width: 50%;
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

const Button2 = styled.button.attrs({
    type: "button",
  })`
    vertical-align: center;
    border-radius: 10px;
    margin-left: 25px;
    margin-right: 25px;
    border: 1px #1e272e solid;
    width: 30%;
    height: 50px;
    font-size: 13px;
    background-color: white;
    color: #1e272e;
    cursor: pointer;
`;
export default IdCheck;