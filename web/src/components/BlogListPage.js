import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
const BlogListPage = ({ blog, filterData }) => {
  const filterByTag = tag => {
    const data = {
      type: "tag",
      name: tag,
    }
    filterData(data)
  }
  const filterByAuthor = author => {
    const data = {
      type: "author",
      name: author,
    }
    filterData(data)
  }

  return (
    <div className="flex flex-col m-auto w-370 bg-white rounded max-w-3xl shadow-lg h-full hover:shadow-none">
      <div className="flex p-3 bg-fl-primary text-white font-neptune font-bold">
        <Link to={blog.slug.current} className="no-underline">
          <h2 className="px-1 text-xl font-semibold my-0 py-0 whitespace-pre-wrap">
            {blog.title}
          </h2>
          {/* <p className="px-1 py-0 my-1 hidden md:block">
              {(
                blog.body &&
                blog.body[0] &&
                blog.body[0].children &&
                blog.body[0].children[0].text +
                  (blog.body[1] ? blog.body[1].children[0].text : "")
              ).slice(0, 80)}{" "}
              ...
            </p>
            <p className="px-1 py-0 my-1 md:hidden lg:hidden xl:hidden">
              {(
                blog.body &&
                blog.body[0] &&
                blog.body[0].children &&
                blog.body[0].children[0].text +
                  (blog.body[1] ? blog.body[1].children[0].text : "")
              ).slice(0, 50)}{" "}
              ...
            </p> */}
        </Link>
      </div>
      <div>
        <Link
          to={blog.slug.current}
          className="text-black"
          style={{ textDecoration: "none" }}
        >
          <div>
            <Img fixed={blog.mainImage.asset.fixed} />
          </div>
        </Link>
      </div>
      <div className="p-2">
        {blog.tags &&
          blog.tags.map(tag => (
            <span
              className="text-xs mr-1 mb-0 px-2 inline-block bg-gray-400 rounded-full md:px-2 lg:px-2 xl:px-2 py-1 lg:text-sm font-semibold text-gray-800 lg:mr-2 lg:mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => filterByTag(tag)}
              role="button"
              tabIndex="0"
              onKeyPress={() => filterByTag(tag)}
            >
              #{tag}
            </span>
          ))}
      </div>
      <div className="flex mt-auto px-2">
        <div
          className="rounded-full h-10 w-10 flex items-center justify-center"
          style={{
            backgroundImage: `url(${blog.author.image.asset.url})`,
            backgroundSize: "cover",
          }}
        />
        <div className="text-base pb-3">
          <p
            className="text-gray-900 leading-none my-0 py-1 px-2 font-bold"
            style={{ cursor: "pointer" }}
            onClick={() => filterByAuthor(blog.author.name)}
            role="button"
            tabIndex="0"
            onKeyDown={() => filterByAuthor(blog.author.name)}
          >
            {blog.author.name}
          </p>
          <p className="text-gray-600 my-0 py-0 px-2">
            {blog.createdTime}{" "}
            <span className="">
              {" - "}
              <li className="inline-block">{blog.read_time} min read</li>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default BlogListPage
