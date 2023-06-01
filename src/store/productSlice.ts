import { createSlice } from '@reduxjs/toolkit'
import products, { productType } from '../data/products'

const initialProducts: productType = products

const productSlice = createSlice({
  name: 'products',
  initialState: initialProducts,
  reducers: {
    'products/incrementProduct': (state, action) => {
      const product = state.find((product: productType[0]) => product.id === action.payload.id)

      if (product) {
        return state.map((product: productType[0]) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        )
      }
    },
    'products/addProduct': (state, action) => {
      const product = state.find((product: productType[0]) => product.id === action.payload.id)

      if (product) {
        return state.map((product: productType[0]) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity,
              }
            : product,
        )
      }
    },
    'products/decrementProduct': (state, action) => {
      const product = state.find((product: productType[0]) => product.id === action.payload.id)
      if (product) {
        return state.map((product: productType[0]) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
      }
    },
  },
})

export const productAction = productSlice.actions
export const productReducer = productSlice.reducer
