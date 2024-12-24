import { parse } from 'qs'
import { useEffect } from 'react'

import Form from '@/components/reservation/Form'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'
import addDelimiter from '@/utils/addDelimiter'
import useUser from '@/hooks/auth/useUser'

function ReservationPage() {
  const user = useUser()
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  ) as {
    startDate: string
    endDate: string
    nights: string
    roomId: string
    hotelId: string
  }

  useEffect(() => {
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [user, endDate, hotelId, nights, roomId, startDate])

  const { data, isLoading } = useReservation({ hotelId, roomId })

  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const handleSubmit = (formValues: { [key: string]: string }) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    }

    // TODO: 예약하기
  }

  const buttonLabel = `${nights}박 ${addDelimiter(room.price * Number(nights))}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={4} backgroundColor="gray100" />
      <Form
        forms={hotel.forms}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
