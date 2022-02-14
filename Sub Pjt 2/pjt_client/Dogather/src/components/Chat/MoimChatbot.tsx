import styled from "styled-components";

function MoimChatbot() {
  return (
    <Wrap>
      <ChatTitle>1:1 Dogather Talk</ChatTitle>
      <Chatbox>
        <ChatMenuBox>
          <ChatMenuIconBox>sdsd</ChatMenuIconBox>
          <ChatMenuIconBox>sdsd</ChatMenuIconBox>
        </ChatMenuBox>
        <ChatTalkBox>

        </ChatTalkBox>
      </Chatbox>

    </Wrap>
  );
 }
 export default MoimChatbot;

 const Wrap = styled.div`
  background-color: #0d71bd;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 68px;
  margin: 0 auto;
  width: 100%;
  height: 700px;
`;

const Chatbox = styled.div`
  background-color: #8a19b0;
  display: flex;
  height: 100%;
`;

const ChatTitle = styled.div`
  background-color: #cd1a4a;
  display: flex;
  height: 60px;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  align-items: center;
`;

const ChatMenuBox = styled.div`
  background-color: #37b648;
  width: 280px;
  display: flex;
  flex-direction: column;
`;

const ChatMenuIconBox = styled.div`
  background-color: #80d4f9;
  display: flex;
  flex-direction: row;
  height: 80px;
  justify-content: center;
`;


const ChatTalkBox = styled.div`
  background-color: #145f91;
  flex-grow: 8;
  display: flex;
  justify-content: center;
`;