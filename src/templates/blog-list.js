import React from "react"
import { Link, graphql } from 'gatsby'
import Layout from "../components/Layout"
import{ HTMLContent } from '../components/Content'
import Tags from '../components/Tags'
import link from '../img/link.svg'

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <section className="section section--gradient">
          <div className="container content">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                {posts &&
                  posts.map(({ node: post }) => (
                    <div className="is-parent column is-12" key={post.id}>
                      <article className='blog-list-item tile is-child'>
                        <HTMLContent content={post.html} />
                        <p className="post-meta">
                          <div className="meta-icons">
                          <div style={{padding: '5px'}}>
                            {post.frontmatter.date}
                          </div>&nbsp;/&nbsp;
                            <Tags tags={post.frontmatter.tags} />
                            /&nbsp;
                            <Link to={post.fields.slug} title='permalink' className='btn-meta'>
                              <img
                                className='fas fa-lg'
                                src={link}
                                alt='Shareable link'
                                style={{width:'15px'}}
                              />
                              &nbsp;
                              link
                            </Link>
                          </div>
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