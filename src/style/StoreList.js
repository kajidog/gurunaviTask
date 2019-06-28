import styled from 'styled-components';

export const LineElement = styled.div`
  border-collapse: collapse;
  width:80%;
  padding:10px 0;
  border-radius: 0.2rem
  margin:0 auto;
  text-align:center
  &:hover{
    background-color:rgba(232, 237, 255, 0.4);
    cursor : pointer;
  }
`
export const List = styled.div`
  padding:10px;
  margin:25px auto;
  width:80%;
  display:flex;
  flex-wrap:wrap;
  box-shadow:3px 3px 10px 2px rgba(170, 170, 170, 0.1);
  border-radius:0.65rem
`
export const Lists = styled.div`
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
  height:100%;
`

export const Img =styled.div`
  background-image:url(${(props) => props.url});
  width:${(props) => props.width};
  height:${(props) => props.width};
  margin:10px;
  padding: 0 30px;
  background-size:cover;
`
Img.defaultProps = {
  height:"auto",
}
export const StoreName =styled.h2`
  font-size:${(props) => props.size}
  border-left:5px solid rgba(255, 160, 82, 1);
  margin:10px 10px;
  display:block;
  padding:3px 10px;
`
Img.defaultProps = {
  height:"auto",
}

export const DetailsButton = styled.button`
  border:none;
  display:block;
  margin:10px auto;
  background-color:white;
  font-size:18px;
  color:rgba(55, 159, 255, 1);
`
export const Button = styled.button`
  background-color:white;
  border-radius:0.9rem;
  margin: 0 10px 10px 0;
  border:1px solid  rgb(255, 161, 62);
  color:rgb(255, 161, 62);

`
