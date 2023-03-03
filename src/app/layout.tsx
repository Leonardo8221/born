import AuthContext from "@/components/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContext>
        <body>{children}</body>
      </AuthContext>
    </html>
  );
}
