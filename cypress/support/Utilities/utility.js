export class utility {
    
    visitURL(url){
        return cy.visit(url)
    }

    HeadTag(){
        return cy.contains('Order Books')
    }

    SubmitBtn(){
        return cy.get('[name="submit"]')
    }

    TransactionRows(){
        return cy.get('#transactionsection tr')
    }

    TransactionRowsData(){
        return cy.get('#transactionsection tr td')
    }

    
    locatorAlias(){
        return cy.get('@locator')
    }
}