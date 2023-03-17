import * as S from './styles'
import PaypalButton from '~/components/atoms/paypal-button'

export default function Checkout() {
  return (
    <S.Checkout>
      <PaypalButton
        style={{
          text: 'Comprar',
        }}
        orderInfo={{
          product: {
            description: 'poo',
            price: '15.00',
          },
        }}
        // createOrder={(data, actions) => {
        //   // here can be a fetch to an api to create the order...
        //   return Promise.resolve({
        //     product: {
        //       description: 'poo',
        //       price: '18.00',
        //     },
        //   })
        // }}
      />
    </S.Checkout>
  )
}
