// ***********************************************
import Wholesaler from '../support/POM/wholesalerPOM'


// let saler = new Wholesaler()


// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// let discountAmt=10


Cypress.Commands.add('SelectBook',function(bookname,units,price){
    cy.get('.bookoptions').select(bookname)
    cy.get('.bookoptions').should('have.value',bookname)
    cy.get('[name="units"]').clear().should('be.empty').type(units).should('have.value',units)
    cy.get('[name="price"]').clear().should('be.empty').type(price).should('have.value',price)
    
})

Cypress.Commands.add('GetDiscount',function(txt,discountAmt){
    let dis  = txt.split(' ')[1].trim()
            let discountPrice = (Number(dis)/Number(discountAmt)).toFixed(2)
            cy.get('@locator').next().invoke('text').then(function(txt){
                expect(txt.split(' ')[1].trim()).to.eq(discountPrice)
                return discountPrice
            })
  
})

Cypress.Commands.add('GetSubtraction',function(txt,el){
    let Amount = txt.split(' ')[1].trim()
        let FinalAmount = Number(Amount)-el
        return FinalAmount.toFixed(2)
})
