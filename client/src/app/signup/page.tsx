import TermsNotice from "@/components/TermsNotice";
import RegisterForm from "./_components/RegisterForm";
import RegisterHeading from "./_components/RegisterHeading";
import AlreadyJoin from "./_components/AlreadyJoin";

const page = () => {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center text-center">
      <RegisterHeading />
      <RegisterForm />
      <AlreadyJoin />
      <TermsNotice />
    </div>
  );
};

export default page;
