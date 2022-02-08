import styled from "styled-components";
import { useForm } from "react-hook-form";
import { fetchGroup } from "../../api/CreateMoim";
import { useRecoilValue } from "recoil";
import { userIdAtom } from "../../atoms/Login";
import { useNavigate } from "react-router-dom";
import CreateOption from "./OptionComponent/CreateOption";
import { OptionsAtom } from "../../atoms/Options";
import Option from "./OptionComponent/Option";

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

  const userId = useRecoilValue(userIdAtom);
  const options = useRecoilValue(OptionsAtom);
  // console.log(userId);
  // console.log(typeof userId);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<IMoimForm>();

  const onValid = (data: IMoimForm) => {
    console.log(data); // data 확인
    console.log(options);

    const newDeadline =
      data.deadline.replace("T", " ").substring(0, 19) + ":00";

    const newData = {
      group: {
        ...data,
        deadline: newDeadline,
        groupLeader: userId,
        categoryNo: 1,
        status: "모집중",
      },
      options: options,
    };

    console.log(newData);

    // fetchGroup(Object(newData));

    fetch("http://i6e104.p.ssafy.io:8090/group/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((response) => response.json());
    // .then((result) => navigate(`/moim/${result}`));
    // .then((result) => navigate(`/moim/${result}`));
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
      <CreateOption />
      {options?.map((option) => (
        <Option key={option.id} {...option} />
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
