declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: number;
      NEXT_PUBLIC_API: string;
      NEXT_PUBLIC_APPNAME: string;
    }
  }
}

export {};
