import Link from 'next/link'
import firebase from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useToggle } from 'react-use'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth())
  // console.log the current user and loading status
  console.log('Loading:', loading, '|', 'Current user:', user)

  const [isShown, setIsShown] = useToggle(false)

  const handleNavigation = (e: any) => {
    if (isShown) {
      setIsShown(false)
    }
  }

  return (
    <header className="bg-primay">
      <div className="container px-4 mx-auto">
        <nav className="flex items-center py-2">
          <Link href="/">
            <a className="text-3xl font-semibold leading-none" onClick={handleNavigation}>
              <img src="/images/logo_120.svg" width={76} height={76} alt="MarketChoo" />
            </a>
          </Link>
          <div className="lg:hidden ml-auto">
            <button
              className="navbar-burger flex items-center py-2 px-3 text-blue-600 hover:text-blue-700 rounded border border-blue-200 hover:border-blue-300"
              onClick={() => {
                setIsShown(!isShown)
                console.log('toggle')
              }}
            >
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden lg:flex items-center space-x-12 ml-auto mr-12">
            <li>
              <Link href="/products">
                <a className="text-sm text-white hover:text-blueGray-500">Products</a>
              </Link>
            </li>
            <li>
              <Link href="/events">
                <a className="text-sm text-white hover:text-blueGray-500">Events</a>
              </Link>
            </li>
          </ul>
          <div className="hidden lg:block">
            {!user && (
              <Link href="/auth/signIn/">
                <a className="mr-2 inline-block px-4 py-3 text-xs text-white font-semibold leading-none border border-blue-200 hover:border-blue-300 rounded">
                  Sign In
                </a>
              </Link>
            )}
            {user && (
              <>
                Hi {user?.displayName}
                <Link href="#">
                  <a
                    className="inline-block ml-4 px-4 py-3 text-xs font-semibold leading-none bg-blue-600 hover:bg-blue-700 text-white rounded"
                    onClick={(e) => {
                      e.preventDefault()
                      firebase.auth().signOut()
                    }}
                  >
                    Sign out
                  </a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      <div className={`navbar-menu relative z-50 ${isShown ? '' : 'hidden'}`}>
        <div
          className="navbar-backdrop fixed inset-0 bg-blueGray-800 opacity-25"
          onClick={() => setIsShown(!isShown)}
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link href="/">
              <a className="mr-auto text-3xl font-semibold leading-none" onClick={handleNavigation}>
                <img className="rounded-full" src="/images/logo.gif" width={76} height={76} alt="MarketChoo" />
              </a>
            </Link>
            <button className="navbar-close" onClick={() => setIsShown(!isShown)}>
              <svg
                className="h-6 w-6 text-blueGray-400 cursor-pointer hover:text-blueGray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li onClick={handleNavigation}>
                <Link href="/products">
                  <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-600">Products</a>
                </Link>
              </li>
              <li onClick={handleNavigation}>
                <Link href="/events">
                  <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-600">Events</a>
                </Link>
              </li>
            </ul>
            <div className="mt-4 pt-6 border-t border-blueGray-100">
              {!user && (
                <Link href="/auth/signIn">
                  <a
                    className="block px-4 py-3 mb-2 text-xs text-center text-blue-600 hover:text-blue-700 font-semibold leading-none border border-blue-200 hover:border-blue-300 rounded"
                    onClick={(e) => {
                      handleNavigation
                    }}
                  >
                    Sign In
                  </a>
                </Link>
              )}
              {user && (
                <Link href="/api/auth/signout">
                  <a
                    className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-blue-600 hover:bg-blue-700 text-white rounded"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation
                      firebase.auth().signOut()
                    }}
                  >
                    Sign out
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="mt-auto">
            <p className="my-4 text-xs text-blueGray-400">
              <span>Get in Touch</span>
              <a className="text-blue-600 hover:text-blue-600 underline" href="#">
                info@example.com
              </a>
            </p>
            <a className="inline-block px-1" href="#">
              <img src="/metis-assets/icons/facebook-blue.svg" alt="" />
            </a>
            <a className="inline-block px-1" href="#">
              <img src="/metis-assets/icons/twitter-blue.svg" alt="" />
            </a>
            <a className="inline-block px-1" href="#">
              <img src="/metis-assets/icons/instagram-blue.svg" alt="" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
