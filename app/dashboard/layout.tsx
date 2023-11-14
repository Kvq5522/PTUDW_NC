import { AuthGuard } from "@/components/Guard/AuthGuard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-center justify-center">
    <AuthGuard>
      {children}
    </AuthGuard>
  </div>;
}
