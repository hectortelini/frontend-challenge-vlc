export const template = document.createElement('template')
template.innerHTML = `
<form class="form" name="form">
            <div class="form__fields">
              <div class="field-group">
                <div class="field">
                  <label for="installments">Number of installments</label>
                  <select name="installments" id="installments" required>
                    <option value="24">24</option>
                    <option value="36">36</option>
                    <option value="48">48</option>
                  </select>
                </div>
                <div class="field">
                  <label for="collateral">Collateral</label>
                  <select name="collateral" id="collateral" required>
                    <option value="vehicle">Vehicle</option>
                    <option value="home">Home</option>
                  </select>
                </div>
              </div>
              <div class="collateral-value">
                <div class="field-group">
                  <div class="field">
                    <label for="collateral-value">Collateral Value</label>
                    <input type="text" required name="collateral-value" id="collateral-value" value="14400" />
                  </div>
                  <div class="field">
                    <div class="range">
                      <input type="range" name="collateral-value-range" id="collateral-value-range" min="0" max="100" value="20" step="10">
                      <div class="range__values">
                        <span>12.000</span>
                        <span>24.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="loan">
                <div class="field-group">
                  <div class="field">
                    <label for="loan-amount">Loan Amount</label>
                    <input type="text" required name="loan-amount" id="loan-amount" value="57000">
                  </div>
                  <div class="field">
                    <div class="range">
                      <input type="range" name="loan-amount-range" id="loan-amount-range" min="0" max="100" value="90" step="10">
                      <div class="range__values">
                        <span>30.000</span>
                        <span>60.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form__result">
              <div class="quota__container">
                <h4>Monthly installment</h4>
                <div class="quota">
                  <strong>R$</strong>
                  <span>465,00</span>
                </div>
              </div>
              <div class="amount_container">
                <h4>Total payable</h4>
                <p>R$ 11.112,00</p>
              </div>
              <div class="tax__container">
                <h4>Interest rate (month)</h4>
                <p>111,12%</p>
              </div>
              <button class="button">
                Request
              </button>
            </div>
          </form>
`
