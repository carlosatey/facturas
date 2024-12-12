describe ('Procces Logout', ()=> {
    it('Logout successfully', () => {
        cy.visit('http://localhost:5173')
        cy.get('#email').type('Lora32@yahoo.com', { delay: 50 });
        cy.get('#password').type('password 1', { delay: 50 });
        cy.get('#login_button').click();

        cy.get('#logout_button').click();
    })
  })