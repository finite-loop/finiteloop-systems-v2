import React from "react"
import Layout from "../src/components/layout"
import SEO from "../src/components/seo"

import { useStaticQuery, graphql } from "gatsby"
import "../styles/index.css"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      sanitySiteSettings {
        introText
        introText2
        siteDesc
        siteLongTitle
        siteTitle
      }
      sanityHome {
        offeringsList {
          content
          name
          mainImage {
            alt
            asset {
              url
            }
          }
        }
        ourWork {
          name
          content
          mainImage {
            alt
            asset {
              url
            }
          }
        }
      }
    }
  `)
  const siteSettings = data.sanitySiteSettings
  const offeringsList = data.sanityHome.offeringsList
  const ourWork = data.sanityHome.ourWork

  return (
    <Layout bgImg home={true}>
      <SEO
        title={`${siteSettings.siteTitle} | ${siteSettings.siteLongTitle}`}
        description={siteSettings.siteDesc}
      />
      <section className="sm:mx-5 lg:mx-auto max-w-lg" name="introduction">
        <h1 className="heroText">{siteSettings.introText}</h1>
        <h2 className="text-fl-primary font-thin text-3xl">
          {siteSettings.introText2}
        </h2>
      </section>
      <section name="offerings" className="pt-10 flex justify-center flex-wrap">
        {offeringsList.map(offering => (
          <div className="flex max-w-xs items-center flex-col">
            <div className="flex px-10 pt-6 min-h-full sm:items-center xl:items-start flex-col">
              <div className="flex h-32 mb-2 items-center">
                <img
                  src={offering.mainImage.asset.url}
                  alt={offering.mainImage.alt}
                />
              </div>
              <div className="flex-col sm:text-center xl:text-left">
                <h2 className="text-md mt-4 text-fl-primary font-medium">
                  {offering.name}
                </h2>
                <div className="leading-normal tracking-normal font-light text-lg w-auto text-white">
                  {offering.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <hr
        className="sm:mx-4 lg:mx-32 my-20"
        style={{ borderTop: "0.1rem solid white" }}
        color="white"
      />
      {/* <section
        name="work"
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {ourWork.map(work => (
          <div
            className="flex justify-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          >
            <div key={work.name} className="flex p-4">
              <div className="flex max-w-sm flex-col">
                <img
                  alt={work.mainImage.alt}
                  src={work.mainImage.asset.url}
                  className="w-full"
                />
                <div
                  className="p-4" // #E05455
                  style={{
                    backgroundColor: "white",
                    color: "#424242",
                    borderTop: "solid #77878c",
                    height: "100%",
                  }}
                >
                  <h2 className="text-xl font-semibold py-2">{work.name}</h2>
                  <p className="p-0 mx-0 max-w-sm text-md leading-normal font-light">
                    {work.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section> */}
      <section name="work" className="flex">
        <div className="flex flex-wrap justify-center items-stretch">
          {ourWork.map(work => (
            <div className="flex justify-center p-4" style={{ maxWidth: 300 }}>
              <div key={work.name} className="flex max-w-sm flex-col">
                <img
                  alt={work.mainImage.alt}
                  src={work.mainImage.asset.url}
                  className="w-full"
                />
                <div // #E05455
                  className="p-4"
                  style={{
                    backgroundColor: "white",
                    color: "#424242",
                    borderTop: "solid #77878c",
                    height: "100%",
                  }}
                >
                  <h2 className="text-xl font-semibold py-2">{work.name}</h2>
                  <p className="p-0 mx-0 max-w-sm text-md leading-normal font-light">
                    {work.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
