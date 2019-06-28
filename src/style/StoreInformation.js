import styled from 'styled-components';

export const Td = styled.td`
  border:solid 1px rgba(129, 129, 129, 0.42);
  padding:10px;
  width:60%;
`
export const Th = styled.th`
  border:solid 1px rgba(129, 129, 129, 0.42);
  padding:10px;
  width:30%;
`
export const Tr = styled.tr`
`
export const Table = styled.table`
  border:solid 1px rgba(129, 129, 129, 0.42);
  border-collapse: collapse;
`
export const Img =styled.div`
  background-image:url(${(props) => props.url});
  width:100%;
  margin:10px;
  background-size:cover;
`
Img.defaultProps = {
  width:"auto",
}
