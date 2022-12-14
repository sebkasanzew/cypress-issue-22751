import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { status } = useSession({
    required: true,
  })

  const [cookieLengths, setCookieLengths] = useState<Record<string, number>>({})

  function handleClick() {
    fetch('/api/cookies').then(response => response.json()).then(api => {
      setCookieLengths(api)
    })
  }

  function handleLogout() {
    signOut()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        {status === 'loading' ?
          <h1 className={styles.title}>
            Loading or not authenticated...
          </h1>
          :
          <>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <button className={styles.button} onClick={handleClick}>Request Cookies</button>

            {Object.keys(cookieLengths).map(cookieName => (
              <div key={cookieName} id={cookieName}>{cookieName}: {cookieLengths[cookieName]}</div>
            ))}

            <button onClick={handleLogout} style={{ margin: '20px' }}>Logout</button>
          </>
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
