import styled from 'styled-components'

export const Loader = styled.div`
  border: 4px solid #497cff;
  border-left-color: transparent;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  margin: 0 auto;
`
