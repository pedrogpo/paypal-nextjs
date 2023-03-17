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
  orderInfo: {
    currency = 'BRL',
    custom_id,
    reference_id,
    invoice_id,
    soft_descriptor,
  } = {},
  disabled,
  product,
  onApprove,
  onError,
  onCancel,
  createOrder,
}: IPaypalButton) {
  const [{ isPending }] = usePayPalScriptReducer()

  return (
    <S.PaypalButton width={width} height={height}>
      {
        // This is a workaround to hide the PayPal button
        // when it's not ready yet
        isPending ? (
          loadingComponent
        ) : (
          <>
            {!disabled && (
              <PayPalButtons
                className="paypal__container"
                style={{
                  layout: 'horizontal',
                  color: 'black',
                  shape: 'pill',
                  tagline: false,
                  height: Number(height.replace(/\D/g, '')),
                }}
                disabled={disabled}
                // usar o onApprove com cuidado se o IPN estiver ativado.
                onApprove={onApprove}
                onError={onError}
                onCancel={onCancel}
                createOrder={async (data, actions) => {
                  /*
                    Fazer uma request para registrar o create order e retornar um 
                    id único de pagamento para utilizar como invoice_id, referencia etc...
                  */
                  const purchase_units = [
                    {
                      /*
                        reference_id: ...
                          A reference_id não precisa ser estática, ela pode ser gerada dinamicamente para cada pagamento.
                          A reference_id é um campo opcional que você pode usar para identificar a transação.
                          Se você precisar associar o pagamento a um pedido, por exemplo, você pode gerar uma reference_id única 
                          para cada pedido. Isso pode ser útil para fins de rastreamento e reconciliação.
                        */
                      /*
                        invoice_id: ...
                          Um identificador exclusivo para a transação, que pode ser usado para rastrear o pagamento em seus registros.

                        custom_id: ...
                          Um identificador exclusivo que você pode usar para associar a transação a informações adicionais em seus registros.
                      
                        soft_descriptor: ...
                          Uma descrição curta que aparece na fatura do comprador para identificar a fonte do pagamento.
                        */
                      description: product.description,
                      amount: {
                        value: product.price,
                        currency_code: currency,
                      },
                      custom_id: custom_id,
                      reference_id: reference_id,
                      invoice_id: invoice_id,
                      soft_descriptor: soft_descriptor,
                    },
                  ]

                  try {
                    const result = createOrder && (await createOrder(data, actions))
                    if (!result) {
                      throw new Error('it was not possible to create the order.')
                    }

                    return actions.order.create({ purchase_units })
                  } catch (error) {
                    console.error(error)
                    throw new Error('Failed to create order.')
                  }
                }}
              />
            )}
            {/* TODO: check if button is disabled and do something... */}
            {text && (
              <S.PaypalButtonOverlay disabled={disabled}>{text}</S.PaypalButtonOverlay>
            )}
          </>
        )
      }
    </S.PaypalButton>
  )
}
