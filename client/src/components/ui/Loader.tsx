import Logo from "./Logo";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <Logo size={34} />
      <div className="mt-6 w-24 h-1 bg-gray-200 overflow-hidden rounded-full">
        <div className="h-full bg-blue-600 animate-loader-bar" />
      </div>
    </div>
  );
}
