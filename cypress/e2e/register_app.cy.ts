describe ('Procces Register', ()=> {
  it('Register successfully', () => {
      cy.visit('http://localhost:5173')
      cy.contains('Registrarse').click();
      cy.url().should('include', '/register');
      cy.contains('Registro')
      cy.get('#name').type('Carlos', { delay: 100 });
      cy.get('#lastName').type('Alberto', { delay: 100 });
      cy.get('#email').type('ctey123@gmail.com', { delay: 100 });
      cy.get('#password').type('Password 1', { delay: 100 });
      cy.get('#confirmPassword').type('Password 1', { delay: 100 });
      cy.get('#phone').clear(); 
      cy.get('#phone').type('634345458', { delay: 100 });
      cy.get('#register_button').click();
  })
})