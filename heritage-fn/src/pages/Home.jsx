import React from 'react'
import { homeImages } from '../assets/assets'
import ImageSlide from '../components/ImageSlide'
import Title from '../components/Title'
import ImageCard from '../components/ImageCard'
import HeritageGuardLanding from './LandingPage'
const Home = () => {
  return (
    <div className=''>
      {/* <ImageSlide />
      <div className="p-3 flex flex-col gap-3 items-center justify-center">
        <Title text={'Heritage'} />
        <div className="grid w-full px-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-3 gap-y-4">
          {homeImages.map((img,index) => (
            <ImageCard 
              description={'cnaosidc oaisdncaiosdcinsa soaicnsdoacnaso inasdocinsdocniasod'}
              img={img.image}
              link={'http://google.com'}
            />

          ))}
        </div>
      </div> */}
      <HeritageGuardLanding />
    </div>
  )
}

export default Home