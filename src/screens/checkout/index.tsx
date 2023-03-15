import * as S from './styles'
import PaypalButton from '~/components/atoms/paypal-button'

export default function Checkout() {
  return (
    <S.Checkout>
      <PaypalButton
        text="Comprar"
        product={{
          name: 'Teste',
          price: '10.00',
          id: 1,
          description: 'Teste',
        }}
      />
    </S.Checkout>
  )
}
