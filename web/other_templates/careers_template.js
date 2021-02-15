import React from "react"
import propTypes from "prop-types"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import SEO from "../src/components/seo"
import Layout from "../src/components/layout"
// import { FaDiceFive } from "react-icons/fa"

export const CareersPageTemplate = ({ title, careersData, siteTitle }) => {
  return (
    <Layout>
      <Helmet title={siteTitle + " | " + title} />
      <div className="para-primary">{careersData.header}</div>
      <div className="mx-auto text-left text-white leading-normal tracking-normal sm:text-lg lg:px-12 sm:px-8 pt-4 font-light">
        <h2 className="font-semibold m-0">Current Openings</h2>
        <div className="two-column">
          {careersData.openings.map(openings => {
            if (openings.link) {
              return (
                <p className="m-0">
                  •{" "}
                  <a href={openings.link} className="list-none text-white">
                    {openings.string_content}
                  </a>
                </p>
              )
            } else {
              return <p className="m-0">• {openings.string_content}</p>
            }
          })}
        </div>
        <h2 className="m-0">
          Apply now @{" "}
          <a
            href="mailto:careers@finiteloop.io"
            className="list-none text-white"
          >
            {careersData.apply}
          </a>
        </h2>
        <h2 className="m-0">{careersData.qualitiesTitle}</h2>
        <div className="two-column">
          {careersData.qualities.map(quality => (
            <>
              <p className="font-semibold m-0">{quality.heading}</p>
              <p className="m-0">{quality.content}</p>
            </>
          ))}
        </div>
      </div>

      <div className="para-primary">{careersData.footer}</div>
      <div className="mx-auto text-center pb-4">
        <Link to="/contact">
          <button className="rectButton">Talk to us</button>
        </Link>
      </div>
      <SEO
        postPath={`${careersData.slug.current}`}
        postNode={careersData}
        postSEO
      />
    </Layout>
  )
}

const CareersPageTemplateWrapper = ({ data }) => {
  const careers = data.Careers
  const siteTitle = data.sanitySiteSettings.siteTitle

  return (
    <div>
      <CareersPageTemplate
        key={careers.title}
        title={careers.title}
        careersData={careers}
        siteTitle={siteTitle}
      />
    </div>
  )
}

CareersPageTemplate.propTypes = {
  data: propTypes.object,
  careersData: propTypes.object.isRequired,
}

CareersPageTemplateWrapper.propTypes = {
  data: propTypes.object.isRequired,
}

export default CareersPageTemplateWrapper

export const careersPageQuery = graphql`
  query CareersPage {
    Careers: sanityCareers(slug: { current: { eq: "careers" } }) {
      title
      header
      footer
      openings {
        string_content
        link
      }
      qualitiesTitle
      qualities {
        heading
        content
      }
      apply
      slug {
        current
      }
    }
    sanitySiteSettings {
      siteTitle
    }
  }
`
