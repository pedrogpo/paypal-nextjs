import * as S from './styles'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useEffect, useState } from 'react'
import { IProduct } from '~/interfaces/product'

interface IPaypalButton {
  width?: string
  height?: string

  text?: string
  disabled?: boolean | undefined

  product: IProduct

  currency?: string
  custom_id?: string
  reference_id?: string
  invoice_id?: string

  soft_descriptor?: string
}

export default function PaypalButton({
  width = '150px', // it can be 100% too
  height = '40px',
  text,
  disabled,
  product,
  currency = 'BRL',
  custom_id,
  reference_id,
  invoice_id,
  soft_descriptor,
}: IPaypalButton) {
  const [buttonReady, setButtonReady] = useState(false)

  useEffect(() => {
    async function checkPayPalButton() {
      while (!window.paypal) {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // wait 1 second
      }
      setButtonReady(true)
    }
    checkPayPalButton()
  }, [])

  return (
    <S.PaypalButton width={width} height={height}>
      {
        // This is a workaround to hide the PayPal button
        // when it's not ready yet
        !buttonReady ? (
          <>Loading...</>
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
                onError={(err) => {
                  console.log(err)
                  // handlear erro, registrar, etc...
                }}
                onCancel={(data, actions) => {
                  console.log({ callback: 'onCancel', data, actions })
                  // Aparecer modal, registrar evento, etc...
                }}
                onApprove={(data, actions) => {
                  console.log({ callback: 'onApprove', data, actions })
                  // Request do on approve com o data

                  return Promise.resolve()
                }}
                createOrder={(data, actions) => {
                  /*
                  Fazer uma request para registrar o create order e retornar um 
                  id único de pagamento para utilizar como invoice_id, referencia etc...
                */
                  return actions.order.create({
                    purchase_units: [
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
                    ],
                  })
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
