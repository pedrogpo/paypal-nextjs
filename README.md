# Paypal Button Component

This is a custom Paypal button component for front-end integration. It provides customizations, styles and improved readability for a better user experience.
This component is built with Next.JS and Typescript.

## Installation

- Clone the repository
- Run npm/yarn install to install the dependencies
- Set the following environment variables in the .env file:

```
# Sandbox
SANDBOX_PAYPAL_CLIENT_ID=your_sandbox_client_id_here
# Production
PRODUCTION_PAYPAL_CLIENT_ID=your_production_client_id_here
```

## Usage
This is an example of how to use the PaypalButton component:

```tsx
import * as S from './styles'
import PaypalButton from '~/components/atoms/paypal-button'
import Loader from '~/components/atoms/loader'

export default function Checkout() {
  return (
    <S.Checkout>
      <PaypalButton
        {/* if you leave the text prop blank, it will use the default style of the Paypal Button */}
        style={{
          text: 'Purchase',
          loadingComponent: <Loader />,
        }}
        createOrder={(data, actions) => {
          // here can be a fetch to an api to create the order, get info and stuff like this...
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
```

## Props of the Component

| Name | Type | Description |
|------|------|-------------|
|`disabled`|`boolean \| undefined`| Whether the button should be disabled. |
|`onApprove`|`((data: OnApproveData, actions: OnApproveActions) => Promise<void>) | undefined`| A function that is called when the buyer approves the transaction. |
|`onError`|`((err: Record<string, unknown>) => void) | undefined`| A function that is called when there is an error. |
|`onCancel`|`((data: Record<string, unknown>, actions: OnCancelledActions) => void) | undefined`| A function that is called when the buyer cancels the transaction. |
|`createOrder`|`((data: CreateOrderData, actions: CreateOrderActions) => Promise<IPaypalButtonOrderInfo> | undefined)`| A function that is called to create the order. |
|`style`|`IPaypalButtonStyle`| The style properties for the Paypal button. |
|`IPaypalButtonStyle.width`|`string`| The width of the button. |
|`IPaypalButtonStyle.height`|`string`| The height of the button. |
|`IPaypalButtonStyle.text`|`string`| The text to display on the button.
| `IPaypalButtonStyle.loadingComponent` | `React.ReactNode` | The component to display when the button is in the loading state. |

## Props of the order info
| Name | Type | Description |
|------|------|-------------|
| `IPaypalButtonOrderInfo.currency` | `string` | The currency of the order. |
| `IPaypalButtonOrderInfo.custom_id` | `string` | A custom identifier for the order. |
| `IPaypalButtonOrderInfo.reference_id` | `string` | A reference identifier for the order. |
| `IPaypalButtonOrderInfo.invoice_id` | `string` | An invoice identifier for the order. |
| `IPaypalButtonOrderInfo.soft_descriptor` | `string` | A short description of the transaction. |
| `IPaypalButtonOrderInfo.product` | `IProduct` | The product information for the order. |
| `IProduct.description` | `string` | The description of the product. |
| `IProduct.price` | `string` | The price of the product. |
