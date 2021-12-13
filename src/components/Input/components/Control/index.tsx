import { Image, Microphone2, VolumeHigh } from "iconsax-react";
import { FC } from "react";
import tw from "twin.macro";
import styled from "styled-components";

const ControlContainer = styled.div`
  ${tw`w-full h-16`}
`;
const ControlBox = styled.div`
  ${tw`bg-gray-100 h-full flex justify-between px-4 items-center`}
`;

const ControlLeft = styled.div`
  ${tw`flex gap-4`}
`;
const ControlRight = styled.div`
  ${tw``}
`;
const IconBox = styled.div`
  ${tw`shadow p-2 rounded-full`}
`;

interface IControl {
  micIcon?: boolean;
  volIcon?: any;
  imageIcon?: any;
}

const Control: FC<IControl> = ({ micIcon, volIcon, imageIcon }) => {
  return (
    <ControlContainer>
      <ControlBox>
        <ControlLeft>
          {micIcon && (
            <IconBox>
              <Microphone2 size="28" color="#535353" />
            </IconBox>
          )}
          {volIcon && (
            <IconBox>
              <VolumeHigh onClick={volIcon} size="28" color="#535353" />
            </IconBox>
          )}
        </ControlLeft>
        <ControlRight>
          {imageIcon && (
            <IconBox>
              <Image onClick={imageIcon} size="28" color="#535353" />
            </IconBox>
          )}
        </ControlRight>
      </ControlBox>
    </ControlContainer>
  );
};

export default Control;
