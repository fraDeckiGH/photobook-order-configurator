import { create } from "zustand"

export type {
  ShippingDetails_base as ShippingDetails, 
}

interface ShippingDetails_base {
  firstName: string
  lastName: string
  address: string
  city: string
  zipCode: string
  country: string
}
interface ShippingDetails extends ShippingDetails_base {
  isSaved: boolean
}

interface BookConfiguration {
  format: "square" | "horizontal" | "vertical" | ""
  squareSize: "20x20" | "30x30" | ""
  dimensions: string
  pageCount: number
  giftWrap: boolean
  giftNote: string
  personalizedCover: boolean
  coverLayout: "single" | "collage" | ""
}

interface PhotobookStore {
  shipping: ShippingDetails
  book: BookConfiguration
  isOrderConfirmed: boolean
  isOrderModified: boolean
  hasChanges: boolean
  originalShipping: ShippingDetails | null
  originalBook: BookConfiguration | null
  setShipping: (shipping: Partial<ShippingDetails>) => void
  setBook: (book: Partial<BookConfiguration>) => void
  resetShipping: () => void
  resetBook: () => void
  confirmOrder: () => void
  editOrder: () => void
  newOrder: () => void
  setHasChanges: (hasChanges: boolean) => void
  isOrderValid: () => boolean
  hasNonEmptyShippingFields: () => boolean
}

const initialShipping: ShippingDetails = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  zipCode: "",
  country: "",
  isSaved: false,
}

const initialBook: BookConfiguration = {
  format: "",
  squareSize: "",
  dimensions: "",
  pageCount: 20,
  giftWrap: false,
  giftNote: "",
  personalizedCover: false,
  coverLayout: "",
}

export const usePhotobookStore = create<PhotobookStore>((set, get) => ({
  shipping: initialShipping,
  book: initialBook,
  isOrderConfirmed: false,
  isOrderModified: false,
  hasChanges: false,
  originalShipping: null,
  originalBook: null,
  setShipping: (newShipping) =>
    set((state) => {
      const updatedShipping = { ...state.shipping, ...newShipping }
      const hasActualChanges =
        state.isOrderConfirmed && state.originalShipping && state.originalBook
          ? !isStateEqual(updatedShipping, state.originalShipping) || !isStateEqual(state.book, state.originalBook)
          : state.hasChanges

      return {
        shipping: updatedShipping,
        hasChanges: hasActualChanges,
      }
    }),
  setBook: (newBook) =>
    set((state) => {
      const updatedBook = { ...state.book, ...newBook }
      const hasActualChanges =
        state.isOrderConfirmed && state.originalShipping && state.originalBook
          ? !isStateEqual(state.shipping, state.originalShipping) || !isStateEqual(updatedBook, state.originalBook)
          : state.hasChanges

      return {
        book: updatedBook,
        hasChanges: hasActualChanges,
      }
    }),
  resetShipping: () =>
    set((state) => ({
      shipping: { ...initialShipping },
    })),
  resetBook: () =>
    set((state) => ({
      book: { ...initialBook },
    })),
  confirmOrder: () =>
    set((state) => ({
      isOrderConfirmed: true,
      isOrderModified: false,
      hasChanges: false,
      originalShipping: { ...state.shipping },
      originalBook: { ...state.book },
    })),
  editOrder: () =>
    set((state) => ({
      isOrderModified: true,
      hasChanges: false,
      // added
      originalShipping: { ...state.shipping },
      originalBook: { ...state.book },
    })),
  newOrder: () =>
    set((state) => ({
      book: { ...initialBook },
      isOrderConfirmed: false,
      isOrderModified: false,
      hasChanges: false,
      originalShipping: null,
      originalBook: null,
    })),
  setHasChanges: (hasChanges) =>
    set(() => ({
      hasChanges,
    })),
  isOrderValid: () => {
    const { shipping, book } = get()
    const isZipCodeValid =
      shipping.zipCode.trim() !== "" &&
      /^[0-9]+$/.test(shipping.zipCode) &&
      shipping.zipCode.length >= 3 &&
      shipping.zipCode.length <= 10

    return (
      shipping.isSaved &&
      shipping.firstName.trim() !== "" &&
      shipping.lastName.trim() !== "" &&
      shipping.address.trim() !== "" &&
      shipping.city.trim() !== "" &&
      isZipCodeValid &&
      shipping.country !== "" &&
      book.format !== "" &&
      (book.format === "square" ? book.squareSize !== "" : book.dimensions !== "") &&
      (book.personalizedCover ? book.coverLayout !== "" : true)
    )
  },
  hasNonEmptyShippingFields: () => {
    const { shipping } = get()
    return (
      shipping.firstName.trim() !== "" ||
      shipping.lastName.trim() !== "" ||
      shipping.address.trim() !== "" ||
      shipping.city.trim() !== "" ||
      shipping.zipCode.trim() !== "" ||
      shipping.country !== ""
    )
  },
}))

function isStateEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}
