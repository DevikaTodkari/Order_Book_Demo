export class book_Lover{
   

    SelectDramaBook(){
        return cy.get('[value="Drama"]')
    }

    DiscountInputBox(){
        return cy.get('[class="discountvalue"]')
    }

    DiscountCheckBox(){
        return cy.get('[name="discount"]')
    }
    
    AmountsSection(){
        return cy.get('#transactionsection tr td:nth-child(5)')
    }


    removeTag(){
        return cy.get('.removeRecord')
    }

    DeleteMsg(){
        return cy.get('#deletedialog p')
    }

    DeleteAlert(){
        return cy.contains('Yes, Delete it!')
    }
  
}