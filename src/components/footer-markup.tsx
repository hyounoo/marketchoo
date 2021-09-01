import Link from 'next/link'
import packageInfo from '../../package.json'

export default function Footer() {
  return (
    <footer id="footer" className="footer" color="primary">
      {/* <div>
        <a className="inline-block px-2" href="#">
          <img src="/metis-assets/icons/facebook-blue.svg" alt="" />
        </a>
        <a className="inline-block px-2" href="#">
          <img src="/metis-assets/icons/twitter-blue.svg" alt="" />
        </a>
        <a className="inline-block px-2" href="#">
          <img src="/metis-assets/icons/instagram-blue.svg" alt="" />
        </a>
      </div> */}
      <p className="copyright">© { new Date().getFullYear() } MARKETCHOO. All Rights Reserved.</p>
    </footer>
  )
}
