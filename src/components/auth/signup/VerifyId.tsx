import React, { useState } from "react";
import styled from "styled-components";
import { BiCloudUpload } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { BtnPrimary } from "@styles/common";
import { useForm, SubmitHandler } from "react-hook-form";

type TInput = {
  frontId: File[];
  backId: File[];
};

type Props = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
  markComplete: Function;
  nextStep: Function;
  prevStep: Function;
};

const VerifyId = ({ setActive, markComplete, nextStep, prevStep }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TInput>({ mode: "all" });

  const [frontFileName, setFrontFileName] = useState("");
  const [backFileName, setBackFileName] = useState("");

  const onSubmit: SubmitHandler<TInput> = async (data) => {
    console.log(data);

    setActive(3);
    markComplete(2);
    // nextStep();
  };

  return (
    <Container>
      <AppName>VoiceOut</AppName>

      <Title>Verification details</Title>

      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <UploadWrapper className="left_upload__wrapper">
          <ImageContainer>
            <input
              type="file"
              id="file"
              accept=".jpg,.png"
              {...register("frontId", {
                required: "Upload valid image",
                validate: (file) => {
                  if (file[0].size > 1e6) {
                    console.log(file[0].size);
                    return "Image size is too large.";
                  }
                },
                onChange(event) {
                  const file = event.target.files[0];

                  setFrontFileName(file.name);
                },
              })}
            />
            <img src="/images/photoid.png" alt="photo icon" />
            <SideName>Front ID Picture</SideName>
            <Description>Upload the front picture of your work ID.</Description>
            <UploadIcon>
              <BiCloudUpload />
            </UploadIcon>
          </ImageContainer>

          <p className="warning">Image size not more than 1mb.</p>

          {frontFileName && (
            <UploadedInfo>
              {frontFileName} <MdCancel color="#FF4142" />
            </UploadedInfo>
          )}

          {errors.frontId && (
            <span className="errors">{errors.frontId.message}</span>
          )}
        </UploadWrapper>

        <UploadWrapper>
          <ImageContainer>
            <input
              type="file"
              id="file"
              accept=".jpg,.png"
              {...register("backId", {
                required: "Upload valid image",
                validate: (file) => {
                  if (file[0].size > 1e6) {
                    return "Image size is too large.";
                  }
                },
                onChange(event) {
                  const file = event.target.files[0];

                  setBackFileName(file.name);
                },
              })}
            />
            <img src="/images/photoid.png" alt="photo icon" />
            <SideName>Back ID Picture</SideName>
            <Description>Upload the back picture of your work ID.</Description>
            <UploadIcon>
              <BiCloudUpload />
            </UploadIcon>
          </ImageContainer>

          <p className="warning">Image size not more than 1mb.</p>

          {backFileName && (
            <UploadedInfo>
              {backFileName} <MdCancel color="#FF4142" />
            </UploadedInfo>
          )}

          {errors.backId && (
            <span className="errors">{errors.backId.message}</span>
          )}
        </UploadWrapper>

        <ButtonWrapper>
          <div className="button">
            <BtnPrimary secondary={true} onClick={() => prevStep()}>
              Previous
            </BtnPrimary>
          </div>
          <div className="button">
            <BtnPrimary type="submit" disabled={!isValid}>
              Submit
            </BtnPrimary>
          </div>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  p.warning {
    margin-top: 24px;
    font-weight: 400;
    font-size: 12px;
    line-height: 7px;
    color: #535353;
  }
`;

const Wrapper = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .left_upload__wrapper {
    margin-right: 24px;

    @media (max-width: 476px) {
      margin-right: 0;
    }
  }

  div.button {
    margin: 24px 0;
  }

  @media (max-width: 476px) {
    display: block;
  }
`;

const UploadWrapper = styled.div`
  .errors {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    color: #e85050;
  }
`;

const AppName = styled.h1`
  font-weight: 500;
  font-size: 30px;
  line-height: 39px;
  color: #29cc39;
`;

const Title = styled.h1`
  margin-top: 70px;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
  color: #202124;
`;

const ImageContainer = styled.div`
  position: relative;
  width: min-width(100%, 200px);
  height: 190.5px;
  margin-top: 24px;
  padding-top: 16px;
  box-sizing: border-box;
  text-align: center;

  background: #29cc39;
  border-radius: 5px;

  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
`;

const SideName = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
`;

const UploadIcon = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 30px;
  height: 29px;
  bottom: -15px;
  right: 0px;
  background: #ffffff;
  border: 0.5px solid #00154f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UploadedInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  word-break: break-all;
  margin-top: 24px;
  padding: 8px 25px;
  max-width: 200px;
  box-sizing: border-box;
  background: rgba(99, 191, 84, 0.2);
  border: 1px solid rgba(99, 191, 84, 0.7);
  border-radius: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 9px;
  color: #202124;
`;

const ButtonWrapper = styled.div`
  grid-column: 1 / 3;
  text-align: center;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default VerifyId;
