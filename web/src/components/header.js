import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import MenuLinks from "./MenuLinks"
import SEO from "./seo"

const Header = ({ siteTitle, logo, home }) => {
  const isBrowser = typeof window !== `undefined`

  let win = { pageYOffset: 0 }
  if (isBrowser) {
    win = window
  }
  const [menuActive, setMenuActive] = useState(false)
  const [currState, setCurrState] = useState(win.pageYOffset)
  const [navClass, setNavClass] = useState("")
  const [bg, setBackground] = useState("")

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (win.pageYOffset > currState) {
  //       setNavClass("")
  //       setCurrState(win.pageYOffset)
  //     } else if (win.pageYOffset < currState) {
  //       if (win.pageYOffset !== 0) {
  //         setNavClass("fixed")
  //         setBackground("#E05455")
  //       } else {
  //         setNavClass("")
  //       }
  //     }
  //     setCurrState(win.pageYOffset)
  //   }
  //   win.addEventListener("scroll", handleScroll)
  // })

  return (
    <div id="header h-full">
      <nav
        className={`nav ${navClass}`}
        id="navbar"
        role="navigation"
        style={{ backgroundColor: home ? "" : bg }}
      >
        <div className="sm:mt-2 sm:w-2/4 lg:w-auto sm:ml-4 lg:ml-32">
          <Link to="/">
            <div className="sm:flex md:flex mb-2">
              <img
                className="sm:w-3/4 lg:w-auto sm:h-12 md:h-12 lg:h-10"
                src={logo.asset.url}
                alt="Logo"
                style={{ height: "40px" }}
              />
            </div>
            {/* <div className="sm:flex lg:flex justify-center">
              <img className="lg:w-auto" src={flLogoText} alt="Logo" />
            </div> */}
          </Link>
        </div>
        <div className="sm:max-w-4/5 md:max-w-3/4 mx-auto items-start flex flex-1 mr-24">
          <MenuLinks classes="menu-links xl:flex lg:flex sm:hidden md:hidden" />
        </div>
        <div className="sm:mx-2 md:px-5 flex lg:hidden">
          <button
            role="menu"
            aria-label="Menu"
            style={{ background: "none" }}
            onClick={() => setMenuActive(!menuActive)}
          >
            <div className="three col">
              <div
                className={menuActive ? "hamburger is-active" : "hamburger"}
                id="hamburger-menu"
              >
                <span className="line" />
                <span className="line" />
                <span className="line" />
              </div>
            </div>
          </button>
        </div>
        <MenuLinks
          classes={
            menuActive
              ? "menu-items is-active flex flex-col lg:hidden"
              : "menu-items flex-col lg:hidden"
          }
        />
      </nav>
      <SEO />
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  id: "header",
}

export default Header
