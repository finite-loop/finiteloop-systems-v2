import React from "react"
import propTypes from "prop-types"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import SEO from "../src/components/seo"
import Layout from "../src/components/layout"
import imageUrlBuilder from "@sanity/image-url"
import clientConfig from "../client-config"

const builder = imageUrlBuilder(clientConfig.sanity)

function imageUrlFor(source) {
  return builder.image(source)
}

function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  }
  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export const ClientsPageTemplate = ({ title, customers, siteTitle }) => {
  return (
    <Layout>
      <Helmet title={siteTitle + " | " + title} />
      <div className="para-primary">
        <p>{title}</p>{" "}
      </div>
      <div>
        <div className="flex flex-wrap justify-center items-center bg-white rounded-lg">
          {customers.customersList.map(client => {
            return (
              <div className="flex flex-col px-20 py-10" key={client.name}>
                <div className="flex flex-col">
                  <img
                    src={imageUrlFor(buildImageObj(client.mainImage)).url()}
                    alt={client.mainImage.alt}
                    className="w-48 h-48 align-center"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div />
      </div>
      <SEO
        postPath={`${customers.slug.current}`}
        postNode={customers}
        postSEO
      />
    </Layout>
  )
}

const ClientsPageTemplateWrapper = props => {
  const customers = props.data.customers
  const siteTitle = props.data.sanitySiteSettings.siteTitle

  return (
    <div>
      <ClientsPageTemplate
        key={customers.title}
        title={customers.title}
        customers={customers}
        siteTitle={siteTitle}
      />
    </div>
  )
}

ClientsPageTemplate.propTypes = {
  customers: propTypes.object,
  title: propTypes.string.isRequired,
}

ClientsPageTemplateWrapper.propTypes = {
  data: propTypes.object.isRequired,
}

export default ClientsPageTemplateWrapper

export const ClientsPageQuery = graphql`
  query ClientsPage {
    customers: sanityCustomers(slug: { current: { eq: "customers" } }) {
      title
      slug {
        current
      }
      customersList {
        mainImage {
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
          asset {
            _id
          }
          alt
        }
        name
      }
    }
    sanitySiteSettings {
      siteTitle
    }
  }
`
