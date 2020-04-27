import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ComicExcerpt from '../components/ComicExcerpt'
import DrawExcerpt from '../components/DrawExcerpt'

export const IndexPageTemplate = ({
  title,
  heading
}) => {
  const [category, setCategory] = useState('comics')
  return <div>
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
          { category === 'comics' ?
          <span>comics</span>
          :
          <span><a onClick={()=>setCategory('comics')} href="#" title="comics">comics</a></span>
          }
          &nbsp;&&nbsp;
          { category === 'draws' ?
          <span>stuff</span>
          :
          <span><a onClick={()=>setCategory('draws')} href="#" title="drawings">stuff</a></span>
          }
        </h1>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  { category === 'comics'?
                    <ComicExcerpt />
                    :
                    <DrawExcerpt />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  numPages: PropTypes.object
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        heading={frontmatter.heading}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
      }
    }
  }
`
