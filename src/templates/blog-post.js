import React from 'react'
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function Template({data}) {
    const post = data.markdownRemark

    return(
        <Layout>
            <Seo title={post.frontmatter.title}/>
            <div>
            <Link to="/">Go back</Link>
            <hr />
            <h1>{post.frontmatter.title}</h1>
            <h4>Posted by {post.frontmatter.author} on {post.frontmatter.date}</h4>
            <div dangerouslySetInnerHTML={{__html: post.html}} />
        </div>
        </Layout>
    )
}

export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path }}) {
            html
            frontmatter {
                path
                title
                author
                date
            }
        }
    }
`