import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd'

import ListRow from '@/components/shared/ListRow'
import useEditLike from '@/components/settings/like/hooks/useEditLike'
import FixedBottomButton from '@/components/shared/FixedBottomButton'

function LikePage() {
  const { data, isEdit, reOrder, save } = useEditLike()

  const handleDragEndDrop = (result: DropResult) => {
    if (result.destination == null) {
      return
    }

    const from = result.source.index
    const to = result.destination?.index

    reOrder(from, to)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEndDrop}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              {data?.map((like, index) => {
                return (
                  <Draggable key={like.id} draggableId={like.id} index={index}>
                    {(draggableProps) => (
                      <li
                        ref={draggableProps.innerRef}
                        {...draggableProps.draggableProps}
                        {...draggableProps.dragHandleProps}
                      >
                        <ListRow
                          as="div"
                          contents={
                            <ListRow.Texts
                              title={like.order}
                              subTitle={like.hotelName}
                            />
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                )
              })}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      {isEdit ? <FixedBottomButton label="저장하기" onClick={save} /> : null}
    </div>
  )
}

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (enabled === false) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}

export default LikePage
