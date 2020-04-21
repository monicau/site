import React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/Layout"
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <section className="section section--gradient">
          <div className="container">
            <div className="section">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <div className="content">
                  {posts &&
                    posts.map(({ node: post }) => (
                      <div className="is-parent column is-12" key={post.id}>
                        <article
                          className={`blog-list-item tile is-child ${
                            post.frontmatter.featuredpost ? 'is-featured' : ''
                          }`}
                        >
                          <header>
                            {post.frontmatter.featuredimage ? (
                              <div className="featured-thumbnail">
                                <Link
                                className="title has-text-primary is-size-4"
                                to={post.fields.slug}
                                >
                                  <PreviewCompatibleImage
                                    imageInfo={{
                                      image: post.frontmatter.featuredimage,
                                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                    }}
                                  />
                                </Link>
                              </div>
                            ) : null}
                          </header>
                          <p>
                            {post.excerpt}
                          </p>
                          <p className="post-meta">
                            <span className="text-right is-block">
                              {post.frontmatter.date}
                            </span>
                          </p>
                          <hr className="comic-divider" />
                        </article>
                      </div>
                    ))}
                    <div className="column is-12 has-text-centered">
                      {
                        this.props.pageContext.currentPage > 1 ?
                        <Link className="btn" to={`/${this.props.pageContext.category}/page/${this.props.pageContext.currentPage-1}`}>
                          Previous page
                        </Link>
                        : ""
                      }
                       &nbsp;
                      {
                        this.props.pageContext.currentPage < this.props.pageContext.numPages ?
                          <Link className="btn" to={`/${this.props.pageContext.category}/page/${this.props.pageContext.currentPage+1}`}>
                            Next page
                          </Link>
                        : ""
                      }
                    </div>
                    <div className="column pagination is-12 has-text-centered">
                      {
                        Array.from({length: this.props.pageContext.numPages}, (_, i) => (
                          this.props.pageContext.currentPage === i + 1?
                          <span key={`pagenum_${i+1}`} className="active-pagenumber">{i + 1}</span>
                          :
                          <Link key={`page_link_${i + 1}`} to={`/comics/pages/${i + 1}`}>
                            {i + 1}
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!, $category: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" }, category: { eq: $category } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            category
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`