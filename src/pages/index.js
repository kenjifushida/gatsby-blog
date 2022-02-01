import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <Seo title="Home" />
    <h1>Latest Posts</h1>
    <p>This is a sample website for learning GatsbyJS</p>
    {data.allMarkdownRemark.edges.map(post => (
      <div key={post.node.id} className="post">
        <h3 style={{marginBottom: "0"}}>{post.node.frontmatter.title}</h3>
        <small>Posted by {post.node.frontmatter.author} on {post.node.frontmatter.date}</small>
        <br />
        <Link to={post.node.frontmatter.path}>Read more...</Link>
      </div>
    ))}

  </Layout>
)

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            author
            date
            path
            title
          }
        }
      }
    }
  }
`

export default IndexPage
