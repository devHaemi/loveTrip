import { useAlertContext } from '@/contexts/AlertContext'
import { getHotelWithRoom } from '@/remote/hotel'
import { useQuery } from 'react-query'

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()
  const { data, isLoading } = useQuery(
    ['hotelWidthRoom', hotelId, roomId],
    () => getHotelWithRoom({ hotelId, roomId }),
    {
      onSuccess: ({ room }) => {
        if (room.availableCount === 0) {
          open({
            title: '객실이 매진되었습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
      },
    },
  )

  return { data, isLoading }
}

export default useReservation
