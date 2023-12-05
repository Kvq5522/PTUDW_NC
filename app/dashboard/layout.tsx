import { AuthGuard } from "@/components/Guard/AuthGuard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-w-screen min-h-screen">
    <AuthGuard>
      {children}
    </AuthGuard>
  </div>;
}
