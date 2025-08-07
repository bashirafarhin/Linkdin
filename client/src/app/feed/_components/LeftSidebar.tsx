// export default function LeftSidebar() {
//   return (
//     <div className="border border-gray-200 bg-white rounded-lg shadow p-4 space-y-4">
//       <div className="mt-2">
//         <div className="font-semibold">Bashira Farhin</div>
//         <div className="text-sm text-gray-500">
//           Ex-SDE Intern | MERN Developer
//         </div>
//       </div>

//       <div className="border-t pt-2 text-sm text-gray-600">
//         <p>
//           Profile viewers: <span className="text-blue-600">108</span>
//         </p>
//         <p>
//           Post impressions: <span className="text-blue-600">28</span>
//         </p>
//       </div>

//       <button className="w-full py-2 bg-yellow-100 text-sm rounded">
//         Try for ₹0
//       </button>
//     </div>
//   );
// }
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";

export default function LeftSidebar() {
  const router = useRouter();
  const { data: user } = useSelector((state: RootState) => state.user);

  const fullName = user?.name;
  const bio =
    user?.bio ||
    "Your bio will appear here. Update it in your profile settings.";

  const handleCLick = () => {
    router.push(`/in/${user?.username}`);
  };

  return (
    <div className="border border-gray-200 bg-white rounded-lg shadow p-4 space-y-4">
      <div className="mt-2">
        <button onClick={handleCLick}>
          <div className="font-semibold">{fullName}</div>
        </button>
        <div className="text-sm text-gray-500">{bio}</div>
      </div>

      <div className="border-t pt-2 text-sm text-gray-600">
        <p>
          Profile viewers: <span className="text-blue-600">108</span>
        </p>
        <p>
          Post impressions: <span className="text-blue-600">28</span>
        </p>
      </div>

      <button className="w-full py-2 bg-yellow-100 text-sm rounded">
        Try for ₹0
      </button>
    </div>
  );
}
