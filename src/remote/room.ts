import { COLLECTIONS } from '@/constants'
import { Room } from '@/models/room'
import { store } from '@/remote/firebase'
import { collection, doc, getDocs } from 'firebase/firestore'

export async function getRooms(hotelId: string) {
  const snapShot = await getDocs(
    collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
  )

  return snapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
