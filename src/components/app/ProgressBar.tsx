import { useEffect } from "react";
import styled from "styled-components";

type ProgressBarProps = {
  active: number;
  completed: number[];
};

const ProgressBar = ({ active, completed }: ProgressBarProps) => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const progress = document.getElementById("progress");

      if (progress) progress.style.width = ((active - 1) / 2) * 100 + "%";
    }
  }, [active]);

  return (
    <ProgressContainer>
      <div id="progress"></div>

      <Progress
        className={`${active === 1 ? "active" : ""} ${
          completed.includes(1) ? "completed" : ""
        }`}
      ></Progress>
      <Progress
        className={`${active === 2 ? "active" : ""} ${
          completed.includes(2) ? "completed" : ""
        }`}
      ></Progress>
      <Progress
        className={`${active === 3 ? "active" : ""} ${
          completed.includes(3) ? "completed" : ""
        }`}
      ></Progress>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: min(100%, 300px);
  margin: auto;
  box-sizing: border-box;
  counter-reset: step;

  ::before,
  #progress {
    content: "";
    position: absolute;
    top: 50%;
    height: 2px;
    width: 100%;
    transform: translateY(-50%);
    background: #dcdcdc;
  }

  #progress {
    background: #0f1e28;
    width: 0;
    transition: 0.3s;
  }

  .active {
    background: #0f1e28;
    color: #fcfcfc;
  }

  .completed,
  .completed::before {
    content: url("/images/tick.png");
    counter-increment: step;
    background: #29cc39;
    padding: 6px;
    transition: 0.3s linear;
    user-select: none;
  }
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #dcdcdc;
  border-radius: 50%;
  z-index: 9999;
  color: #aeaeb3;

  ::before {
    counter-increment: step;
    content: counter(step);
    font-size: 20px;
    font-weight: 600;
  }
`;

export default ProgressBar;
