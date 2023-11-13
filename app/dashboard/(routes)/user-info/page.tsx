import { ProfileFrorm } from "@/components/Form/UserForm/ProfileForm";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r min-h-screen w-screen from-yellow-500 to-green-300">
      <div className="bg-white max-[1000px]:w-[90vw] max-[1200px]:w-[70vw] w-[60vw] h-fit p-3 rounded overflow-auto">
        <ProfileFrorm className="flex justify-center items-center" />
      </div>
    </div>
  );
}
