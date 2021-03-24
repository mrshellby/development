// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

const GitLabIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill={color}
        d="M5.868 2.75L8 10h8l2.132-7.25a.4.4 0 0 1 .765-.01l3.495 10.924a.5.5 0 0 1-.173.55L12 22 1.78 14.214a.5.5 0 0 1-.172-.55L5.103 2.74a.4.4 0 0 1 .765.009z"
      />
    </svg>
  )
}

export { GitLabIcon }
