import styled from "styled-components";
import { useForm } from "react-hook-form";
import { fetchGroup } from "../../api/CreateMoim";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIdAtom, userNoAtom } from "../../atoms/Login";
import { useNavigate } from "react-router-dom";

import CreateOption from "./CreateMoimComponent/Option/CreateOption";
import { OptionsAtom } from "../../atoms/Options";
import Option from "./CreateMoimComponent/Option/Option";
import CreateFAQ from "./CreateMoimComponent/FAQ/CreateFAQ";
import { FAQsAtom } from "../../atoms/FAQs";
import FAQ from "./CreateMoimComponent/FAQ/FAQ";
import { useState } from "react";

export interface IMoimForm {
  groupLeader: number; // 모임 대표
  categoryNo: number; // 카테고리 pk
  deadline: string; // *공구 마감 날짜
  maxPeople: number; // 인원 수
  status: string; // *공구 진행 상태
  product: string; // 모임 제목 (상품명)
  detail: string; // 모임 상세설명 (상품 상세설명)
  link: string; // 제품 url
  originPrice: number; // 출시 가격
  price: number; // 공구 가격
}

function CreateMoim() {
  const navigate = useNavigate();

  const userNo = useRecoilValue(userNoAtom);
  const userId = useRecoilValue(userIdAtom);
  const [options, setOptions] = useRecoilState(OptionsAtom);
  const [FAQs, setFAQs] = useRecoilState(FAQsAtom);

  const [fileList, setFileList] = useState<FileList | undefined>();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<IMoimForm>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    if (files != null) {
      setFileList(files);
    }
  };

  const onValid = (data: IMoimForm) => {
    const JWT = localStorage.getItem("login_token");

    const newDeadline =
      data.deadline.replace("T", " ").substring(0, 19) + ":00";

    const newData = {
      group: {
        ...data,
        deadline: newDeadline,
        groupLeader: userNo,
        categoryNo: 1,
        status: "모집중",
      },
      options: options,
      requestfaq: FAQs,
    };

    const formData = new FormData();

    formData.append(
      "groupRegisterDto",
      new Blob([JSON.stringify(newData)], { type: "application/json" })
    );

    if (fileList != null) {
      Array.from(fileList).forEach((file) => formData.append("file", file));
    }

    fetch("http://i6e104.p.ssafy.io:8090/group/register", {
      method: "POST",
      headers: {
        jwt: `${JWT}`,
        userId: userId,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          navigate(`/moim/${result}`);
          console.log(result);
        }
        setOptions([]);
        setFAQs([]);
      });
  };

  return (
    <>
      <MoimForm id="total" onSubmit={handleSubmit(onValid)}>
        <FormTitle>모임 생성</FormTitle>
        <InputDiv>
          <InputTitle>제목</InputTitle>
          <Input
            {...register("product", {
              required: "필수 정보입니다.",
            })}
          />
          <ErrorMessage>{errors?.product?.message}</ErrorMessage>
        </InputDiv>
        <InputDiv>
          <InputTitle>출시가</InputTitle>
          <Input
            {...register("originPrice", {
              required: "필수 정보입니다.",
            })}
          />
          <ErrorMessage>{errors?.originPrice?.message}</ErrorMessage>
        </InputDiv>
        <InputDiv>
          <InputTitle>공구가</InputTitle>
          <Input
            {...register("price", {
              required: "필수 정보입니다.",
            })}
          />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputDiv>
        <InputDiv>
          <InputTitle>내용</InputTitle>
          <Input
            {...register("detail", {
              required: "필수 정보입니다.",
            })}
          />
          <ErrorMessage>{errors?.detail?.message}</ErrorMessage>
        </InputDiv>
        <InputDiv>
          <InputTitle>URL</InputTitle>
          <Input
            {...register("link", {
              required: "필수 정보입니다.",
            })}
          />
          <ErrorMessage>{errors?.link?.message}</ErrorMessage>
        </InputDiv>
        <InputDiv>
          <InputTitle>인원수</InputTitle>
          <Input
            {...register("maxPeople", {
              required: "필수 정보입니다.",
            })}
          />
          <ErrorMessage>{errors?.maxPeople?.message}</ErrorMessage>
        </InputDiv>
        <InputDiv>
          <InputTitle>공구 마감 날짜</InputTitle>
          <Input
            {...register("deadline", {
              required: "필수 정보입니다.",
            })}
            type="datetime-local"
          />
          <ErrorMessage>{errors?.deadline?.message}</ErrorMessage>
        </InputDiv>
      </MoimForm>
      <input type="file" multiple onChange={onChange} />
      <CreateOption />
      {options?.map((option) => (
        <Option key={option.id} {...option} />
      ))}
      <CreateFAQ />
      {FAQs?.map((faq) => (
        <FAQ key={faq.id} {...faq} />
      ))}
      <Button form="total">생성하기</Button>
    </>
  );
}

const MoimForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 68px;
  margin: 0 auto;
  max-width: 680px;
`;

const FormTitle = styled.h2`
  font-weight: bold;
  font-size: 32px;
  margin: 55px;
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

const Calendar = styled.input`
  display: row;
  margin-top: 5px;
  margin-bottom: 1px;
  width: 200px;
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

export default CreateMoim;
