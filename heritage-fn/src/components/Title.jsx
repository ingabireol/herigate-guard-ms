import React from 'react'

const Title = ({text}) => {
  return (
    <div className='flex md:text-3xl text-2xl text-slate-900 uppercase tracking-wider'>
        {text}
    </div>
  )
}

export default Title