import useRooms from '@/components/hotel/hooks/useRooms'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Tag from '@/components/shared/Tag'
import Text from '@/components/shared/Text'
import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId })
  console.log(data)

  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text typography="t4" bold={true}>
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금포함
        </Text>
      </Header>
      <ul>
        {data?.map((room) => {
          const almostSoldOut = room.availableCount === 1
          const soldOut = room.availableCount === 0

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName} 의 객실 이미지`}
                  css={imageStyles}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {almostSoldOut === true ? (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                />
              }
              right={
                <Button size="medium" disabled={soldOut}>
                  {soldOut ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

const Container = styled.div`
  margin: 40px 0;
`
const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

export default Rooms
