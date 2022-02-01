exports.createPages = async function({actions, graphql}) {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            html
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Paginated pages for posts

  const postPerPage = 6

  const numPages = Math.ceil(data.allMarkdownRemark.edges.length / postPerPage)

  Array.from({length: numPages}).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: require.resolve("./src/pages/index.js"),
      context: {
        limit: postPerPage,
        skip: i * postPerPage,
        numPages,
        currentPage: i+1,
      }
    })
  })

  // Single Blog Post Page
  data.allMarkdownRemark.edges.forEach(({node}) => {
    const path = node.frontmatter.path
    const id = node.id
    createPage({
      path: path,
      component: require.resolve('./src/templates/blog-post.js'),
      context: {id},
    })
  })

  // const { createPage } = actions

  // const postTemplate = path.resolve('src/templates/blog-post.js');

  // return graphql(`
  // {
  //   allMarkdownRemark {
  //     edges {
  //       node {
  //         html
  //         id
  //         frontmatter {
  //           author
  //           date
  //           path
  //           title
  //         }
  //       }
  //     }
  //   }
  // }
  // `).then(res => {
  //   if(res.errors) {
  //     return Promise.reject(res.errors)
  //   }

  //   res.data.allMarkdownRemark.edges.forEach(({node}) => {
  //     createPage({
  //       path: node.frontmatter.path,
  //       component: postTemplate
  //     })
  //   })
  // })
}
