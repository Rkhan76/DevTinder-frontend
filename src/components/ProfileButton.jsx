import React from 'react'

const ProfileButton = ({text}) => {
  return (
    <button
      type="button"
      class="hover:border-gray-400 border border-gray-300 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-100 rounded-lg  hover:bg-gray-100  focus:z-10 focus:ring-4"
    >
      {text}
    </button>
  )
}

export default ProfileButton
