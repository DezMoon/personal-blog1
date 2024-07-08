import Head from "next/head";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Personal Blog</title>
        <meta name="description" content="A personal blog built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Personal Blog</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2024 Nkhani Yanga</p>
      </footer>
    </div>
  );
}
