import { atom } from 'recoil'

export const selectedPlanState = atom({
  key: 'selectedPlanState', // unique ID (with respect to other atoms/selectors)
  default: undefined // default value (aka initial value)
})
