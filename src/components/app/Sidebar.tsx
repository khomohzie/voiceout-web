import Link from "next/link";
import styled from "styled-components";
import { MdDashboard, MdSettings } from "react-icons/md";
import {
  FaArtstation,
  FaComment,
  FaLock,
  FaSeedling,
  FaUser,
} from "react-icons/fa";

interface LinkItemProp {
  itemName: string;
  page: string;
  icon: React.ReactElement;
  eqmIcon?: React.ReactElement;
  rightIcon?: boolean;
}

type ItemProp = {
  rightIcon?: boolean;
};

const LinkItem = ({
  itemName,
  page,
  icon,
  eqmIcon,
  rightIcon,
}: LinkItemProp) => {
  return (
    <LinkTo href={page}>
      <Item rightIcon={rightIcon}>
        {icon}
        <span>{itemName}</span>
        {eqmIcon}
      </Item>
    </LinkTo>
  );
};

const Sidebar = () => {
  return (
    <Container>
      <Logo>{process.env.NEXT_PUBLIC_APPNAME}</Logo>

      <LinkItem page="/" itemName="Dashboard" icon={<MdDashboard />} />
      <LinkItem page="/complaints" itemName="Complaints" icon={<FaComment />} />
      <LinkItem page="/admins" itemName="Administrators" icon={<FaUser />} />
      <LinkItem page="/" itemName="Settings" icon={<MdSettings />} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 10px 16px;
  min-height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  box-sizing: border-box;
  background: #3a4c54;

  @media (max-width: 500px) {
    width: 50px;
  }
`;

const Item = styled.div<ItemProp>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.rightIcon ? "#99CC00" : "#FCFCFC")};
  font-size: 22.5px;

  span {
    margin-left: 12px;
    font-size: ${(props) => (props.rightIcon ? "14px" : "12.5px")};
    letter-spacing: 0.02rem;
    margin-right: ${(props) => (props.rightIcon ? "auto" : "0")};

    @media (max-width: 500px) {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .rightIcon {
      display: none;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-self: center;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 48px;

  color: #29cc39;

  @media (max-width: 500px) {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  margin-bottom: 20px;

  :last-of-type {
    margin-top: 205px;
  }
`;

export default Sidebar;
