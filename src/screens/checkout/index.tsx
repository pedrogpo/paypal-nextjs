import * as S from './styles'
import PaypalButton from '~/components/atoms/paypal-button'

export default function Checkout() {
  return (
    <S.Checkout>
      <PaypalButton
        style={{
          text: 'Comprar',
        }}
        product={{
          name: 'Teste',
          price: '15.00',
          id: 1,
          description: 'Teste',
        }}
        orderInfo={{}}
        createOrder={(data, actions) => {
          return Promise.resolve(false)
        }}
      />
    </S.Checkout>
  )
}
