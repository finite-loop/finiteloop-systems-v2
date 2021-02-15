import React from "react"
import propTypes from "prop-types"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../src/components/seo"
import Layout from "../src/components/layout"

export const WayPageTemplate = ({ props, wayData, siteTitle }) => {
  return (
    <Layout>
      <Helmet title={siteTitle + " | " + wayData.title} />
      <div className="para-primary">{wayData.header}</div>
      <section
        name="The Way"
        className="sm:px-2 md:px-4 lg:px-10 xl:px-12 text-white"
      >
        <div className="flex flex-col sm:flex-wrap lg:flex-no-wrap justify-start mb-4">
          {/* <Img
            className="sm:w-full sm:h-full lg:w-3/5 rounded-lg"
            fluid={wayData.frontmatter.main.image.childImageSharp.fluid}
            alt="Main Image"
          /> */}
          {/* <div className="leading-normal tracking-normal sm:text-lg md:text-xl mx-auto" />
         {wayData.}
        </div> */}
          {wayData.spaces.map(items => (
            <div className="pb-6" key={items.parentTitle}>
              <h2 className="text-left text-3xl w-full my-0">
                {items.parentTitle}
              </h2>
              <hr
                className="mb-6"
                style={{ borderTop: "0.05rem solid white" }}
                color="white"
              />
              <div className="flex sm:flex-wrap md:flex-no-wrap justify-start">
                {items.children.map(item => (
                  <React.Fragment key={item.name}>
                    {Object.keys(items.children).length === 1 && (
                      <div className="flex sm:flex-wrap md:flex-no-wrap pb-2 px-2">
                        <div className="flex-none w-64 sm:max-w-full md:max-w-xs lg:max-w-sm">
                          <Img
                            className="rounded"
                            style={{ width: "14rem" }}
                            fluid={item.mainImage.asset.fluid}
                            alt={item.name}
                          />
                        </div>
                        <div className="lg:ml-10 mt-10 flex-grow sm:text-lg lg:text-xl leading-normal tracking-normal">
                          <p className="my-0">{item.name && item.name}</p>
                          <p className="my-0"> {item.content}</p>
                        </div>
                      </div>
                    )}
                    {Object.keys(items.children).length > 1 && (
                      <div className="flex-col max-w-sm pb-2 px-4">
                        <Img
                          className="rounded"
                          style={{ width: "14rem" }}
                          fluid={item.mainImage.asset.fluid}
                          alt={item.name}
                        />
                        <div className="sm:text-lg lg:text-lg mt-6 leading-normal tracking-normal">
                          <p className="my-0">{item.name}</p>
                          <p className="my-0">{item.content}</p>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {wayData.footer && (
            <div className="para-primary">{wayData.footer}</div>
          )}
        </div>
      </section>
      <SEO postPath={props.path} postNode={wayData} postSEO />
    </Layout>
  )
}

const WayPageTemplateWrapper = props => {
  const wayData = props.data.way
  const siteTitle = props.data.sanitySiteSettings.siteTitle
  return (
    <div>
      <WayPageTemplate
        key={wayData.title}
        title={wayData.title}
        props={props}
        wayData={wayData}
        siteTitle={siteTitle}
      />
    </div>
  )
}

WayPageTemplate.propTypes = {
  props: propTypes.object.isRequired,
  data: propTypes.object,
  wayData: propTypes.object.isRequired,
}

WayPageTemplateWrapper.propTypes = {
  data: propTypes.object.isRequired,
}

export default WayPageTemplateWrapper

export const query = graphql`
  query getTheWay {
    way: sanityTheWay {
      header
      title
      slug {
        current
      }
      spaces {
        parentTitle
        children {
          name
          mainImage {
            asset {
              fixed(width: 125, height: 125) {
                ...GatsbySanityImageFixed
              }
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
          content
        }
      }
    }
    sanitySiteSettings {
      siteTitle
    }
  }
`
