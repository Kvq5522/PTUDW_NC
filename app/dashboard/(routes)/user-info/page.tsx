import { ProfileForm } from "@/components/Form/UserForm/ProfileForm";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r h-full w-full  from-yellow-500 to-green-300">
      <div className="bg-white max-[1000px]:w-[90%] max-[1200px]:w-[70%] w-[60%] h-fit p-3 rounded">
        <ProfileForm className="flex justify-center items-center" />
      </div>
    </div>
  );
}
