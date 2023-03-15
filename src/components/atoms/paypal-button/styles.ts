import styled from 'styled-components'

interface IPaypalButton {
  width?: number
  height?: number
  disabled?: boolean
}

export const PaypalButton = styled.div<IPaypalButton>`
  min-width: 150px;
  min-height: 25px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
`

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
  height: calc(${(props) => props.height}px);

  /* This is the custom */
  background-color: green;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  /* opacity: 0.5; */
`
