import Loader from "@components/app/Loader";
import { BtnPrimary, Input } from "@styles/common";
import axios from "axios";
import { AuthContext } from "context";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import { toast } from "react-toastify";
import styled from "styled-components";

type Inputs = {
  email: string;
  password: string;
};

type TLoginForm = {
  staffLogin?: boolean;
};

const LoginForm = ({ staffLogin }: TLoginForm) => {
  const router = useRouter();

  // state access
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "all" });

  const password = useRef<string>();
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}${
          staffLogin ? `/auth/admin/login` : `/auth/superadmin/login`
        }`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success(data.message);

      dispatch!({
        type: "LOGIN",
        payload: data.data,
      });

      // save in local storage in order not to lose user data on page refresh
      window.localStorage.setItem("user", JSON.stringify(data.data));

      setLoading(false);

      router.push("/");
    } catch (error: any) {
      let isErrorArray = Array.isArray(error.response.data);

      if (isErrorArray) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(error.response.data.message);
      }

      setLoading(false);
    }
  };

  return (
    <Container>
      <PageTitle>
        Log in to <span>{process.env.NEXT_PUBLIC_APPNAME}</span>
      </PageTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            })}
          />
          {errors.email?.message === "Email is required" && (
            <span className="errors">
              <RiErrorWarningFill />
              Email is required
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
              required: "Password is required",
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

        <BtnPrimary
          type="submit"
          disabled={!isValid}
          style={{ marginTop: "24px" }}
        >
          {loading ? <Loader width={30} height={30} /> : "Login"}
        </BtnPrimary>

        <SigninText>
          Don't have an account yet?
          <Link href={staffLogin ? "/auth/login" : "/auth/university/login"}>
            {" "}
            Sign Up
          </Link>
        </SigninText>
      </form>
    </Container>
  );
};

const Container = styled.div`
  form {
    width: 100%;
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

export default LoginForm;
