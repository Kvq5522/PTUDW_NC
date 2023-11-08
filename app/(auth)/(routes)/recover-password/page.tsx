import { RecoverPasswordForm } from "@/components/Form/AuthForm/RecoverPasswordForm"

export default function RecoverPassword() {
    return ( 
        <div className="flex justify-center items-center bg-gradient-to-r min-h-screen w-screen from-[#2E3192] to-[#1BFFFF]">
            <div className="bg-white p-3 rounded max-[1000px]:w-[90vw] max-[1200px]:w-[70vw] w-[60vw] max-[400px]:h-[90vh] max-[1000px]:h-[80vh] h-[60vh]">
                <RecoverPasswordForm className="h-full flex justify-center items-center" />
            </div>
        </div>
    )
};