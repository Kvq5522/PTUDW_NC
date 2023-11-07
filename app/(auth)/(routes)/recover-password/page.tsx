import { RecoverPasswordForm } from "@/components/Form/AuthForm/RecoverPasswordForm"

export default function RecoverPassword() {
    return ( 
        <div className="flex justify-center items-center bg-gradient-to-r min-h-screen w-screen from-[#2E3192] to-[#1BFFFF]">
            <div className="bg-white w-[50vw] p-3 rounded h-[50vh]">
                <RecoverPasswordForm className="h-full flex justify-center items-center" />
            </div>
        </div>
    )
};