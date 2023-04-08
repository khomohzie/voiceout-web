import styled from "styled-components";

interface JumbotronProp {
  ProgressBar?: React.ReactNode;
}

const Jumbotron = ({ ProgressBar }: JumbotronProp) => {
  return <Container>{ProgressBar}</Container>;
};

const Container = styled.div`
  padding: 12px;
  text-align: center;
`;

export default Jumbotron;
