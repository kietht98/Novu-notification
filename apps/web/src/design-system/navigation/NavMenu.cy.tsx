import { NavMenu } from './NavMenu';
import { MemoryRouter as Router } from 'react-router-dom';
import { TestWrapper } from '../../testing';
import { ROUTES } from '../../constants/routes.enum';

describe('NavMenu', () => {
  it('should have active class when clicked menu item', () => {
    const menuItems = [
      {
        icon: null,
        label: 'Home',
        link: ROUTES.HOME,
        testId: 'menu-home',
        rightSide: null,
      },
      {
        icon: null,
        label: 'About',
        link: ROUTES.ABOUT,
        testId: 'menu-about',
        rightSide: null,
      },
      {
        icon: null,
        label: 'Contact',
        link: ROUTES.CONTACT,
        testId: 'menu-contact',
        rightSide: null,
      },
    ];
    const menuHomeItemSelector = menuItems[0].testId;

    cy.mount(
      <Router>
        <TestWrapper>
          <NavMenu menuItems={menuItems} />
        </TestWrapper>
      </Router>
    );

    cy.getByTestId(menuHomeItemSelector).should('have.attr', 'aria-current', 'page');
    cy.get(`a:not([aria-current])`).each(($elem) => {
      cy.wrap($elem).should('not.have.attr', 'aria-current', 'page');
      cy.wrap($elem).click();
      cy.wrap($elem).should('have.attr', 'aria-current', 'page');
    });
  });
});
