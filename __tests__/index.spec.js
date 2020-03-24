/* <!--
  =========================================================
  Que tal aumentar o coverage para que ele comece a passar
  nos critérios do desafio?

  Objetivo: Alcançar 80% de cobertura, mas não se preocupe
  se não chegar a alcançar a objetivo, faça o quanto você
  acha que é necessário para garantir segurança quando um
  outro amigo for mexer no mesmo código que você :)

  Confira nossas taxas de coberturas atuais :(

  ----------|----------|----------|----------|----------|-------------------|
  File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
  ----------|----------|----------|----------|----------|-------------------|
  All files |    15.79 |        0 |     9.52 |    14.29 |                   |
  index.js  |    15.79 |        0 |     9.52 |    14.29 |... 72,76,78,83,91 |
  ----------|----------|----------|----------|----------|-------------------|
  Jest: Uncovered count for statements (32)exceeds global threshold (10)
  Jest: "global" coverage threshold for branches (80%) not met: 0%
  Jest: "global" coverage threshold for lines (80%) not met: 14.29%
  Jest: "global" coverage threshold for functions (80%) not met: 9.52%
--> */

import CreditasChallenge from '../src/index'
import CreditasForm from '../src/components/CreditasForm.component'
import CreditasHeader from '../src/components/CreditasHeader.component'

function initializeAppMock () {
  document.body.innerHTML = `
    <form class="form" data-testid="form">
      <label for="collateral-value">Collateral Amount</label>
      <input id="collateral-value" required />
      <button type="button"></button>
    </form>
  `
}

function clean () {
  document.body.innerHTML = ''
}

const creditasForm = Object.create(CreditasForm.prototype)
const creditasHeader = Object.create(CreditasHeader.prototype)

describe('Creditas Challenge', () => {
  beforeEach(() => {
    // CreditasForm.mockClear()
    initializeAppMock()
  })

  afterEach(() => {
    clean()
  })

  describe('Method: checkFormValidity', () => {
    it('should return true when form has valid', () => {
      const form = document.querySelector('.form')
      const input = document.querySelector('input')
      input.value = 10
      expect(creditasForm.checkFormValidity(form)).toBeTruthy()
    })

    it('should return false when form has not valid', () => {
      const form = document.querySelector('.form')
      expect(creditasForm.checkFormValidity(form)).toBeFalsy()
    })
  })

  describe('Method: Submit', () => {
    it('should add event listener to submit data form', () => {
      const container = document.querySelector('.form')
      creditasForm.Submit(container)
    })
  })

  describe('Method: getFormValues', () => {
    it('have one element', () => {
      const form = document.querySelector('.form')
      const formValues = creditasForm.getFormValues(form)
      expect(formValues).toHaveLength(1)
    })

    it('have value', () => {
      const form = document.querySelector('.form')
      const input = document.querySelector('input')
      input.value = 10
      const formValues = creditasForm.getFormValues(form)
      expect(Number(formValues[0].value)).toBe(10)
    })
  })

  describe('Method: toStringFormValues', () => {
    it('have right result', () => {
      const form = document.querySelector('.form')
      const formValues = creditasForm.getFormValues(form)
      formValues.push({ field: 'installments', value: 120 })
      formValues.push({ field: 'loan-amount', value: 5000 })
      const result = creditasForm.toStringFormValues(formValues)
      expect(result).toContain('6036')
    })
  })
})
