import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps"
import {Wholesaler} from '../../../support/POM/wholesalerPOM'
import WholesalerData from '../../../fixtures/wholesaler.json'
import {utility} from '../../../support/Utilities/utility'



let saler = new Wholesaler()
let utils = new utility()

let units=0;
let price=0;
let TotAmount;


Given ('I open a book shop site',()=>{
    utils.visitURL('https://react.simprocloud.com/build/index.html')
})

When ('I select the fiction book',()=>{
    utils.HeadTag().should('be.visible')
    saler.SelectFictionBook().should('be.checked')
})

And ('I select The harry pooter book from given dropdown and enter the price and units',()=>{
    cy.SelectBook('Harry Potter',50,35)
})


And ('I submit the application',()=>{
    utils.SubmitBtn().click()
})

When ('I select The harry pooter book from given dropdown and enter valid price and units',()=>{
    cy.SelectBook('Harry Potter',50,35)
    utils.SubmitBtn().click()
})

Then ('form should get submitted successfully',()=>{
    utils.TransactionRows().should('be.visible')
})

When ('When I select The harry pooter book from given dropdown and enter Invalid price and units',()=>{
    cy.SelectBook('Harry Potter',50,35.80)
    utils.SubmitBtn().click()
})

Then ('I should see the error message',()=>{
    saler.UnitErrorMsg().should('have.text','Invalid price')
})

When ('I am not entering any data and sumbitting the form',()=>{
    utils.SubmitBtn().click()

})

Then ('I should get error message for both fields',()=>{
    saler.PriceErrorMsg().should('have.text','Input is not valid')
    saler.UnitErrorMsg().should('have.text','Price is required')
})

Then ('I should be able to see the records added in the Transaction Table',()=>{
    utils.TransactionRows().should('be.visible')
    
})


Then ('I verify each fields of the Transaction documents',()=>{
    utils.TransactionRowsData().each(function(el,i){
      
        expect(el.text()).eq(WholesalerData[i])
    })
})

Then('I should be able to the correct Amount displayed in Amount section',()=>{
    saler.UnitsSection().as('locator')
    utils.locatorAlias().invoke('text').then(function(txt){
        units = txt

    })

    utils.locatorAlias().next().invoke('text').then(function(txt){
        
         price = txt.split(' ')[1].trim()
         TotAmount = Number(units)*Number(price)
         cy.log(`${TotAmount} is totalamount`)
        
    })
    utils.locatorAlias().next().next().invoke('text').then(function(txt){
        expect(Number(txt.split(' ')[1].trim())).to.eq(TotAmount)
    })
})