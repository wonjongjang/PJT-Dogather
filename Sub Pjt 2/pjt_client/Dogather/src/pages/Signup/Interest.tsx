import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {faCar, faDumbbell, faPaw, faTshirt, faTv} from '@fortawesome/free-solid-svg-icons'



function Interest(){


    return (<Container>
        <Line>
            <span><Clabel><FontAwesomeIcon icon={faTshirt}/></Clabel><Checkbox value={"1"} /></span>
            <span><Clabel><FontAwesomeIcon icon={faTv}/></Clabel><Checkbox/></span>
            <span><Clabel><FontAwesomeIcon icon={faCar}/></Clabel><Checkbox/></span>
            <span><Clabel><FontAwesomeIcon icon={faDumbbell}/></Clabel><Checkbox/></span>
            <span><Clabel><FontAwesomeIcon icon={faPaw}/></Clabel><Checkbox/></span>       
        </Line>



      
    </Container>);
}
const Line = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items:center;
    margin-top: 1rem;
`;


const Checkbox = styled.input.attrs({
    type: 'checkbox',
})`
    height: 0.8rem;
    width: 0.8rem;
`;

const Clabel = styled.span`
    font-size : 1rem;
`;
const Container = styled.div`
    border : black dashed 1px;
    height : 10rem;
    width : 70%;
    margin-left : 15%;
    margin-right : 15%;
    
`;
export default Interest;