import * as S from './styles'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { IPaypalButton } from './interfaces'

export default function PaypalButton({
  style: {
    width = '150px',
    height = '40px',
    loadingComponent = <>Loading...</>,
    text,
  } = {},
  disabled,
  onApprove,
  onError,
  onCancel,
  createOrder,
}: IPaypalButton) {
  const [{ isPending }] = usePayPalScriptReducer()

  return (
    <S.PaypalButton disabled={disabled} width={width} height={height}>
      {
        // This is a workaround to hide the PayPal button
        // when it's not ready yet
        isPending ? (
          loadingComponent
        ) : (
          <>
            {!disabled && (
              <PayPalButtons
                style={{
                  layout: 'horizontal',
                  color: 'black',
                  shape: 'pill',
                  tagline: false,
                  height: Number(height.replace(/\D/g, '')),
                }}
                disabled={disabled}
                onApprove={onApprove}
                onError={onError}
                onCancel={onCancel}
                createOrder={async (data, actions) => {
                  try {
                    const orderInfo = await createOrder(data, actions)

                    if (!orderInfo) {
                      throw new Error('it was not possible to create the order.')
                    }

                    const purchase_units = [
                      {
                        description: orderInfo.product.description,
                        amount: {
                          value: orderInfo.product.price,
                          currency_code: orderInfo.currency,
                        },
                        custom_id: orderInfo.custom_id,
                        reference_id: orderInfo.reference_id,
                        invoice_id: orderInfo.invoice_id,
                        soft_descriptor: orderInfo.soft_descriptor,
                      },
                    ]

                    return actions.order.create({ purchase_units })
                  } catch (error) {
                    console.error(error)
                    throw new Error('Failed to create order.')
                  }
                }}
              />
            )}
            {/* 
              TODO: 
              A better way to do this is, instead of using an overlay,
              use a button holding the paypal button container and 
              leaving it with opacity: 0 
            */}
            {text && (
              <S.PaypalButtonOverlay disabled={disabled}>{text}</S.PaypalButtonOverlay>
            )}
          </>
        )
      }
    </S.PaypalButton>
  )
}
