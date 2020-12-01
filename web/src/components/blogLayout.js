import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/index.css"
import Header from "./header"
import Footer from "./footer"
import bg from "../images/finiteloop_bg_home.png"
import BlogHeader from "./BlogHeader"

const BlogLayout = ({ bgImg, children }) => {
  const { sanitySiteSettings: settings } = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        introText
        introText2
        github
        keywords
        linkedin
        logo {
          caption
          alt
          asset {
            url
          }
        }
        offeringText
        services
        siteDesc
        siteLongTitle
        siteTitle
        siteUrl
        trademark
        twitter
      }
    }
  `)

  return (
    <div
      className="relative flex flex-col min-h-screen"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: bgImg ? `url(${bg})` : null,
      }}
    >
      <Helmet title={settings.siteTitle} />
      <BlogHeader id="header" logo={settings.logo} />
      <div className="sm:max-w-full md:max-w-3/4 my-8 mx-auto mb-auto">
        {children}
      </div>
      <Footer
        socialUrls={{
          linked: settings.linkedin,
          twitter: settings.twitter,
          github: settings.github,
        }}
        links={[
          {
            title: "Privacy Policy",
            url: "https://finiteloop.io/privacy-policy/",
          },
        ]}
        trademark={settings.trademark}
        blog={true}
      />
    </div>
  )
}

BlogLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BlogLayout