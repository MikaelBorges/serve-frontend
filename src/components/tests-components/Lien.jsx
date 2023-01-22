import styled from "styled-components";

export const Lien = styled.a.attrs(props => ({
  className: props.className,
  href: props.url,
  target: props.target,
  title: props.title,
}))``;
