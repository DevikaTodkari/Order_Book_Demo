import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps"
import {book_Lover} from '../../../support/POM/book_LoverPOM'
import bookLoverData from '../../../fixtures/book_Lover.json'
import {utility} from '../../../support/Utilities/utility'

let bookLover = new book_Lover()
let utils = new utility()

let discountAmt = 10

Given ('I open a book shop site',()=>{
    utils.visitURL('https://react.simprocloud.com/build/index.html')
})

When ('I select the Drama book',()=>{
    utils.HeadTag().should('be.visible')
    bookLover.SelectDramaBook().check().should('be.checked')
})

And ('I select The Rainbow book from given dropdown and enter the price and units',()=>{
    cy.SelectBook('The Rainbow',1,125)
})


And ('I submit the application',()=>{
    utils.SubmitBtn().click()
})


Then ('I should be able to see the records added in the Transaction Table',()=>{
    utils.TransactionRows().should('be.visible')
   
})


Then ('I verify each fields of the Transaction documents',()=>{
    utils.TransactionRowsData().each(function(el,i){
        expect(el.text()).eq(bookLoverData[i])
    })
})

Then('I verify the discount amount with the amount in the transaction table',()=>{
    bookLover.DiscountInputBox().should('not.exist')
    bookLover.DiscountCheckBox().check().should('be.checked')
    bookLover.DiscountInputBox().should('be.visible').type(discountAmt).should('have.value',discountAmt)
    utils.SubmitBtn().click()
    utils.TransactionRows().should('be.visible')
    bookLover.AmountsSection().as('locator')
    utils.locatorAlias().invoke('text').then(function(txt){
        cy.GetDiscount(txt, discountAmt).then(function(el){
            cy.GetSubtraction(txt,el).then(function(ele){
                utils.locatorAlias().next().next().invoke('text').then(function(el){
                    let amount = el.split(' ')[1].trim()
                        expect(amount).to.eq(ele)
                })
            })
        
        })
        
        })
    })

Then('I should not see the Transaction documents',()=>{
    bookLover.DiscountInputBox().should('not.exist')
    bookLover.DiscountCheckBox().check().should('be.checked')
    bookLover.DiscountInputBox().should('be.visible').type(discountAmt).should('have.value',discountAmt)
    utils.SubmitBtn().click()
    utils.TransactionRows().should('be.visible')
    bookLover.removeTag().click()
    bookLover.DeleteMsg().should('contain','delete')
    bookLover.DeleteAlert().click()
    utils.TransactionRows().should('not.exist')
})
