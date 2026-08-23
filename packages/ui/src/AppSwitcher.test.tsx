import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { suiteApps } from '@fleet-works/suite-nav';
import { AppSwitcher } from './AppSwitcher.js';

describe('AppSwitcher', () => {
  it('shows the current app name in the closed-state button', () => {
    const { container } = render(<AppSwitcher currentId="chorus" />);
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    expect(button!.textContent).toContain('Chorus');
  });

  it('opens the menu on click and lists every suite app with the correct href and weight', () => {
    const { container } = render(<AppSwitcher currentId="chorus" />);
    const button = container.querySelector('button')!;

    fireEvent.click(button);

    const menu = container.querySelector('[role="menu"]');
    expect(menu).not.toBeNull();

    const menuItems = Array.from(menu!.querySelectorAll('[role="menuitem"]')) as HTMLAnchorElement[];
    expect(menuItems).toHaveLength(suiteApps.length);

    for (const app of suiteApps) {
      const item = menuItems.find((el) => el.getAttribute('href') === app.url);
      expect(item, `expected a menuitem for ${app.id}`).toBeDefined();
      expect(item!.textContent).toContain(app.name);
      if (app.id === 'chorus') {
        expect(item!.style.fontWeight).toBe('600');
      } else {
        expect(item!.style.fontWeight).toBe('400');
      }
    }
  });
});
