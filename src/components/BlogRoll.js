import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts, totalCount } = data.allMarkdownRemark
    const numPages = Math.ceil(totalCount / 10)
    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-12" key={post.id}>
              <article
                className={`blog-list-item tile is-child ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <p className="post-meta">
                  <span className="is-block">
                    {post.frontmatter.date}
                  </span>
                </p>
                <header>
                  {post.frontmatter.featuredimage ? (
                    <div>
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
                <hr className="comic-divider" />
              </article>
            </div>
          ))}
          <div className="column is-12 has-text-centered">
            { numPages > 1 ? 
              <Link className="btn" to={`/comics/page/2`}>
                Next page
              </Link>
              : ""
          }
          </div>
          <div className="column pagination is-12 has-text-centered">
          {
            numPages > 1 ? 
              Array.from({length: numPages}, (_, i) => (
                i === 0? 
                <span key={`pagenum_${i+1}`} className="active-pagenumber">{i + 1}</span>
                :
                <Link key={`page_link_${i + 1}`} to={`/comics/pages/${i + 1}`}>
                  {i + 1}
                </Link>
              ))
              :""
          }
          </div>
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 10
        ) {
          totalCount
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
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
