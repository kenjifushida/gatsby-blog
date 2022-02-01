import React from 'react'
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function Template({data}) {
    const post = data.markdownRemark
    const image = getImage(post.frontmatter.image)

    return(
        <Layout>
            <Seo title={post.frontmatter.title}/>
            <div>
                <Link to="/">Go back</Link>
                <hr />
                <h1>{post.frontmatter.title}</h1>
                <h4>Posted by {post.frontmatter.author} on {post.frontmatter.date}</h4>
                <div style={{
                    textAlign: "center"
                }}>
                <GatsbyImage image={image} alt={post.frontmatter.author} />
                </div>
                <div style={{
                    marginTop:"2rem"
                }
                } dangerouslySetInnerHTML={{ __html: post.html }} />
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
                image {
                    childImageSharp {
                      gatsbyImageData(width: 300, placeholder: BLURRED, formats: AUTO)
                    }
                }
            }
        }
    }
`