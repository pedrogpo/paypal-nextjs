import styled, { css } from 'styled-components'

interface IPaypalButton {
  width?: string
  height?: string
  disabled?: boolean
}

export const PaypalButtonOverlay = styled.div<IPaypalButton>`
  /* Don't remove this */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  width: 100%;
  pointer-events: none;
  height: calc(${(props) => props.height});

  /* This is the custom */
  background-color: #497cff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.9rem;
  font-weight: 500;

  border-radius: 10px;

  // check if is disabled

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #2f3337;
      color: #939a9f;
      cursor: default;
    `}

  transition: 0.3s ease all;
`

export const PaypalButton = styled.div<IPaypalButton>`
  min-width: 150px;
  min-height: 25px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;

  max-width: 750px;

  /* workarround to work hover in Overlay, as it has pointer-events: none property */
  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        ${PaypalButtonOverlay} {
          background-color: #406de0;
          box-shadow: 0px 0px 7px rgba(73, 124, 255, 0.2), 0px 0px 40px rgba(0, 0, 0, 0.5),
            0px 0px 60px rgba(73, 124, 255, 0.55);
        }
      }
    `}
`
