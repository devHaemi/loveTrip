import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'
import Button from '@/components/shared/Button'

function RecommendHotelButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))

    snapshot.docs.forEach((hotel) => {
      const recommendedHotelList = []

      for (let doc of snapshot.docs) {
        if (recommendedHotelList.length === 5) {
          break
        }

        if (doc.id !== hotel.id) {
          recommendedHotelList.push(doc.id)
        }
      }

      batch.update(hotel.ref, {
        recommendHotels: recommendedHotelList,
      })
    })

    await batch.commit()

    alert('업데이트가 완료되었습니다.')
  }

  return <Button onClick={handleButtonClick}>추천호텔 데터 추가하기</Button>
}

export default RecommendHotelButton
