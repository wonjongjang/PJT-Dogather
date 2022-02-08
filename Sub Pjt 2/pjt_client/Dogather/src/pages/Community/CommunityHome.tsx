import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IForm {
  boardTitle: string;
  boardContent: string;
}

function CommunityHome() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    console.log(event);
    console.log(files);
    if (files != null) {
      console.log(files[0].name);
    }
  };

  const onVaild = (data: IForm) => {
    console.log(data);

    const newData = {
      BoardDto: {
        ...data,
        writerNo: 1,
      },
      // files: {},
    };

    console.log(newData);

    fetch("http://i6e104.p.ssafy.io:8080/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      // .then((response) => response.json())
      .then((response) => console.log(response));
    // .then((result) => console.log(result));
  };

  return (
    <>
      <H1>CommunityHome</H1>
      <H1>CommunityHome</H1>
      <H1>CommunityHome</H1>
      <form onSubmit={handleSubmit(onVaild)}>
        <input {...register("boardTitle")} />
        <input {...register("boardContent")} />
        <input type="file" multiple onChange={onChange} />
        <button>작성</button>
      </form>
    </>
  );
}

const H1 = styled.h1`
  font-size: 48px;
  font-weight: bold;
`;

export default CommunityHome;
