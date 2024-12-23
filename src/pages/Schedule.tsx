import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import RangePicker from '@/components/shared/RangePicker'
import FixedBottomButton from '@/components/shared/FixedBottomButton'

function SchedulePage() {
  const navigate = useNavigate()

  const { roomId = '', hotelId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    roomId: string
    hotelId: string
  }

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })

  useEffect(() => {
    if (hotelId === '' || roomId === '') {
      window.history.back()
    }
  }, [hotelId, roomId])

  const moveToReservation = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true },
    )

    navigate(`/reservation${params}`)
  }

  const isSubmissionValid =
    selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = isSubmissionValid
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '예약 날짜를 선택해주세요.'

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={isSubmissionValid === false}
        onClick={moveToReservation}
      />
    </div>
  )
}

export default SchedulePage
