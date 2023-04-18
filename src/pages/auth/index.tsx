import { AuthContext } from "context";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const AuthIndex = () => {
  const router = useRouter();

  // Redirect user to homepage if already logged in.
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  return <div>AuthIndex</div>;
};

export default AuthIndex;
