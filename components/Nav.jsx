"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { faUser, faSquarePlus, faBars, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = () => {
  // const isUserLoggedIn = true;

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center' >
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt"
              className='black_btn'>Create Post </Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href="/profile" >
              <Image
                src="/assets/images/logo.svg"
                alt="Profile"
                width={37}
                height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button type='button'
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className='black_btn'>
                  Sign In
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src="/assets/images/logo.svg" alt="Profile"
              width={37}
              height={37}
              className='rounded-full'
              // onClick={() => setToggleDropdown((prev) => !prev)} />
            />
            <span style={{ marginRight: '10px', marginLeft: '10px' }}
              width={37}
              height={37}
              className='rounded-full'
              onClick={() => setToggleDropdown((prev) => !prev)}>
              <FontAwesomeIcon icon={faBars} />
            </span>

            {toggleDropdown && (
              <div className="dropdown text-left">
                <Link href="/profile"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                  <span style={{ marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faUser} />
                  </span> My profile
                </Link>
                <Link href="/create-prompt"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                  <span style={{ marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </span>
                  Create Prompt
                </Link>
                <Link href="/settings"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>
                  <span style={{ marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faGear} />
                  </span>
                  Settings
                </Link>
                <button type='button' className='mt-5 w-full black_btn'
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button type='button'
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className='black_btn'>
                  Sign In
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav