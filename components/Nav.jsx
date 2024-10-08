"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])

  return (
    <nav className="nav flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} alt="Logo" />
        <p className="logo_text">GetPrompted</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              <p className="nav_text">Create Post</p>
            </Link>
            <Link href="/" className="outline_btn" onClick={signOut}>
              <p className="nav_text">Sign out</p>
            </Link>
            <Link href="/profile" className="flex-center">
              <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile"/>
            </Link>
          </div>
        ):(
          <>
          {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
          ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={session.user.image} width={37} height={37} className="rounded-full" alt="profile" onClick={() => 
              setToggleDropdown((prev) => !prev)}/>
            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Post</Link>
                <button className="dropdown_link" href={'/'} onClick={() => {
                  setToggleDropdown(false)
                  signOut()
                }}>Sign Out</button>
              </div>
            )}  
          </div>
        ) : (
          <>
          {providers && Object.values(providers).map((provider) => (
              <button
              type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
          ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
