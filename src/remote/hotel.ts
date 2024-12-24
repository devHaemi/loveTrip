import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
  where,
} from 'firebase/firestore'

import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'
import { Hotel } from '@/models/hotel'
import { Room } from '@/models/room'

export async function getHotels(pageParams?: QuerySnapshot<Hotel>) {
  const hotelsQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        )

  const hotelsSnapshot = await getDocs(hotelsQuery)

  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  return {
    items,
    lastVisible,
  }
}

export async function getHotel(id: string) {
  const snapShot = await getDoc(doc(store, COLLECTIONS.HOTEL, id))

  return {
    id,
    ...snapShot.data(),
  } as Hotel
}

export async function getRecommendHotels(hotelIds: string[]) {
  const recommendQuery = query(
    collection(store, COLLECTIONS.HOTEL),
    where(documentId(), 'in', hotelIds),
  )

  const snapShot = await getDocs(recommendQuery)

  return snapShot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )
}

export async function getHotelWithRoom({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const hotelSnapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, hotelId))
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot.ref, COLLECTIONS.ROOM, roomId),
  )

  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  }
}
