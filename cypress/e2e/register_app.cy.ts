describe ('Procces Register', ()=> {
  it('Register successfully', () => {
      cy.visit('http://localhost:5173')
      cy.contains('Registrarse').click();
      cy.url().should('include', '/register');
      cy.contains('Registro')
      cy.get('#name').type('Carlos', { delay: 50 });
      cy.get('#lastName').type('Alberto', { delay: 50 });
      cy.get('#email').type('ctey123@gmail.com', { delay: 50 });
      cy.get('#password').type('Password 1', { delay: 50 });
      cy.get('#confirmPassword').type('Password 1', { delay: 50 });
      cy.get('#phone').clear(); 
      cy.get('#phone').type('634345458', { delay: 50 });
      cy.get('#register_button').click();
  })
})