import Jumbotron from "@components/app/Jumbotron";
import ProgressBar from "@components/app/ProgressBar";
import SignupWrapper from "@components/auth/signup/SignupWrapper";
import SuccessWrapper from "@components/auth/signup/SuccessWrapper";
import VerifyIdWrapper from "@components/auth/signup/VerifyIdWrapper";
import React, { useState } from "react";

const Signup = () => {
  // Keep track of the currently rendered form and completed form(s).
  const [active, setActive] = useState(1);
  const [completed, setCompleted] = useState([0]);

  const [step, setStep] = useState(1);
  // Store each form's values so they don't get erased until form is finally submitted.
  const [formData, setFormData] = useState<any>({});

  // Increase or decrease step count by 1 (Go to next or previous form/step). Mark a form as completed.
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const markComplete = (step: number) => {
    setCompleted([...completed, step]);
  };

  switch (step) {
    case 1:
      return (
        <>
          <Jumbotron
            ProgressBar={<ProgressBar active={active} completed={completed} />}
          />
          <SignupWrapper
            setActive={setActive}
            markComplete={markComplete}
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      );
    case 2:
      return (
        <>
          <Jumbotron
            ProgressBar={<ProgressBar active={active} completed={completed} />}
          />
          <VerifyIdWrapper
            setActive={setActive}
            markComplete={markComplete}
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      );
    case 3:
      return (
        <>
          <Jumbotron
            ProgressBar={<ProgressBar active={active} completed={completed} />}
          />
          <SuccessWrapper markComplete={markComplete} />
        </>
      );
  }
};

export default Signup;