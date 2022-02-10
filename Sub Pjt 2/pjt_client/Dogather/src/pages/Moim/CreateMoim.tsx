import styled from "styled-components";
import { useForm } from "react-hook-form";
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
              <select></select>
            </InputDiv>
            <ExpDiv>
              <Exp>
                상품과 맞지 않는 카테고리를 등록할 경우 강제 이동되거나 중지 및
                금지 될 수 있습니다.
              </Exp>
            </ExpDiv>
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
              <Exp>
                판매 상품과 직접 관련이 없는 다른 상품명, 스팸성 키워드 입력 시
                관리자에 의해 판매 금지될 수 있습니다.
                <br />
                유명 상품 유사문구를 무단으로 도용하여 ~스타일, ~st 등과 같이
                기재하는 경우 별도 고지 없이 제재될 수 있습니다.
                <br />
                상품명을 잘 맞게 입력하면 검색 노출에 도움이 될 수 있습니다.
              </Exp>
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
              <Exp>
                출시 가격 : 해당 상품의 정가
                <br />
                공구 가격 : 공동 구매 시 구매 또는 판매할 수 있는 가격
              </Exp>
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
              <Exp>
                공동구매를 함께 진행할 최대 인원수를 입력합니다.
                <br />
                인원이 모두 확보되면 공동구매 과정이 진행됩니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>모임 마감 날짜</span>
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
              <Exp>
                공동구매 인원 모집의 마감 날짜를 입력해 주시기 바랍니다.
                <br />
                시작 날짜는 모임 생성 시간으로 자동 적용됩니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>상품 상세 이미지 ({fileList ? fileList.length : 0})</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <ImgBox htmlFor="files">
                <ImgBoxInside>+</ImgBoxInside>
              </ImgBox>
              <Files type="file" id="files" multiple onChange={onChange} />
            </InputDiv>
            <ExpDiv>
              <Exp>
                상품 상세 내용을 보여줄 다수의 사진을 첨부해 주시기 바랍니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>상세 설명</span>
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
              <Exp>
                외부링크를 통한 개인정보(휴대폰 번호, 이메일 주소) 수집은
                금지되므로 등록시 노출이 제재될 수 있습니다.
                <br />
                상품명과 직접적 관련 없는 상세설명, 외부 링크 입력 시 관리자에
                의해 판매 금지 될 수 있습니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>링크</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <Input
                {...register("link", {
                  required: "필수 정보입니다.",
                })}
                placeholder="1개의 URL 입력"
                maxLength={4000}
              />
              <ErrorMessage>{errors?.link?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>
                해당 상품이나 업체의 정보를 확인할 수 있는 URL을 입력해주시기
                바랍니다.
                <br />
                최대 1개의 URL을 입력할 수 있으니 신중히 선택하시기 바랍니다.
                (추후 수정 가능)
              </Exp>
            </ExpDiv>
          </Block>
        </form>
        <Block>
          <InputTitle>
            <span>옵션</span>
          </InputTitle>
          <InputDiv>
            <CreateOption />
            {options?.map((option) => (
              <Option key={option.id} {...option} />
            ))}
          </InputDiv>
        </Block>
        <Block>
          <InputTitle>
            <span>FAQ</span>
          </InputTitle>
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

// 페이지 전체
const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
`;

// useForm + 다른 form 모두 포함
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
  font-weight: bold;
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

// 항목의 하위 항목
export const SubInputTopDiv = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid whitesmoke;
`;
const SubInputMiddleDiv = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid whitesmoke;
`;
export const SubInputBottomDiv = styled.div`
  display: flex;
  padding: 1rem 0 0 0;
`;
export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const MiniInput = styled.input`
  margin-right: 3px;
  width: 250px;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// 상세설명
const TextArea = styled.textarea`
  resize: none; // 크기 고정
  margin-bottom: 2px;
  width: 100%;
  height: 200px;
`;

// 에러 메시지
export const ErrorMessage = styled.span`
  margin-top: 3px;
  font-size: 11px;
  color: #ff5e57;
`;

// 참고
export const ExpDiv = styled.div`
  padding: 0 1rem 1rem 1rem; // 상우하좌
`;
export const Exp = styled.span`
  font-size: 11px;
  color: #808e9b;
`;

// 상품 상세 이미지
const Files = styled.input`
  display: none;
`;
const ImgBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border: 2px dotted #808e9b;
  cursor: pointer;
`;
const ImgBoxInside = styled.div`
  color: #808e9b;
  font-size: 70px;
`;

const Button = styled.button`
  margin-top: 35px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 55px;
  font-size: 18px;
  font-weight: bold;
  background-color: #1e272e;
  color: white;
  cursor: pointer;
`;

export default CreateMoim;
