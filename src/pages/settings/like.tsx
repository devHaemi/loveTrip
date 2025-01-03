import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd'
import { Virtuoso } from 'react-virtuoso'

import ListRow from '@/components/shared/ListRow'
import useEditLike from '@/components/settings/like/hooks/useEditLike'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import { Like } from '@/models/like'

function generateMocks() {
  const mocks = []

  for (let i = 0; i < 1000; i += 1) {
    mocks.push({
      id: `${i}`,
      hotelId: `hotel ${i}`,
      hotelName: `hotel ${i}`,
      hotelMainImageUrl: `hotel ${i}`,
      userId: '',
      order: i,
    } as Like)
  }

  return mocks
}

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

  const mocks = generateMocks()

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEndDrop}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              <Virtuoso
                useWindowScroll
                increaseViewportBy={0}
                data={mocks}
                itemContent={(index, like) => {
                  return (
                    // 최소 높이 잡아주기
                    <div style={{ minHeight: 1 }}>
                      <Draggable
                        key={like.id}
                        draggableId={like.id}
                        index={index}
                      >
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
                    </div>
                  )
                }}
              />
              {/* {mocks?.map((like, index) => {
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
              })} */}
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
