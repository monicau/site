import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import BlogItem from './BlogItem'

class ComicExcerpt extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts, totalCount } = data.allMarkdownRemark
    const numPages = Math.ceil(totalCount / 10)
    return (
      <div className="columns is-multiline">
        { posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-12" key={post.id}>
              <BlogItem post={post} />
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

ComicExcerpt.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default props => {  
  return <StaticQuery
    query={graphql`query ComicExcerptQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" }, category: {eq: "comics" } } }
        limit: 10
      ) {
        totalCount
        edges {
          node {
            id
            html
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              category
              tags
            }
          }
        }
      }
    }
  `}
    render={(data) => <ComicExcerpt data={data} {...props} />}
  />
  
}
