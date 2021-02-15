import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import MenuLinks from "./MenuLinks"
import SEO from "./seo"

const BlogHeader = ({ siteTitle, logo }) => {
  const isBrowser = typeof window !== `undefined`
  let win = { pageYOffset: 0 }
  if (isBrowser) {
    win = window
  }

  const [menuActive, setMenuActive] = useState(false)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (win.pageYOffset > currState) {
  //       setNavClass("")
  //       setCurrState(win.pageYOffset)
  //     } else if (win.pageYOffset < currState) {
  //       if (win.pageYOffset !== 0) {
  //         setNavClass("fixed")
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
        className={`nav sm:flex-row`}
        id="navbar"
        role="navigation"
        style={{ backgroundColor: "#36374D" }}
      >
        <div className="sm:mt-2 sm:ml-4 lg:ml-32">
          <Link to="https://finiteloop.io/">
            <div className="sm:flex md:flex justify-center mb-2">
              <img
                className="sm:w-48 lg:w-48 h-full mt-2"
                src={logo.asset.url}
                alt="Logo"
              />
            </div>
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
          blog={true}
        />
      </nav>
      <SEO />
    </div>
  )
}

BlogHeader.propTypes = {
  siteTitle: PropTypes.string,
}

BlogHeader.defaultProps = {
  siteTitle: ``,
  id: "header",
}

export default BlogHeader
