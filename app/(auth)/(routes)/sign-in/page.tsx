import { SignInForm } from "@/components/Form/AuthForm/SignInForm"

export default function SignIn() {
    return ( 
        <div className="flex justify-center items-center bg-gradient-to-r min-h-screen w-screen from-[#2E3192] to-[#1BFFFF]">
            <div className="bg-white w-[50vw] p-3 rounded h-[50vh]">
                <SignInForm className="h-full flex justify-center items-center" />
            </div>
        </div>
    )
};