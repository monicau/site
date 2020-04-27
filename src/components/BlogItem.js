import React from 'react'
import { Link } from 'gatsby'
import{ HTMLContent } from './Content'
import Tags from './Tags'
import link from '../img/link.svg'

const BlogItem = (props) =>(
  <article className='blog-list-item tile is-child'>
    <HTMLContent content={props.post.html} />
    <p className="post-meta">
      <div className="meta-icons">
      <div style={{padding: '5px'}}>
        {props.post.frontmatter.date}
      </div>&nbsp;/&nbsp;
        <Tags tags={props.post.frontmatter.tags} />
        /&nbsp;
        <Link to={props.post.fields.slug} title='permalink' className='btn-meta'>
          <img
            className='fas fa-lg'
            src={link}
            alt='Shareable link'
            style={{width:'15px', marginRight:'5px'}}
          />
          link
        </Link>
      </div>
    </p>
    <hr className="comic-divider" />
  </article>)

export default BlogItem