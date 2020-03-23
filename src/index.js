import './styles.css'

import home from './models/home'
import vehicle from './models/vehicle'

import HeaderElement from './components/HeaderElement'

export const checkFormValidity = formElement => formElement.checkValidity()

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export const toStringFormValues = values => {
  const match = matchString => value => value.field === matchString
  const FTT = 6.38 / 100
  const INTEREST_RATE = 2.34 / 100
  const NUMBER_OF_INSTALLMENTS = values.find(match('installments')).value / 1000
  const LOAN_AMOUNT = values.find(match('loan-amount')).value

  return `OUTPUT\n${values
    .map(value => `${value.field} --> ${value.value}`)
    .join('\n')}`.concat(
    `\nTotal ${(FTT + INTEREST_RATE + NUMBER_OF_INSTALLMENTS + 1) * LOAN_AMOUNT}`
  )
}

export const finalCalculation = () => {
  const values = getFormValues(document.querySelector('.form'))
  const match = matchString => value => value.field === matchString
  const FTT = 6.38 / 100
  const INTEREST_RATE = 2.34
  const NUMBER_OF_INSTALLMENTS = values.find(match('installments')).value
  const LOAN_AMOUNT = values.find(match('loan-amount')).value
  const TOTAL_PAYABLE = (FTT + (INTEREST_RATE / 100) + (NUMBER_OF_INSTALLMENTS / 1000) + 1) * LOAN_AMOUNT
  const MONTHLY_INSTALLMENT = TOTAL_PAYABLE / NUMBER_OF_INSTALLMENTS
  document.querySelector('.quota span').innerText = MONTHLY_INSTALLMENT.toLocaleString('es-ES')
  document.querySelector('.amount_container p').innerText = `R$ ${TOTAL_PAYABLE.toLocaleString('es-ES')}`
  document.querySelector('.tax__container p').innerText = `${INTEREST_RATE.toLocaleString('es-ES')}%`
}

export function Send (values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit (formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => alert('Your form submited error', error))
    }
  })
}
export function handleChangeRange (
  rangeElement,
  warrantyElement,
  MIN_VALUE,
  MAX_VALUE
) {
  // set the range values to display;
  const tags = rangeElement.parentNode.querySelectorAll('.range__values span')
  tags[0].innerText = MIN_VALUE
  tags[1].innerText = MAX_VALUE
  rangeElement.addEventListener('change', function (event) {
    warrantyElement.value = ((Number(MAX_VALUE) - Number(MIN_VALUE)) * Number(event.target.value)) / 100 + Number(MIN_VALUE)
  })
  // eslint-disable-next-line no-undef
  rangeElement.dispatchEvent(new Event('change'))
}

export function registerEventsRange (collateral) {
  handleChangeRange(
    document.getElementById('collateral-value-range'),
    document.getElementById('collateral-value'),
    collateral.minCollateral,
    collateral.maxCollateral
  )
  handleChangeRange(
    document.getElementById('loan-amount-range'),
    document.getElementById('loan-amount'),
    collateral.minLoan,
    collateral.maxLoan
  )
}

export function handleChangeCollateral (
  collateralElement
) {
  collateralElement.addEventListener('change', function (event) {
    const collateralSelected = event.target.value === 'home' ? home : vehicle
    loadInstallments(document.getElementById('installments'), collateralSelected.installments)
    registerEventsRange(collateralSelected)
  })
}

export function loadInstallments (objWhereLoad, installments) {
  // remove options
  while (objWhereLoad.options.length) objWhereLoad.remove(0)
  // insert new options
  installments.forEach(installment => {
    const option = document.createElement('option')
    option.appendChild(document.createTextNode(installment))
    option.value = installment
    objWhereLoad.appendChild(option)
  })
}

export function handleChange (inputs) {
  inputs.forEach(element => {
    element.addEventListener('change', function () { finalCalculation() })
  })
}

export default class CreditasChallenge {
  static initialize () {
    this.defaultCollateral = vehicle
    this.registerComponents()
    this.registerEvents()
  }

  static registerEvents () {
    Submit(document.querySelector('.form'))
    registerEventsRange(this.defaultCollateral)
    handleChangeCollateral(document.getElementById('collateral'))
    handleChange(document.querySelectorAll('.form__fields select, .form__fields input'))
    finalCalculation()
  }

  static registerComponents () {
    window.customElements.define('c-header', HeaderElement)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
