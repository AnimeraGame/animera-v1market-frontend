import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useState } from 'react'
import PropTypes from 'prop-types'

import MediaComponent from './MediaComponent'
import ThumbMediaComponent from './ThumbMediaComponent'
import MediaLightBox from 'components/Media/LightBox'

const CarouselMedia = ({ t, mediaList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePipToggle = () => {
    setIsModalOpen(old => !old)
  }
  const handleClick = index => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  return (
    <>
      <Carousel
        showArrows={mediaList.length > 1}
        autoPlay={!isModalOpen}
        interval={5000}
        infiniteLoop
        emulateTouch
        renderThumbs={() => {
          return mediaList.map((media, idx) => {
            return (
              <div key={idx} style={{ height: '100%' }}>
                <ThumbMediaComponent t={t} media={media.node} />
              </div>
            )
          })
        }}>
        {mediaList.map((media, idx) => {
          return (
            <div key={idx}>
              <MediaComponent t={t} media={media.node} handleClick={() => handleClick(idx)} />
            </div>
          )
        })}
      </Carousel>
      {isModalOpen ? (
        <MediaLightBox
          t={t}
          mediaList={mediaList}
          current={currentIndex}
          handlePipToggle={handlePipToggle}
          isOpen={isModalOpen}
          onClose={() => {
            setCurrentIndex(0)
            setIsModalOpen(false)
          }}
        />
      ) : null}
    </>
  )
}

CarouselMedia.propTypes = {
  t: PropTypes.func,
  mediaList: PropTypes.array,
}
export default CarouselMedia
