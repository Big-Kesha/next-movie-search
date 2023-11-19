import styles from './Layout.module.sass'
import Footer from "./Footer/Footer"
import Header from "./Header/Header"

export default function Layout({
  children
} : {
  children: React.ReactNode
}) {
  
  return <div className={styles.layout}>
    <Header />
    <main className={styles.main}>
      {children}
    </main>
    <Footer />
  </div>
}