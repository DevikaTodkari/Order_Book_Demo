///<reference types = "cypress"/>
import data from '../../fixtures/Data.json'

describe('book shop',()=>{

    let units=0;
    let price=0;
    let TotAmount;

   

    beforeEach(function(){
        cy.visit('https://react.simprocloud.com/build/index.html')
    })

    
    it.only('Validate The order was placed correctly.',()=>{
       
        cy.contains('Order Books').should('be.visible')
        cy.get('[value="Fiction"]').should('be.checked')
        cy.SelectBook('Harry Potter',50,35)
        cy.get('[name="submit"]').click()
        cy.get('#transactionsection tr').should('be.visible')
        data.forEach(function(el){
            let ab = el
            cy.log(ab)
            
        })
        // cy.get('#transactionsection tr td').each(function(el,i){
        //         expect(el.text()).eq(userData[i])
        //     })
        })


        it('Validate Required fields are working correctly',()=>{
            cy.contains('Order Books').should('be.visible')
            cy.get('[value="Fiction"]').should('be.checked')
            cy.SelectBook('Harry Potter',50,35)
            cy.get('[name="submit"]').click()
            cy.get('#transactionsection tr').should('be.visible')

        })

        it('Transaction documents have been updated properly.',()=>{
            cy.contains('Order Books').should('be.visible')
            cy.get('[value="Fiction"]').should('be.checked')
            cy.SelectBook('Harry Potter',50,35)
            cy.get('[name="submit"]').click()
            cy.get('#transactionsection tr').should('be.visible')
            cy.get('#transactionsection tr td').each(function(el,i){
                expect(el.text()).eq(userData[i])
            })
        })

        it('Validate The total amount has been correctly applied.',()=>{
            cy.contains('Order Books').should('be.visible')
            cy.get('[value="Fiction"]').should('be.checked')
            cy.SelectBook('Harry Potter',50,35)
            cy.get('[name="submit"]').click()
            cy.get('#transactionsection tr').should('be.visible')
            cy.get('#transactionsection tr td').each(function(el,i){
                expect(el.text()).eq(userData[i])
            })

            cy.get('#transactionsection tr td:nth-child(3)').as('locator')
            cy.get('@locator').invoke('text').then(function(txt){
                units = txt
                
                cy.log(typeof(units))
                cy.log(units)

            })
            cy.get('@locator').next().invoke('text').then(function(txt){
                
                 price = txt.split(' ')[1].trim()
                 cy.log(typeof(price))
                 cy.log(price)
                 TotAmount = Number(units)*Number(price)
                 cy.log(`${TotAmount} is totalamount`)
                
            })
            cy.get('@locator').next().next().invoke('text').then(function(txt){
                expect(Number(txt.split(' ')[1].trim())).to.eq(TotAmount)
            })
            
        })

        })





