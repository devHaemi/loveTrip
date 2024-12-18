import { css } from '@emotion/react'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
import { colors } from '@/styles/colorPalette'
import useUser from '@/hooks/auth/useUser'
import Spacing from '@/components/shared/Spacing'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Flex align="center">
          <Link to="/my">
            <img
              src={
                user.photoURL ??
                'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
              }
              alt="유저의 이미지"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '100%',
              }}
            />
          </Link>
          <Spacing size={4} direction="horizontal" />
          <Link to="/settings">
            <img
              src="https://cdn1.iconfinder.com/data/icons/ionicons-outline-vol-2/512/settings-outline-64.png"
              width={40}
              height={40}
              alt="setting icon"
            />
          </Link>
        </Flex>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [showSignButton, user])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">Love Trip</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  z-index: 10;
  position: sticky;
  top: 0;
  padding: 10px 24px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray};
`

export default Navbar
