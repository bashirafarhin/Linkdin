import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  username: string;
}

interface Props {
  profile: UserProfile;
  isCurrentUser: boolean;
  currentProfileUsername: string;
}

export default function ProfileContent({
  profile,
  isCurrentUser,
  currentProfileUsername,
}: Props) {
  if (!profile) return <p className="text-gray-500">Loading profile...</p>;
  return (
    <div className="w-full sm:flex-1 max-w-2xl space-y-4">
      <ProfileInfo user={profile} isCurrentUser={isCurrentUser} />
      <ProfilePosts username={currentProfileUsername} />
    </div>
  );
}
