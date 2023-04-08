import styled from "styled-components";

type ButtonProps = {
  marginTop?: string;
  secondary?: boolean;
};

export const Input = styled.input`
  width: 100%;
  padding: 7px 10px;
  border: 2px solid transparent;
  outline-color: #29cc39;
  background: rgba(196, 196, 196, 0.27);
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #444444;

  ::placeholder {
    color: #b5b5b5;
  }
`;

export const BtnPrimary = styled.button<ButtonProps>`
  width: fit-content;
  padding: 6px 26px;
  margin: ${(props) => (props.marginTop ? props.marginTop : "auto")} 0 0;
  background: ${(props) => (props.secondary ? "#0E1E28" : "#29cc39")};
  border: 4px solid transparent;
  grid-column: 1;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  color: #ffffff;

  :not(:disabled):hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }

  :disabled {
    background: #71ef7e;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 7px 10px;
  border: 2px solid transparent;
  background: rgba(196, 196, 196, 0.27);
  outline-color: #29cc39;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #444444;

  option {
    color: #3e4e54;
  }
`;
