import {
  OnApproveData,
  OnApproveActions,
  OnCancelledActions,
  CreateOrderData,
  CreateOrderActions,
} from '@paypal/paypal-js/types/components/buttons'
import { IProduct } from '~/interfaces/product'

export interface IPaypalButtonStyle {
  width?: string
  height?: string
  text?: string
  loadingComponent?: React.ReactNode
}

export interface IPaypalButtonOrderInfo {
  currency?: string
  custom_id?: string
  reference_id?: string
  invoice_id?: string
  soft_descriptor?: string
  product: IProduct
}

export interface IPaypalButton {
  style?: IPaypalButtonStyle

  disabled?: boolean | undefined

  orderInfo: IPaypalButtonOrderInfo

  onApprove?:
    | ((data: OnApproveData, actions: OnApproveActions) => Promise<void>)
    | undefined
  onError?: ((err: Record<string, unknown>) => void) | undefined
  onCancel?:
    | ((data: Record<string, unknown>, actions: OnCancelledActions) => void)
    | undefined
  createOrder?: (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => Promise<IPaypalButtonOrderInfo | undefined>
}
