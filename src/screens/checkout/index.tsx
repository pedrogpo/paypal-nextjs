import * as S from './styles'
import PaypalButton from '~/components/atoms/paypal-button'
import Loader from '~/components/atoms/loader'

export default function Checkout() {
  return (
    <S.Checkout>
      <PaypalButton
        // if you leave the text prop blank, it will use the default style of the Paypal Button
        style={{
          text: 'Purchase',
          loadingComponent: <Loader />,
        }}
        createOrder={(data, actions) => {
          // here can be a fetch to an api to create the order...
          return Promise.resolve({
            currency: 'BRL',
            product: {
              description: 'This is a test product.',
              price: '18.00',
            },
          })

          // you can cancel it throwing an error
          // return Promise.reject(new Error('it was not possible to create the order.'))
        }}
        onCancel={(data, actions) => {
          console.log('onCancel', data, actions)
        }}
        onError={(err) => {
          console.log('onError', err)
        }}
      />
    </S.Checkout>
  )
}
