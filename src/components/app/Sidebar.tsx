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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

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
  // state access
  const [user, setUser] = useState();

  const router = useRouter();

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (window.localStorage.getItem("user")?.length !== 0) {
        setUser(JSON.parse(window.localStorage.getItem("user")!));
      }
    }, []);
  }

  return (
    <Container>
      <Logo>{process.env.NEXT_PUBLIC_APPNAME}</Logo>

      <LinkItem page="/" itemName="Dashboard" icon={<MdDashboard />} />
      {(user as any)?.user?.id_photo_front && (
        <LinkItem
          page="/complaints"
          itemName="Complaints"
          icon={<FaComment />}
        />
      )}
      {!(user as any)?.user?.id_photo_front && (
        <LinkItem
          page="/complaints/admin"
          itemName="Complaints"
          icon={<FaComment />}
        />
      )}
      {(user as any)?.user?.id_photo_front && (
        <LinkItem page="/admins" itemName="Administrators" icon={<FaUser />} />
      )}
      <Link
        href="#"
        style={{ color: "white" }}
        onClick={async () => {
          try {
            const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_API}${
                (user as any)?.user?.id_photo_front
                  ? `/auth/logout/superadmin`
                  : `/auth/logout/admin`
              }`
            );

            toast.success(data.message);

            // save in local storage in order not to lose user data on page refresh
            window.localStorage.removeItem("user");

            if ((user as any)?.user?.id_photo_front) {
              router.push("/auth/university/login");
            } else {
              router.push("/auth/login");
            }
          } catch (error: any) {
            let isErrorArray = Array.isArray(error.response.data);

            if (isErrorArray) {
              toast.error(error.response.data.message[0]);
            } else {
              toast.error(error.response.data.message);
            }
          }
        }}
      >
        Logout
      </Link>
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
