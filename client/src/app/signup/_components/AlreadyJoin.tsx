import Link from "next/link";

const AlreadyJoin = () => {
  return (
    <span>
      Already on LinkedIn?{" "}
      <Link href="/">
        <span className="text-blue-600 hover:underline cursor-pointer">
          Sign in
        </span>
      </Link>
    </span>
  );
};

export default AlreadyJoin;
