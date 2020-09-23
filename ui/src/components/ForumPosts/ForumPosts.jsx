// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { H2 } from '../Headings/Headings'
import fetchForumPosts from './forumFunctions/fetchForumPosts'
import ForumPostsView from './ForumPostsView'

const ForumPosts = ({ forum }) => {
  const { vendor, url } = forum
  const params = useParams()
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await fetchForumPosts(vendor, params.id)
      if (result) {
        if (!result.error) {
          setError(null)
          setPosts(result.json)
        } else {
          setError(result.error)
        }
      }
    })()
  }, [vendor, url, params.id, params])

  return (
    <>
      <H2>Forum</H2>
      {error && (
        <ErrorMessage level="warning">
          Fout bij het ophalen van forumcontent
        </ErrorMessage>
      )}
      {!error && posts && posts.length > 0 && (
        <ForumPostsView url={url} posts={posts} />
      )}
    </>
  )
}

ForumPosts.propTypes = {
  forum: PropTypes.shape({
    vendor: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

export default ForumPosts
