describe('my to-do app', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
  })

  it('displays three todo tasks by default', () => {
    cy.get('.todo-list li').should('have.length', 3)

    cy.get('.todo-list li .todo-label')
      .first()
      .should('have.text', 'Eat')
    cy.get('.todo-list li .todo-label')
      .last()
      .should('have.text', 'Repeat')
  })

  it('can add new todo tasks', () => {
    const newTask = 'Play'

    cy.get('#new-todo-input').type(`${newTask}{enter}`)

    cy.get('.todo-list li .todo-label')
      .should('have.length', 4)
      .last()
      .should('have.text', newTask)
  })

  it('can check off an task as completed', () => {
    cy.contains('Sleep')
      .parent()
      .find('input[type=checkbox]')
      .click()

    cy.contains('Sleep')
      .parent()
      .find('input[type=checkbox]')
      .should('have.attr', 'checked')
  })

  it('can uncheck an task', () => {
    cy.contains('Eat')
      .parent()
      .find('input[checked]')
      .click()

    cy.contains('Eat')
      .parent()
      .find('input[type=checkbox]')
      .should('not.have.attr', 'checked')
  })

  it('can edit a task', () => {
    cy.contains('Eat')
      .then(($label) => {
        const id = $label.attr('for');
        const editedTask = 'Study';

        cy.contains('Eat')
          .parent()
          .parent()
          .find('button')
          .first()
          .should('have.text', 'Edit Eat')
          .click()
    
        cy.get(`input[id=${id}]`).type(`${editedTask}{enter}`)

        cy.get(`label[for=${id}]`).should('have.text', editedTask)
      })
  })

  it('can delete a task', () => {
    cy.contains('Sleep')
      .parent()
      .parent()
      .find('button')
      .last()
      .should('have.text', 'Delete Sleep')
      .click()      

    cy.contains('Sleep').should('not.exist')
  })

  context('with a checked task', () => {
    beforeEach(() => {
      cy.contains('Sleep')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('can filter for uncompleted tasks', () => {
      cy.contains('Active').click()

      cy.get('.todo-list li .todo-label')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Repeat')

      cy.contains('Sleep').should('not.exist')
    })

    it('can filter for completed tasks', () => {
      cy.contains('Completed').click()

      cy.get('.todo-list li .todo-label')
        .should('have.length', 2)
        .first()
        .should('have.text', 'Eat')

      cy.contains('Repeat').should('not.exist')
    })
  })
})
