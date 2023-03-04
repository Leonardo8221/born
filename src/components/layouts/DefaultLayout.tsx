import React from "react";

interface LayoutProps<T> {
  children: React.ReactNode;
}

export default function Layout<T>({ children }: LayoutProps<T>) {
  return (
    <>
      <h4>Header Goes Here</h4>
      <main>{children}</main>
      <h4>Footer Goes Here</h4>
    </>
  );
}
