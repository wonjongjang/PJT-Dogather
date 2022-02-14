import { Container } from "@mui/material";
import styled from "styled-components";

function Error404() {
    return(
        <ErrContainer>
            
            <ErrorCode>
                4
            </ErrorCode>
            <Img src="/img/error.gif" alt="" />
            <ErrorCode>
                4
            </ErrorCode>
        </ErrContainer>
    ); 
}
const ErrorCode = styled.div`
    display: inline;
    font-size: 200px;
    color: #3458eb;
`;

const Img = styled.img`
    display: inline;
    height: 150px;
    border-radius: 50%;
    border: 15px solid #3458eb;
    /* border-top-left-radius:100px;
    border-end-end-radius:200px;
    border-start-end-radius: 200px;
    border-end-start-radius: 50px; */
`;

const ErrContainer = styled.div`
    margin: 200px auto;
    height: 500px;
    width: 1000px;
    border : 1px red dashed;
`;



export default Error404;