import LoginForm from "./LoginForm";
import TermsNotice from "../TermsNotice";
import JoinNowButton from "./JoinNowButton";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full min-h-screen">
      <div className="w-full sm:w-1/2 p-4 m-auto flex flex-col gap-5 items-center justify-center text-center">
        <h1 className="text-[#536B6F] text-4xl">
          Welcome to your professional network
        </h1>
        <LoginForm />
        <JoinNowButton />
        <TermsNotice />
      </div>

      <div className="relative w-full sm:w-1/2 h-40 sm:h-screen">
        <Image
          src="/loginPage.svg"
          alt="Login illustration"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
