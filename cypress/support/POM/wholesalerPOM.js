

export class Wholesaler{
   
    SelectFictionBook(){
        return cy.get('[value="Fiction"]')
    }
   

    PriceErrorMsg(){
        return cy.get('form p').first()
    }

    UnitErrorMsg(){
        return cy.get('form p').last()
    }

    UnitsInputBox(){
        return cy.get('[name="units"]')
    }

    PriceInputBox(){
        return cy.get('[name="price"]')
    }


    UnitsSection(){
        return cy.get('#transactionsection tr td:nth-child(3)')
    }


}