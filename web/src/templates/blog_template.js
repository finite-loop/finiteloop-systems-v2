import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import imageUrlBuilder from "@sanity/image-url"
import BlockContent from "../components/SanityTextEditorComponents/block-content"
import clientConfig from "../../client-config"
import { Helmet } from "react-helmet"
import BlogLayout from "../components/blogLayout"
import SEO from "../components/seo"

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

const SampleBlog = ({ data }) => {
  return (
    <BlogLayout>
      <Helmet title={`Blog | ${data.blog.title}`} />

      <article className="m-0 md:m-2 bg-white">
        <div className="m-10 sm:w-11/12 lg:w-5/6 mx-auto">
          <h1 className="text-2xl font-semibold md:pt-10 mb-4 md:text-3xl lg:text-5xl leading-tight font-neptune">
            {data.blog.title}
          </h1>
          <div class="w-full flex items-center lg:w-2/3 xl:w-2/3">
            <Img
              fluid={data.blog.author.image.asset.fluid}
              className="h-10 w-10 md:h-14 md:w-14 justify-center lg:h-12 lg:w-12 mr-2 rounded-full border-solid border-2"
              style={{
                borderColor: "rgb(247, 222, 215)",
                display: "inline-block",
              }}
            />
            <span>
              <span className=" text-sm inline lg:text-2xl font-semibold text-gray-900 leading-none">
                {data.blog.author.name}
              </span>
              <p className="text-gray-600 my-0 py-0 text-sm">
                {data.blog.createdTime}{" "}
                <span className="">
                  {" - "}
                  <li className="inline-block">
                    {data.blog.read_time} min read
                  </li>
                </span>
              </p>
            </span>
          </div>
        </div>
        {/* <div className="mx-auto ">
          {data.blog.mainImage && data.blog.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(data.blog.mainImage))
                // .width(1400)
                // .height(Math.floor((9 / 16) * 1200))
                // .fit("crop")
                .url()}
              alt={data.blog.mainImage.alt}
              className="h-auto object-cover rounded sm:object-cover md:object-contain lg:object-contain xl:object-contain text-center w-full"
            />
          )}
        </div> */}
        <div className="sm:w-11/12 lg:w-5/6 mx-auto">
          {data.blog._rawBody && (
            <BlockContent blocks={data.blog._rawBody || []} />
          )}
        </div>
      </article>
      <SEO
        title={`Blogs | ${data.blog.title} `}
        description={data.sanitySiteSettings.siteDesc}
      />
    </BlogLayout>
  )
}

export const query = graphql`
  query getBlog($slug: String) {
    sanitySiteSettings {
      introText
      introText2
      siteDesc
      siteLongTitle
      siteTitle
    }
    blog: sanityBlog(slug: { current: { eq: $slug } }) {
      _rawBody
      title
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
      publishedAt(formatString: "MMMM DD, YYYY")
      createdTime: _createdAt(formatString: "MMMM DD, YYYY")
      read_time
      author {
        name
        image {
          asset {
            fixed(width: 150, height: 150) {
              ...GatsbySanityImageFixed
            }
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`

export default SampleBlog
