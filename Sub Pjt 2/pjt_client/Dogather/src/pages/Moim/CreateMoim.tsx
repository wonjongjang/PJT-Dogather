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
    handleSubmit,
    formState: { errors },
  } = useForm<IMoimForm>({ mode: "onChange" });

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
    console.log(newData);
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
          // navigate(`/moim/${String(result)}`);
          console.log(result);
        }
        // setOptions([]);
        // setFAQs([]);
      });
  };

  return (
    <Container>
      <FormContainer>
        <Block>
          <FormTitle>
            <span>모임 생성</span>
          </FormTitle>
        </Block>
        <form id="total" onSubmit={handleSubmit(onValid)}>
          <Block>
            <InputTitle>
              <span>카테고리</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <span>드롭박스 나중에 달기</span>
            </InputDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>제목 (상품명)</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <Input
                {...register("product", {
                  required: "필수 정보입니다.",
                })}
                autoFocus // 모임 생성 페이지 들어오면 입력할 수 있도록 설정
                placeholder="최대 50자 입력"
                maxLength={50}
              />
              <ErrorMessage>{errors?.product?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>설명</Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>가격</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <SubInputTopDiv>
                <SubTitle>
                  <span>출시 가격</span>
                  <Required>*</Required>
                </SubTitle>
                <div>
                  <MiniInput
                    {...register("originPrice", {
                      required: "필수 정보입니다.",
                    })}
                    type="number"
                    placeholder="숫자만 입력"
                  />
                  <ErrorMessage>{errors?.originPrice?.message}</ErrorMessage>
                </div>
              </SubInputTopDiv>
              <SubInputBottomDiv>
                <SubTitle>
                  <span>공구 가격</span>
                  <Required>*</Required>
                </SubTitle>
                <div>
                  <MiniInput
                    {...register("price", {
                      required: "필수 정보입니다.",
                    })}
                    type="number"
                    placeholder="숫자만 입력"
                  />
                  <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </div>
              </SubInputBottomDiv>
            </InputDiv>
            <ExpDiv>
              <Exp>설명</Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>모임 인원수</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <MiniInput
                {...register("maxPeople", {
                  required: "필수 정보입니다.",
                })}
                type="number"
                placeholder="숫자만 입력"
              />
              <ErrorMessage>{errors?.maxPeople?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>설명</Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>상품이미지</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <File type="file" multiple onChange={onChange} />
            </InputDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>상세설명</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <TextArea
                {...register("detail", {
                  required: "필수 정보입니다.",
                })}
              />
              <ErrorMessage>{errors?.detail?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>설명</Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>URL</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <Input
                {...register("link", {
                  required: "필수 정보입니다.",
                })}
              />
              <ErrorMessage>{errors?.link?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>설명</Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>공구 마감 날짜</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <Input
                {...register("deadline", {
                  required: "필수 정보입니다.",
                })}
                type="datetime-local"
              />
              <ErrorMessage>{errors?.deadline?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>설명</Exp>
            </ExpDiv>
          </Block>
        </form>
        <Block>
          <InputDiv>
            <CreateOption />
            {options?.map((option) => (
              <Option key={option.id} {...option} />
            ))}
          </InputDiv>
        </Block>
        <Block>
          <InputDiv>
            <CreateFAQ />
            {FAQs?.map((faq) => (
              <FAQ key={faq.id} {...faq} />
            ))}
          </InputDiv>
        </Block>
        <Button form="total">생성하기</Button>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
`;

const FormContainer = styled.div`
  width: 1280px;
  margin-top: 68px;
`;

const Block = styled.div`
  background-color: white;
  min-height: 50px;
  margin: 1rem;
`;

const FormTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 1rem;
`;

const InputTitle = styled.div`
  font-size: 16px;
  padding: 1rem;
  border-bottom: 1px solid whitesmoke;
`;

const Required = styled.span`
  font-size: 16px;
  color: #ff5e57;
  margin-left: 5px;
`;

const InputDiv = styled.div`
  padding: 1rem;
`;

const SubInputTopDiv = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid whitesmoke;
`;

const SubInputMiddleDiv = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid whitesmoke;
`;

const SubInputBottomDiv = styled.div`
  display: flex;
  padding: 1rem 0;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  font-size: 14px;
`;

const ExpDiv = styled.div`
  padding: 0 1rem 1rem 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const MiniInput = styled.input`
  margin-right: 3px;
  width: 250px;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TextArea = styled.textarea`
  resize: none; // 크기 고정
  margin-bottom: 2px;
  width: 100%;
  height: 200px;
`;

const File = styled.input`
  background-color: black;
`;

const ErrorMessage = styled.span`
  margin-top: 3px;
  font-size: 11px;
  color: #ff5e57;
`;

const Exp = styled.span`
  font-size: 11px;
  color: #485460;
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
