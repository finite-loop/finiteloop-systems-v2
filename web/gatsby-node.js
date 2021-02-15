/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // const careers_data = await graphql(`
  //   query GetCareers {
  //     careers: allSanityCareers {
  //       nodes {
  //         slug {
  //           current
  //         }
  //       }
  //     }
  //   }
  // `)
  // careers_data.data.careers.nodes.forEach(career => {
  //   createPage({
  //     path: `/careers`,
  //     component: path.resolve(`src/templates/careers_template.js`),
  //     context: {
  //       slug: career.slug.current,
  //     },
  //   })
  // })

  // const customers_data = await graphql(`
  //   query getCustomers {
  //     customers: allSanityCustomers {
  //       nodes {
  //         slug {
  //           current
  //         }
  //       }
  //     }
  //   }
  // `)
  // customers_data.data.customers.nodes.forEach(customer => {
  //   createPage({
  //     path: `/customers`,
  //     component: path.resolve(`src/templates/customers_template.js`),
  //     context: {
  //       slug: customer.slug.current,
  //     },
  //   })
  // })

  // const team_data = await graphql(`
  //   query getTeamData {
  //     teamPage: allSanityTeamPageContent {
  //       nodes {
  //         slug {
  //           current
  //         }
  //       }
  //     }
  //   }
  // `)
  // team_data.data.teamPage.nodes.forEach(teamPage => {
  //   createPage({
  //     path: `/team`,
  //     component: path.resolve(`src/templates/team_template.js`),
  //     context: {
  //       slug: teamPage.slug.current,
  //     },
  //   })
  // })
  // const theWay_data = await graphql(`
  //   query getWayData {
  //     way: allSanityTheWay {
  //       nodes {
  //         slug {
  //           current
  //         }
  //       }
  //     }
  //   }
  // `)
  // theWay_data.data.way.nodes.forEach(way => {
  //   createPage({
  //     path: `/way`,
  //     component: path.resolve(`src/templates/the_way_template.js`),
  //     context: {
  //       slug: way.slug.current,
  //     },
  //   })
  // })
  // const result = await graphql(`
  //   query GetProjects {
  //     projects: allSanityProjects {
  //       nodes {
  //         slug {
  //           current
  //         }
  //       }
  //     }
  //   }
  // `)
  // result.data.projects.nodes.forEach(project => {
  //   createPage({
  //     path: `/project/${project.slug.current}`,
  //     component: path.resolve("src/templates/project.js"),
  //     context: {
  //       slug: project.slug.current,
  //     },
  //   })
  // })

  // const about_data = await graphql(`
  //   {
  //     about: allSanityAbout {
  //       nodes {
  //         slug {
  //           current
  //         }
  //       }
  //     }
  //   }
  // `)

  // about_data.data.about.nodes.forEach(about => {
  //   createPage({
  //     path: `/about`,
  //     component: path.resolve(`src/templates/about_template.js`),
  //     context: {
  //       slug: about.slug.current,
  //     },
  //   })
  // })

  const blog_data = await graphql(`
    {
      blogs: allSanityBlog {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  blog_data.data.blogs.nodes.forEach(blog => {
    createPage({
      path: `/${blog.slug.current}`,
      component: path.resolve(`src/templates/blog_template.js`),
      context: {
        slug: blog.slug.current,
      },
    })
  })

  // const work_data = await graphql(`
  //   {
  //     works: allSanityWork {team
  //       nodes {
  //         slug {
  //           current
  //         }
  //       }
  //     }
  //   }
  // `)
  // work_data.data.works.nodes.forEach(work => {
  //   createPage({
  //     path: `/work`,
  //     component: path.resolve(`src/templates/work_template.js`),
  //     context: {
  //       slug: work.slug.current,
  //     },
  //   })
  // })

  // const initiatives_data = await graphql(`
  //   {
  //     initiatives: allSanityInitiatives {
  //       nodes {
  //         slug {
  //           current
  //         }
  //       }
  //     }
  //   }
  // `)
  // initiatives_data.data.initiatives.nodes.forEach(initiative => {
  //   createPage({
  //     path: `/initiatives`,
  //     component: path.resolve(`src/templates/initiatives_template.js`),
  //     context: {
  //       slug: initiative.slug.current,
  //     },
  //   })
  // })
}
