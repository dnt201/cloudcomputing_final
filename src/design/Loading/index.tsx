import { FC, Fragment } from "react";
import { keyframes } from "styled-components";
import tw from "twin.macro";
import styled from "styled-components";

const LoadingContainer = styled.div`
  ${tw`absolute`}
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingRotate = styled.div`
  ${tw`absolute rounded-full border-[6px] border-transparent border-t-gray-600 h-14 w-14 z-10`}
  animation: ${rotate} 2s linear infinite;
`;
const LoadingBox = styled.div`
  ${tw`rounded-full border-[6px] border-gray-100  h-14 w-14 z-10`}
`;

interface ILoading {}

const Loading: FC<ILoading> = () => {
  return (
    <LoadingContainer>
      <LoadingRotate></LoadingRotate>
      <LoadingBox></LoadingBox>
    </LoadingContainer>
  );
};

export default Loading;
