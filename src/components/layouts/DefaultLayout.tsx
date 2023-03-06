import React from "react";

interface LayoutProps<T> {
  children: React.ReactNode;
}

export default function Layout<T>({ children }: LayoutProps<T>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
