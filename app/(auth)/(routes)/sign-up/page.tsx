import { SignUpForm } from "@/components/Form/AuthForm/SignUpForm"

export default function SignUp() {
    return (
        <div className="flex justify-center items-center bg-gradient-to-r min-h-screen w-screen from-[#2E3192] to-[#1BFFFF]">
            <div className="bg-white max-[1000px]:w-[90vw] max-[1200px]:w-[70vw] w-[60vw] max-[400px]:h-[90vh] max-[1000px]:h-[80vh] h-[60vh] p-3 rounded">
                <SignUpForm className="h-[100%] flex justify-center items-center"/>
            </div>
        </div>
    )
};