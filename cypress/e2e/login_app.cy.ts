describe ('Procces Login', ()=> {
  it('Logs in successfully with valid credentials', () => {
      cy.visit('http://localhost:5173')
      cy.contains('Inicio de Sesión')
      cy.get('#email').type('Lora32@yahoo.com', { delay: 50 });
      cy.get('#password').type('password 1', { delay: 50 });
      cy.get('#login_button').click();
  })
})