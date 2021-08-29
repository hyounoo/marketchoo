import Link from 'next/link'
import packageInfo from '../../package.json'

export default function Footer() {
  return (
    <footer className="bg-footer py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap mb-12 lg:mb-20 -mx-3 text-center lg:text-left">
          <div className="w-full lg:w-1/5 px-3 mb-6 lg:mb-0">
            <Link href="/">
              <a className="inline-block mx-auto lg:mx-0 text-3xl font-semibold leading-none" data-config-id="brand">
                <img src="/images/logo.gif" width={76} height={76} alt="MarketChoo" />
              </a>
            </Link>
          </div>
          <div className="w-full lg:w-2/5 px-3 mb-8 lg:mb-0">
            <p
              className="max-w-md mx-auto lg:max-w-full lg:mx-0 lg:pr-32 lg:text-lg text-white leading-relaxed"
              data-config-id="desc"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus eget justo.
            </p>
          </div>
          <div className="w-full lg:w-1/5 px-3 mb-8 lg:mb-0">
            <p className="mb-2 lg:mb-4 lg:text-lg font-bold font-heading text-white" data-config-id="header1">
              Office
            </p>
            <p className="lg:text-lg text-white" data-config-id="contact1">
              359 Hidden Valley Road, NY
            </p>
          </div>
          <div className="w-full lg:w-1/5 px-3">
            <p className="mb-2 lg:mb-4 lg:text-lg font-bold font-heading text-white" data-config-id="header2">
              Contacts
            </p>
            <p className="lg:text-lg text-white" data-config-id="contact2">
              hello@gmail.com
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:justify-between">
          <p className="text-xs text-white" data-config-id="copy">
            &copy; 2020. All rights reserved.
          </p>
          <div className="order-first lg:order-last -mx-2 mb-4 lg:mb-0">
            <a className="inline-block px-2" href="#">
              <img src="/metis-assets/icons/facebook-blue.svg" alt="" />
            </a>
            <a className="inline-block px-2" href="#">
              <img src="/metis-assets/icons/twitter-blue.svg" alt="" />
            </a>
            <a className="inline-block px-2" href="#">
              <img src="/metis-assets/icons/instagram-blue.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
