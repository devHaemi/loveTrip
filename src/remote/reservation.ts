import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { COLLECTIONS } from '@/constants'
import { Reservation } from '@/models/reservation'
import { Room } from '@/models/room'
import { store } from '@/remote/firebase'

export async function makeReservation(newReservation: Reservation) {
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )

  const room = roomSnapshot.data() as Room
  const numberOfAvailableRooms = room.availableCount

  if (numberOfAvailableRooms === 0) {
    throw new Error('no room')
  }

  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      availableCount: numberOfAvailableRooms - 1,
    }),
    setDoc(doc(store, COLLECTIONS.RESERVATION), newReservation),
  ])
}
