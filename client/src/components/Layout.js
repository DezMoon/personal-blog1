import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Personal Blog</title>
        <meta name="description" content="A personal blog built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Personal Blog</h1>
        {typeof window !== "undefined" && localStorage.getItem("token") && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2024 Nkhani Yanga</p>
      </footer>
    </div>
  );
}
