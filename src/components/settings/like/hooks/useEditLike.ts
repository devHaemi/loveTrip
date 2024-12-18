import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import useLike from '@/hooks/like/useLike'
import { Like } from '@/models/like'
import { updateOrder } from '@/remote/like'
import { useAlertContext } from '@/contexts/AlertContext'

function useEditLike() {
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])
  const [isEdit, setIsEdit] = useState(false)

  const { data } = useLike()
  const { open } = useAlertContext()
  const client = useQueryClient()

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data)
    }
  }, [data])

  const reOrder = useCallback((from: number, to: number) => {
    setIsEdit(true)
    setUpdatedLikes((prevUpdatedLikes) => {
      const newItems = [...prevUpdatedLikes]

      const [fromItem] = newItems.splice(from, 1) // 이동된 아이템 원래 위치 제거

      if (fromItem != null) {
        newItems.splice(to, 0, fromItem)
      }

      newItems.forEach((like, idx) => {
        like.order = idx + 1
      })

      return newItems
    })
  }, [])

  const save = async () => {
    try {
      await updateOrder(updatedLikes)
      client.setQueriesData(['likes'], updatedLikes)
      setIsEdit(false)
    } catch (e) {
      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        onButtonClick: () => {
          setIsEdit(false)
        },
      })
    }
  }

  return { data: isEdit ? updatedLikes : data, isEdit, reOrder, save }
}

export default useEditLike
