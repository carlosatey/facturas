describe ('Add Invoice', ()=> {
    it('Add invoice to the Table', () => {
        cy.visit('http://localhost:5173')
        cy.contains('Inicio de Sesión')
        cy.get('#email').type('Lora32@yahoo.com', { delay: 50 });
        cy.get('#password').type('password 1', { delay: 50 });
        cy.get('#login_button').click();

        cy.get('#addFactura_button').click();
        cy.get('#number').type('123', { delay: 50 });
        // Seleccionar el input y establecer la fecha
        cy.get('#paymentDate').type('2024-12-12');
        // Marcar un ckeck cuando se usa bibliotecas de componentes como (ChakaraUI)
        cy.get('#paid').click({ force: true }); 
        cy.get('#client').type('testFactura', { delay: 50 });
        cy.get('#createdAt').type('2024-12-20');

        //Boton agregar factura
        cy.get('#create_invoice').click();

        //Para saber que se agrego a la Tabla la factura correctamente
        cy.get('#data-table-invoices tbody tr') // Selecciona todas las filas de la tabla
        .contains('testFactura') // Busca un texto específico en las filas
        .should('exist'); // Verifica que el texto existe

    })
  })