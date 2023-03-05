import AuthContext from "../components/AuthContext";
import "../assets/css/global.css";

export const metadata = {
  title: "Dashborad",
};

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
