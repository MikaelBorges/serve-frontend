import styled from "styled-components";

export const Ul = styled.ul.attrs(props => ({
  className: props.className,
}))`
  display: flex;
  justify-content: space-around;
`;

export const Li = styled.li.attrs(props => ({
  className: props.className,
}))`
  
`;
