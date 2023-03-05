import clsx from 'clsx';
import localFont from 'next/font/local';
import AuthContext from "@/components/AuthContext";
import './globals.css';

const primaryFont: any = localFont({
  src: [
    {
      path: '../assets/fonts/untitled-sans-black.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/untitled-sans-bold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/untitled-sans-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/untitled-sans-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/untitled-sans-light.otf',
      weight: '300',
      style: 'normal',
    }
  ],
  variable: '--font-primary'
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContext>
        <body className={clsx(primaryFont.variable, 'font-sans')}>{children}</body>
      </AuthContext>
    </html>
  );
}
