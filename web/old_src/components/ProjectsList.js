import React from "react"
import noimage from "../images/sky.jpg"

const ProjectsList = ({ type }) => {
  var list = {
    Technology: [
      {
        title: "Hello World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Hey World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Good Morning World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Hallo World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Bonjour World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Good Day World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Hello World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Hey World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Good Morning World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Hallo World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Bonjour World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Good Day World",
        image: noimage,
        type: "Tech",
      },
    ],
    Design: [
      {
        title: "Hallo World",
        image: noimage,
        type: type,
      },
      {
        title: "Bonjour World",
        image: noimage,
        type: type,
      },
      {
        title: "Good Day World",
        image: noimage,
        type: type,
      },
    ],
    "Data Science": [
      {
        title: "Hallo World",
        image: noimage,
        type: type,
      },
      {
        title: "Bonjour World",
        image: noimage,
        type: type,
      },
      {
        title: "Good Day World",
        image: noimage,
        type: type,
      },
      {
        title: "Good Day World",
        image: noimage,
        type: "Tech",
      },
      {
        title: "Hello World",
        image: noimage,
        type: "Tech",
      },
    ],
  }

  return (
    <div className="max-w-screen-2lg mx-auto text-white">
      <div
        className="grid grid-flow-row gap-1 auto-rows-auto p-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 2fr))",
          gridAutoRows: "minmax(180px, auto)",
          gridAutoFlow: "dense",
          padding: "8px",
        }}
      >
        {" "}
        {list[type].map((item, i) => {
          if (i % 3 !== 0) {
            return (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg relative flex items-center justify-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "100% 100%",
                }}
              >
                {/* <img className="w-full" src={item.image} alt={item.title} /> */}
                <p className=" absolute bottom-1/6 text-gray-100 text-base">
                  {item.type}
                </p>
                <div className="absolute bottom-1/7 font-bold text-xl mb-2">
                  {item.title}
                </div>
              </div>
            )
          } else {
            return (
              <div
                className="row-span-2 col-span-2 max-w rounded overflow-hidden shadow-lg relative flex items-center justify-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "100% 100%",
                }}
              >
                {/* <img className="w-full" src={item.image} alt={item.title} /> */}
                <p className=" absolute bottom-1/6 text-gray-100 text-base">
                  {item.type}
                </p>
                <div className="absolute bottom-1/7 font-bold text-xl mb-2">
                  {item.title}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default ProjectsList
