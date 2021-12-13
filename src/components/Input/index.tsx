import {
  ChangeEvent,
  FC,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
} from "react";
import Loading from "@design/Loading";
import tw from "twin.macro";
import styled from "styled-components";
import Control from "./components/Control";
import TextareaAutosize from "react-textarea-autosize";

const InputContainer = styled.div`
  ${tw`min-h-[360px] border shadow-lg rounded-xl `}
`;
const InputBox = styled.div`
  ${tw`h-full flex flex-col`}
`;
const InputMain = styled.div`
  ${tw`relative flex-grow`}
`;
const InputText = styled(TextareaAutosize)<{ resize: boolean }>`
  ${tw`w-full h-full outline-none p-4 text-lg font-medium text-gray-600`}
  resize: ${({ resize }) => (resize ? "vertical" : "none")};
  min-height: 100%;
`;

interface IInput {
  micIcon?: boolean;
  volIcon?: any;
  imageIcon?: any;
  resize?: boolean;
  eventPoiter?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  loading?: boolean;
}

const Input: FC<IInput> = ({
  micIcon,
  volIcon,
  imageIcon,
  resize = false,
  eventPoiter = false,
  placeholder = "...",
  onChange = () => {},
  value,
  loading = false,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <InputContainer>
      <InputBox>
        <InputMain>
          <InputText
            ref={ref}
            value={value}
            disabled={eventPoiter}
            resize={resize}
            onChange={onChange}
            placeholder={placeholder}
          />

          {loading && <Loading />}
        </InputMain>
        <Control imageIcon={imageIcon} micIcon={micIcon} volIcon={volIcon} />
      </InputBox>
    </InputContainer>
  );
};

export default Input;
