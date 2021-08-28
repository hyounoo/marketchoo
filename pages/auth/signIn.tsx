// auth.tsx
import router from 'next/router'
import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Layout, { siteTitle } from '../../src/components/layout'
import firebase from '../../src/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signIn flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
}

function SignInScreen() {
  const [user, loading, error] = useAuthState(firebase.auth())

  if (user) {
    router.push('/')
  }

  if (!user && !loading) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto">
            <div className="flex flex-col max-w-md mx-auto text-center shadow-2xl p-10">
              <div className="my-12">
                <h4 className="mb-6 text-3xl" data-config-id="header">
                  Sign in to {siteTitle}
                </h4>

                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              </div>
              <div>
                <p className="text-xs text-blueGray-400 text-center" data-config-id="terms">
                  <Link href="/privacy">
                    <a className="underline hover:text-blueGray-500">Privacy policy </a>
                  </Link>
                  and
                  <Link href="/terms">
                    <a className="underline hover:text-blueGray-500"> Terms of Use</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div>
          <h1>You are already signed In</h1>
          <p>Redirecting to Home...</p>
        </div>
      </Layout>
    )
  }
}

export default SignInScreen
