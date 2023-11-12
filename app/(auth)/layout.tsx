export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center">{children}</div>
      </body>
    </html>
  );
}
