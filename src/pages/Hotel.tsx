import Carousel from '@/components/hotel/Carousel'
import useHotel from '@/components/hotel/hooks/useHotel'
import Top from '@/components/shared/Top'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>Loading...</div>
  }

  const { name, comment, images } = data

  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
    </div>
  )
}

const containerStyles = css`
  padding: 0 24px;
  height: 300px;
`

export default HotelPage
