import {
  useReducer,
  createContext,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type TContext = {
  user?: any | null;
  state?: any;
  dispatch?: Dispatch<{ type: string; payload?: any }>;
};

// Initial state
const initialState = {
  user: null,
};

// Create context
const AuthContext = createContext<TContext>(initialState);

// root reducer
const rootReducer = (state: any, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

// Context provider
const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const router = useRouter();

  useEffect(() => {
    return dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")!),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lies within the range of 2xx will cause this function to trigger
      return response;
    }
    // function (error) {
    //   // Any status code that falls outside the range of 2xx will cause this function to trigger
    //   let res = error.response;
    //   if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    //     return new Promise((resolve, reject) => {
    //       axios
    //         .get("/api/logout")
    //         .then((data) => {
    //           console.log("/401 error > logout");
    //           toast.error("Unauthorized user! Please login.");
    //           dispatch({ type: "LOGOUT" });
    //           window.localStorage.removeItem("user");
    //           router.push("/auth/login");
    //         })
    //         .catch((error) => {
    //           console.log("AXIOS INTERCEPTORS ERROR: ", error);
    //           reject(error);
    //         });
    //     });
    //   }

    //   return Promise.reject(error);
    // }
  );

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, Provider };
