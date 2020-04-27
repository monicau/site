import React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/Layout"
import BlogItem from '../components/BlogItem'

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
      <div
        className="margin-top-0"
      >
        <div
          style={{
            textAlign: 'center',
            flexDirection: 'column',
          }}
        >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
        > 
          { this.props.pageContext.category === 'comics' ?
          <span>comics</span>
          :
          <span><Link to={'/comics/page/1'} title="comics">comics</Link></span>
          }
          &nbsp;&&nbsp;
          { this.props.pageContext.category === 'draws' ?
          <span>stuff</span>
          :
          <span><Link to={'/draws/page/1'} title="drawings">stuff</Link></span>
          }
            </h1>
          </div>
        </div>
        <section className="section section--gradient">
          <div className="container content">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                {posts &&
                  posts.map(({ node: post }) => (
                    <div className="is-parent column is-12" key={post.id}>
                      <BlogItem post={post} />
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
          id
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            category
            tags
          }
        }
      }
    }
  }
`