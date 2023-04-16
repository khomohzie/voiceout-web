import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { BtnPrimary, Input, Select } from "@styles/common";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import Link from "next/link";

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  university: string;
  office: string;
  password: string;
  confirmPassword: string;
  gender: string;
  checkConfirm: boolean;
};

type Props = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
  markComplete: Function;
  nextStep: Function;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const SignupForm = ({
  setActive,
  markComplete,
  nextStep,
  formData,
  setFormData,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "all", defaultValues: formData });

  const password = useRef<string>();
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    setFormData(data);

    setActive(2);
    markComplete(1);
    nextStep();
  };

  return (
    <Container>
      <PageTitle>
        Sign up to <span>VoiceOut</span>
      </PageTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <FieldName>
            First Name<span>*</span>
          </FieldName>
          <Input
            type="text"
            className={errors.firstname && "input_error"}
            placeholder="Philips"
            {...register("firstname", {
              required: "Enter valid name",
            })}
          />
          {errors.firstname && (
            <span className="errors">
              <RiErrorWarningFill />
              {errors.firstname.message}
            </span>
          )}
        </InputContainer>

        <InputContainer>
          <FieldName>
            Last Name<span>*</span>
          </FieldName>
          <Input
            type="text"
            className={errors.lastname && "input_error"}
            placeholder="Dankano"
            {...register("lastname", {
              required: "Enter valid name",
            })}
          />
          {errors.lastname && (
            <span className="errors">
              <RiErrorWarningFill />
              {errors.lastname.message}
            </span>
          )}
        </InputContainer>

        <InputContainer>
          <FieldName>
            Email<span>*</span>
          </FieldName>
          <Input
            className={errors.email && "input_error"}
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email?.message === "Email is required" && (
            <span className="errors">
              <RiErrorWarningFill />
              Email is required
            </span>
          )}
          {errors.email && errors.email.message !== "Email is required" && (
            <div className="requirements">
              <RiErrorWarningFill />
              {errors.email?.message}
            </div>
          )}
        </InputContainer>

        <InputContainer>
          <FieldName>
            Phone<span>*</span>
          </FieldName>
          <Input
            type="text"
            className={errors.phone && "input_error"}
            placeholder="+23412345678"
            {...register("phone", {
              required: "Enter phone number",
            })}
          />
          {errors.phone && (
            <span className="errors">
              <RiErrorWarningFill />
              {errors.phone.message}
            </span>
          )}
        </InputContainer>

        <InputContainer>
          <FieldName>
            University<span>*</span>
          </FieldName>
          <Input
            type="text"
            className={errors.university && "input_error"}
            placeholder="e.g Babcock University"
            {...register("university", {
              required: "Enter university exactly in the format provided",
              validate: (value) => {
                if (!/^([A-Z][a-z]*)+(\s[A-Z][a-z]*)*$/.test(value)) {
                  return "Ensure that the first letter of each word is uppercase.";
                }
              },
            })}
          />
          {errors.university && (
            <span className="errors">
              <RiErrorWarningFill />
              {errors.university.message}
            </span>
          )}
        </InputContainer>

        <InputContainer>
          <FieldName>
            Job Title<span>*</span>
          </FieldName>
          <Input
            type="text"
            className={errors.office && "input_error"}
            placeholder="Vice Chancellor"
            {...register("office", {
              required: "What is your job title?",
            })}
          />
          {errors.office && (
            <span className="errors">
              <RiErrorWarningFill />
              {errors.office.message}
            </span>
          )}
        </InputContainer>

        <InputContainer>
          <FieldName>
            Password<span>*</span>
          </FieldName>
          <Input
            className={errors.password && "input_error"}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
              validate: (value) => {
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain a uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain a number";
                }
                if (!/[^a-zA-Z0-9]/.test(value)) {
                  return "Password must contain a special character";
                }
              },
            })}
          />
          <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize="18px" />
            ) : (
              <AiOutlineEye fontSize="18px" />
            )}
          </EyeIcon>
          {errors.password && (
            <div className="requirements">{errors.password.message}</div>
          )}
        </InputContainer>

        <InputContainer>
          <FieldName>
            Confirm Password<span>*</span>
          </FieldName>
          <Input
            className={errors.confirmPassword && "input_error"}
            type={showConPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
          <EyeIcon onClick={() => setShowConPassword(!showConPassword)}>
            {showConPassword ? (
              <AiOutlineEyeInvisible fontSize="18px" />
            ) : (
              <AiOutlineEye fontSize="18px" />
            )}
          </EyeIcon>
          {errors.confirmPassword && (
            <div className="requirements">{errors.confirmPassword.message}</div>
          )}
        </InputContainer>

        <InputContainer>
          <FieldName>
            Gender<span>*</span>
          </FieldName>
          <Select
            required
            {...register("gender", {
              required: "this is required",
            })}
          >
            <option value="">Select</option>
            <option value={"male"}>male</option>
            <option value={"female"}>female</option>
          </Select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </InputContainer>

        <InputContainer className="checkbox">
          <label htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              {...register("checkConfirm", { required: true })}
            />{" "}
            <span className="terms">
              Creating an account means you’re okay with our{" "}
              <span>Terms of Service, Privacy Policy</span>, and our default{" "}
              <span>Notification Settings</span>.{" "}
            </span>
          </label>
        </InputContainer>

        <BtnPrimary type="submit" disabled={!isValid}>
          Create Account
        </BtnPrimary>

        <SigninText>
          Already a member?
          <Link href="/auth/login"> Sign In</Link>
        </SigninText>
      </form>
    </Container>
  );
};

const Container = styled.div`
  form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

    @media (max-width: 476px) {
      display: block;
    }
  }

  .checkbox {
    grid-column: 1;

    @media (max-width: 476px) {
      margin: 16px 0;
    }
  }
`;

const PageTitle = styled.p`
  font-family: "Poppins";
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;

  color: #444444;

  span {
    color: #29cc39;
  }
`;

const InputContainer = styled.div`
  span {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;

    color: #686868;

    span {
      color: #29cc39;
    }
  }

  .input_error {
    border: 1px solid #f93737;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.07);
  }

  .errors {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    color: #e85050;
  }

  .requirements {
    padding: 16px 0 0;
    max-height: 200px;
    overflow: hidden;
    color: #f93737;
    font-style: italic;
    font-size: 14px;
  }

  .input_error:not(:focus):not(:placeholder-shown) {
    background: pink;
  }
`;

const FieldName = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 7px;

  span {
    color: red;
  }
`;

const SigninText = styled.p`
  justify-self: right;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;

  color: #686868;

  a {
    color: #29cc39;
  }
`;

const EyeIcon = styled.span`
  float: right;
  margin-right: 10px;
  margin-top: -30px;
  position: relative;
`;

export default SignupForm;
