"use client";

import styles from "./page.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div className={styles.heading}>You need to log in first</div>;
  }

  return (
    <div className={styles.main}>
      <p className={styles.heading}>Hello, {session?.user?.name}!</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
