import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../assets/css/page.module.css";

export default function Home() {
  const { data: session, status } = useSession();
  console.log({ session });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className={styles.main}>
        <div className={styles.heading}>You need to log in first</div>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <p className={styles.heading}>Hello, {session?.user?.name}!</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
