import { useState } from "react";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Img, setImg] = useState("");

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeContent = (event) => setContent(event.target.value);
  const onChangeImg = (event) => {
    setImg(event.target.files[0]);
  };
  const onSubmit = (event) => {
    const formData = new FormData();
    formData.append("file", Img);
    formData.append("title", title);
    formData.append("content", content);
    event.preventDefault();

    fetch("http://i6e104.p.ssafy.io:8090/board", {
      method: "POST",
      // data: formData,
      // headers: { "Content-Type": "multipart/form-data" },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BoardDto: { boardTitle: "4", boardContent: "4", writerNo: 2 },
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {});
  };
  return (
    <div>
      <p>버그방지</p>
      <p>버그방지</p>
      <p>버그방지</p>
      <p>버그방지</p>
      <p>버그방지</p>
      <form onSubmit={onSubmit} method="post">
        <input
          type="text"
          value={title}
          placeholder="제목"
          onChange={onChangeTitle}
        />
        <textarea
          value={content}
          placeholder="내용을 입력하세요."
          onChange={onChangeContent}
        />
        <input type="file" accept="image/*" id="file" onChange={onChangeImg} />
        <button>글쓰기</button>
      </form>
    </div>
  );
}
export default Write;
