import styled from 'styled-components';

export const Nav =styled.nav`
  background:rgba(201, 201, 201, 0.22);
  filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.3));
  border-bottom:5px solid #37a29B;
  overflow-x:scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style:none;
`
export const ConditionsButton = styled.p`
  padding:10px 20px;
  margin:0 10px 0 0;
  font-size:12px;
  color:white;
  background-color:rgb(242, 137, 70);
  border-radius:0.35rem;
  &:hover{
    cursor: pointer;
  }
`
export const Heading = styled.h2`
margin-top:0;
color:rgba(246, 95, 117, 1);
`
export const SearchBtn = styled.p`
  position:fixed;
  top:92vh;
  left:40%;
  text-align:center;
  background-color:white;
  border:2px solid rgb(250, 87, 87);
  color:rgb(255, 75, 75);
  width:20%;
  border-radius:1.9rem;
  font-size:20px;
  margin:5px auto;
  padding:5px;
`
export const ShowandHide = styled.input`
  color:rgba(246, 95, 117, 1);
  background-color:white;
  border:none;
  &:hover{
    background-color:rgba(237, 237, 237, 0.6);
    color:rgb(255, 25, 25);
  }
`
export const InputForm = styled.input`
  height:100%;
  padding:0px 20px;
  font-size:14px;
  background-color:rgba(249, 249, 249, 0);
  border:0px;
`
export const Ul = styled.div`
  display:flex;
  list-style:none;
  margin:0;
  padding:10px;
  flex-wrap:nowrap;
  white-space: nowrap;
`
export const ConditionList = styled.p`
  color:rgb(242, 137, 70);
  padding:${(props) => props.padding};
  cursor: default;
  &:hover{
    background-color:rgba(237, 237, 237, 0.27);
  }
`
ConditionList.defaultProps = {
  padding:"0 0 0 20px",
}

export const Li = styled.div`
  display:block;
`
export const TextBox1 = styled.p`
  color:rgba(96, 96, 96, 0.8);
  padding:10px 20px;
  margin:0;
  font-size:14px;
  border:0;
  background-color:rgba(177, 99, 19, 0);
  &:hover{
    cursor: pointer;
  }

`
export const Select = styled.select`
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  text-dwcoration:none;
  font-size:14px;
  color:rgb(255, 75, 75);
  background-color:white;
  border-radius:0.45rem;
  border:solid 2px rgb(247, 123, 95);
  height:38px;
  text-align:center;
  margin-right:10px;
  padding: 0 10px;
`
Select.defaultProps = {
  backgroundColor:"white",
}

export const Option = styled.option`
background-color:white
&:active{
  background-color:red;
}
`
