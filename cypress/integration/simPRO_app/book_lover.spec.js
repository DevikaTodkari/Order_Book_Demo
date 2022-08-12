import { expect } from "chai"

describe('book shop', () => {


    let userData = [
        "1",
        "The Rainbow",
        "1",
        "$ 125",
        "$ 125",
        "$ 0.00",
        "$ 125.00",
        "-"
    ]
    let discountAmt = 10

    beforeEach(function () {
        cy.visit('https://react.simprocloud.com/build/index.html')
    })

    it('Validate The order was placed correctly. ', () => {
        cy.contains('Order Books').should('be.visible')
        cy.get('[value="Drama"]').check().should('be.checked')
        cy.SelectBook('The Rainbow', 1, 125)
        cy.get('#transactionsection tr td').each(function (el, i) {
            expect(el.text()).eq(userData[i])
        })

    })

    it('Validate Required fields are working correctly', () => {
        cy.contains('Order Books').should('be.visible')
        cy.get('[value="Drama"]').check().should('be.checked')
        cy.SelectBook('The Rainbow', 1, 125)
        cy.get('#transactionsection tr td').each(function (el, i) {
            expect(el.text()).eq(userData[i])
        })

    })

    it.only('Validate The discount has been applied correctly, and the cumulative sum after the discount has been shown.', () => {
        cy.get('[value="Drama"]').check().should('be.checked')
        cy.SelectBook('The Rainbow', 1, 125)
        cy.get('[class="discountvalue"]').should('not.exist')
        cy.get('[name="discount"]').check().should('be.checked')
        cy.get('[class="discountvalue"]').should('be.visible').type(discountAmt).should('have.value', discountAmt)
        cy.get('[name="submit"]').click()
        cy.get('#transactionsection tr').should('be.visible')
        cy.get('#transactionsection tr td:nth-child(5)').as('locator')
        cy.get('@locator').invoke('text').then(function (txt) {
            cy.GetDiscount(txt, discountAmt).then(function(el){
                cy.GetSubtraction(txt,el).then(function(ele){
                    cy.get('@locator').next().next().invoke('text').then(function(el){
                        let amount = el.split(' ')[1].trim()
                            expect(amount).to.eq(ele)
                    })
                })
            
            })


        })
    })


    it('Delete the record and double-check that it was successfully removed.', () => {
        cy.get('[value="Drama"]').check().should('be.checked')
        cy.SelectBook('The Rainbow', 1, 125)
        cy.get('[class="discountvalue"]').should('not.exist')
        cy.get('[name="discount"]').check().should('be.checked')
        cy.get('[class="discountvalue"]').should('be.visible').type(discountAmt).should('have.value', discountAmt)
        cy.get('[name="submit"]').click()
        cy.get('#transactionsection tr').should('be.visible')
        cy.get('.removeRecord').click()
        cy.get('#deletedialog p').should('contain', 'delete')
        cy.contains('Yes, Delete it!').click()
        cy.get('#transactionsection tr').should('not.exist')


    })

})
