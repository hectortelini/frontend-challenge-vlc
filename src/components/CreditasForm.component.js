import home from '../models/home'
import vehicle from '../models/vehicle'

import CreditasBaseComponent from './CreditasBaseComponent.component'

import { template } from '../templates/CreditasForm.template'

export default class CreditasForm extends CreditasBaseComponent {
  constructor () {
    super()
    this.render(template)
    this._defaultCollateral = vehicle
    this._form = this.shadowRoot.querySelector('.form')
    this._collateralSelector = this.shadowRoot.getElementById('collateral')
    this._allFields = this.shadowRoot.querySelectorAll('.form__fields select, .form__fields input')
    this.registerEvents()
  }
  connectedCallback () {
    this.registerEvents()
    this.finalCalculation()
  }

  registerEvents () {
    this.Submit(this._form)
    this.registerEventsRange(this._defaultCollateral)
    this.handleChangeCollateral(this._collateralSelector)
    this.handleChange(this._allFields)
  }

  checkFormValidity (formElement) { return formElement.checkValidity() }

  getFormValues (formElement) {
    return Object.values(formElement.elements)
      .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
      .map(element => ({
        field: element.name,
        value: element.value
      }))
  }

  toStringFormValues (values) {
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

  finalCalculation () {
    const values = this.getFormValues(this.shadowRoot.querySelector('.form'))
    const match = matchString => value => value.field === matchString
    const FTT = 6.38 / 100
    const INTEREST_RATE = 2.34
    const NUMBER_OF_INSTALLMENTS = values.find(match('installments')).value
    const LOAN_AMOUNT = values.find(match('loan-amount')).value
    const TOTAL_PAYABLE = (FTT + (INTEREST_RATE / 100) + (NUMBER_OF_INSTALLMENTS / 1000) + 1) * LOAN_AMOUNT
    const MONTHLY_INSTALLMENT = TOTAL_PAYABLE / NUMBER_OF_INSTALLMENTS
    this.shadowRoot.querySelector('.quota span').innerText = MONTHLY_INSTALLMENT.toLocaleString('es-ES')
    this.shadowRoot.querySelector('.amount_container p').innerText = `R$ ${TOTAL_PAYABLE.toLocaleString('es-ES')}`
    this.shadowRoot.querySelector('.tax__container p').innerText = `${INTEREST_RATE.toLocaleString('es-ES')}%`
  }

  Send (values) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.toStringFormValues(values))
      } catch (error) {
        reject(error)
      }
    })
  }

  Submit (formElement) {
    const that = this
    formElement.onsubmit = (event) => {
      event.preventDefault()
      if (that.checkFormValidity(formElement)) {
        that.Send(that.getFormValues(formElement))
          .then(result => confirm(result, 'Your form submited success'))
          .catch(error => alert('Your form submited error', error))
      }
    }
  }

  handleChangeRange (
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

  registerEventsRange (collateral) {
    this.handleChangeRange(
      this.shadowRoot.getElementById('collateral-value-range'),
      this.shadowRoot.getElementById('collateral-value'),
      collateral.minCollateral,
      collateral.maxCollateral
    )
    this.handleChangeRange(
      this.shadowRoot.getElementById('loan-amount-range'),
      this.shadowRoot.getElementById('loan-amount'),
      collateral.minLoan,
      collateral.maxLoan
    )
  }

  handleChangeCollateral (
    collateralElement
  ) {
    const that = this
    collateralElement.addEventListener('change', function (event) {
      const collateralSelected = event.target.value === 'home' ? home : vehicle
      that.loadInstallments(that.shadowRoot.getElementById('installments'), collateralSelected.installments)
      that.registerEventsRange(collateralSelected)
    })
  }

  loadInstallments (objWhereLoad, installments) {
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

  handleChange (inputs) {
    const that = this
    inputs.forEach(element => {
      element.addEventListener('change', function () { that.finalCalculation() })
    })
  }
}
