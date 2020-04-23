import React, { useState } from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import tag from '../img/tag.svg'

const Tags = ({ tags }) => {

  const [expanded, setExpanded] = useState(false)

  return <div>
    <div style={{position: 'relative'}}>
      <button 
        className='btn-meta'
        title='Tags'
        onClick={() => setExpanded(!expanded) }
      >
        <img
          className='fas fa-lg'
          src={tag}
          alt='Tags'
          style={{width:'15px'}}
        />
        &nbsp;
        tags
      </button>
      <div
        className='popup-meta'
        style={{display: expanded? 'block' : 'none'}}
      >
        {
          tags.map(tag => 
          <span>
            <Link to={`/tags/${kebabCase(tag)}/`}>
              {tag}
            </Link>
            &nbsp;&nbsp;
          </span>)
        }
      </div>
    </div>
  </div>
}
export default Tags