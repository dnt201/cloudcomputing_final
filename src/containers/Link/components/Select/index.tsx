import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { ILanguage, languge } from "@common/constant/language";
import useToggleAndCloseVer2 from "src/hooks/useToggleAndCloseVer2";

const SelectContainer = styled.div`
  ${tw`relative mx-2 text-sm min-w-[180px]`}
`;
const TextBox = styled.div`
  ${tw`shadow rounded cursor-default`}
`;
const Text = styled.div`
  ${tw`py-2 pl-4`}
`;
const List = styled.ul`
  ${tw`absolute  bg-white shadow w-full max-h-[240px] overflow-y-scroll z-[999]`}

  /* width */
   ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const Item = styled.li`
  ${tw`py-2 pl-4 border-t hover:bg-gray-100 cursor-default`}
`;

interface ISelect {
  setSelect: Dispatch<SetStateAction<ILanguage | undefined>>;
}

const Select: FC<ISelect> = ({ setSelect }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [isActive, setIsActive] = useToggleAndCloseVer2(ref);
  const [selected, setSelected] = useState<ILanguage>(languge[74]);

  useEffect(() => {
    setSelect(selected);
  }, [selected]);

  const handleActive = () => {
    setIsActive(!isActive);
  };

  const handleSelect = (item: ILanguage) => {
    setSelected(item);
    setIsActive(false);
  };

  return (
    <SelectContainer>
      <TextBox onClick={handleActive}>
        <Text>{selected.Language}</Text>
      </TextBox>
      {isActive && (
        <List ref={ref}>
          {[...languge].slice(1).map((value) => (
            <Item onClick={() => handleSelect(value)} key={value.LanguageCode}>
              {value.Language}
            </Item>
          ))}
        </List>
      )}
    </SelectContainer>
  );
};

export default Select;
