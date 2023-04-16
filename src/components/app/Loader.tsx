import React from "react";
import styled from "styled-components";

type TLoader = {
  width: number;
  height: number;
};

const Loader = (props: TLoader) => {
  return (
    <Container width={props.width} height={props.height}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

const Container = styled.div<TLoader>`
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => (props.width ? `${props.width}px` : "80px")};
    height: ${(props) => (props.height ? `${props.height}px` : "80px")};
    margin: 8px;
    border: 4px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
