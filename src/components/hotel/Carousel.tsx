import { Swiper, SwiperSlide } from 'swiper/react'
import { css } from '@emotion/react'

import 'swiper/css'
function Carousel({ images }: { images: string[] }) {
  return (
    <div>
      <Swiper css={containerStyles} spaceBetween={8}>
        {images.map((imageUrl, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={imageUrl}
              alt={`${idx + 1}번째 호텔 이미지`}
              css={imageStyles}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const containerStyles = css`
  padding: 0 24px;
  height: 300px;
`
const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`

export default Carousel
