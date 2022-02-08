import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {faAirFreshener, faBabyCarriage, faBaseballBall, faBook, faCar, faCarSide, faCouch, faDumbbell, faFemale, faGamepad, faGuitar, faMale, faPaw, faPills, faPizzaSlice, faPrescriptionBottle, faTabletAlt, faTshirt, faTv, faUtensils} from '@fortawesome/free-solid-svg-icons'



function Interest(){


    return (<Container>
        <Line>
            <Box><Clabel><FontAwesomeIcon icon={faTshirt} size="lg" fixedWidth/> 남성 패션</Clabel></Box><Checkbox value={"1"}/>
            <Box><Clabel><FontAwesomeIcon icon={faTshirt} size="lg" fixedWidth/> 여성 패션</Clabel></Box><Checkbox value={"2"}/>
            <Box><Clabel><FontAwesomeIcon icon={faAirFreshener} size="lg" fixedWidth/> 뷰티/미용</Clabel></Box><Checkbox value={"3"}/>
            <Box><Clabel><FontAwesomeIcon icon={faPizzaSlice} size="lg" fixedWidth/> 식품</Clabel></Box><Checkbox value={"4"}/>
        </Line>
        <Line>
            <Box><Clabel><FontAwesomeIcon icon={faPills} size="lg" fixedWidth/> 건강/약품</Clabel></Box><Checkbox value={"5"} />
            <Box><Clabel><FontAwesomeIcon icon={faTv} size="lg" fixedWidth/> 생활가전</Clabel></Box><Checkbox value={"6"}/>
            <Box><Clabel><FontAwesomeIcon icon={faTabletAlt} size="lg" fixedWidth/> 디지털기기</Clabel></Box><Checkbox value={"7"}/>
            <Box><Clabel><FontAwesomeIcon icon={faCouch} size="lg" fixedWidth/> 가구/인테리어</Clabel></Box><Checkbox value={"8"}/>
        </Line>
        <Line>
            <Box><Clabel><FontAwesomeIcon icon={faUtensils} size="lg" fixedWidth/> 생활용품</Clabel></Box><Checkbox value={"9"}/>
            <Box><Clabel><FontAwesomeIcon icon={faBook} size="lg" fixedWidth/> 도서/티켓</Clabel></Box><Checkbox value={"10"}/>
            <Box><Clabel><FontAwesomeIcon icon={faBabyCarriage} size="lg" fixedWidth/> 출산/유아동</Clabel></Box><Checkbox value={"11"}/>
            <Box><Clabel><FontAwesomeIcon icon={faPaw} size="lg" fixedWidth/> 펫용품</Clabel></Box><Checkbox value={"12"}/>
        </Line>
        <Line>
            <Box><Clabel><FontAwesomeIcon icon={faBaseballBall} size="lg" fixedWidth/> 스포츠/레저</Clabel></Box><Checkbox value={"13"} />
            <Box><Clabel><FontAwesomeIcon icon={faCarSide} size="lg" fixedWidth/> 자동차/공구</Clabel></Box><Checkbox value={"14"}/>
            <Box><Clabel><FontAwesomeIcon icon={faGuitar} size="lg" fixedWidth/> 악기</Clabel></Box><Checkbox value={"15"}/>
            <Box><Clabel><FontAwesomeIcon icon={faGamepad} size="lg" fixedWidth/> 게임/놀이</Clabel></Box><Checkbox value={"16"}/>      
        </Line>



      
    </Container>);
}
const Box = styled.span`
    width : 7rem;
    overflow : unset;
`;

const Line = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items:center;
    margin-top: 1rem;
`;

const Checkbox = styled.input.attrs({
    type: 'checkbox',
})`
    text-align:start;
    margin-left: 0px;
    height: 1rem;
    width: 2rem;
`;

const Clabel = styled.span`
    font-size : 0.8rem;
`;
const Container = styled.div`
    height : 10rem;
    width : 50rem;
    margin-left : 1rem;
    margin-right : 1rem;
    
`;
export default Interest;