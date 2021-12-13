import Link from "@design/Link";
import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const HeaderContainer = styled.div`
  ${tw`py-3 bg-blue-500 shadow`}
`;
const HeaderBox = styled.div`
  ${tw`container mx-auto flex justify-between items-center`}
`;
const Logo = styled.h1`
  ${tw`text-2xl font-extrabold text-white`}
`;
const Nav = styled.div`
  ${tw``}
`;
const NavList = styled.ul`
  ${tw`flex gap-8`}
`;
const NavItem = styled.li`
  ${tw`text-white`}
`;
const NavText = styled.span`
  ${tw``}
`;

interface IHeader {}

const Header: FC<IHeader> = () => {
  return (
    <HeaderContainer>
      <HeaderBox>
        <Logo>UTE Translate</Logo>
        <Nav>
          <NavList>
            <NavItem>
              <Link href="/">
                <NavText>Translate Text</NavText>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/link">
                <NavText>Translate Link</NavText>
              </Link>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderBox>
    </HeaderContainer>
  );
};

export default Header;
