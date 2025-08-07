import Image from "next/image";

export default function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
      <Image
        width={10}
        height={10}
        priority
        src="/user.png" // Replace with dynamic image if needed
        alt={name || "user"}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
