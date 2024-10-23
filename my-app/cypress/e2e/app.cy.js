describe('App E2E', () => {
    it('should load the app', () => {
      cy.visit('http://localhost:3000') // Replace with your app's URL
      cy.contains('h1', 'PLATFORM FOR PROVIDING QUALITY EDUCATION').should('be.visible')
    })
  })

//   it('should navigate to signup, select student role, and complete registration', () => {
//     cy.visit('http://localhost:3000')
    
//     // Click on SignUp button
//     cy.contains('button', 'SignUp').click()
    
//     // Check if redirected to /role
//     cy.url().should('include', '/role')
    
//     // Select student role
//     cy.contains('Student').click()
    
//     // Fill out the registration form
//     cy.get('input[name="full_name"]').type('John Doe2')
//     cy.get('input[name="email"]').type('john.doe2@example.com')
//     cy.get('input[name="username"]').type('johndoe2')
//     cy.get('input[name="password"]').type('securePassword123')
//     cy.get('input[name="password2"]').type('securePassword123')
    
//     // Submit the form
//     cy.contains('button', 'Sign Up').click()
    
//     // Add assertions to verify successful registration
//     // This could be checking for a success message or redirection to a new page
//     cy.get('.swal2-popup').should('be.visible')
//       .and('contain', 'Registration Success')
//     // or
//     // cy.url().should('include', '/dashboard')
//   })


  it('should navigate to signup, select student role, and complete registration', () => {
    cy.visit('http://localhost:3000')
    
    // Click on SignUp button
    cy.contains('button', 'Login').click()
    
    // Check if redirected to /role
    cy.url().should('include', '/Login')
    
    // Fill out the registration form
    // cy.get('input[name="full_name"]').type('John Doe2')
    cy.get('input[name="email"]').type('john.doe2@example.com')
    // cy.get('input[name="username"]').type('johndoe2')
    cy.get('input[name="password"]').type('securePassword123')
    // cy.get('input[name="password2"]').type('securePassword123')
    
    // Submit the form
    cy.contains('button', 'Sign In').click()
    
    // Add assertions to verify successful registration
    // This could be checking for a success message or redirection to a new page
    cy.get('.swal2-popup').should('be.visible')
      .and('contain', 'Login Success')
    // or
    // cy.url().should('include', '/dashboard')
  })




//   describe('Todo List', () => {
//     beforeEach(() => {
//       cy.visit('http://localhost:3000')
//     })
  
//     it('should add a new todo item', () => {
//       cy.get('[data-test=new-todo]').type('New todo item{enter}')
//       cy.get('[data-test=todo-list]').should('contain', 'New todo item')
//     })
  
//     it('should mark a todo item as completed', () => {
//       cy.get('[data-test=todo-item]').first().find('[data-test=todo-checkbox]').click()
//       cy.get('[data-test=todo-item]').first().should('have.class', 'completed')
//     })
  
//     it('should delete a todo item', () => {
//       cy.get('[data-test=todo-item]').first().find('[data-test=delete-button]').click()
//       cy.get('[data-test=todo-list]').should('not.contain', 'Pay electric bill')
//     })
//   })