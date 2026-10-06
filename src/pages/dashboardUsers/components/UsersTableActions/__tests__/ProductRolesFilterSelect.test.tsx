import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from 'i18next';
import { useState } from 'react';
import { UserRole, UserRoleFilters } from '../../../../../model/Party';
import { ProductRole } from '../../../../../model/ProductRole';
import { ProductRolesFilterSelect } from '../ProductRolesFilterSelect';
import { emptySelcRoleGroup, labels, ProductRolesGroupByTitle } from '../helpers';

const productRoles: Array<ProductRole> = [
  {
    productId: 'product-one',
    partyRole: 'DELEGATE',
    selcRole: 'ADMIN',
    productRole: 'backend-admin',
    title: 'Ruolo backend condiviso',
    description: 'Descrizione backend amministrativa',
    phasesAdditionAllowed: ['dashboard'],
  },
  {
    productId: 'product-two',
    partyRole: 'OPERATOR',
    selcRole: 'LIMITED',
    productRole: 'backend-operator',
    title: 'Ruolo backend condiviso',
    description: 'Descrizione backend operativa',
    phasesAdditionAllowed: ['dashboard'],
  },
];

function Wrapper({
  grouped = true,
  onSelection = vi.fn(),
}: {
  grouped?: boolean;
  onSelection?: (roles: Array<ProductRole>) => void;
}) {
  const [selected, setSelected] = useState<{
    [role in UserRoleFilters]: ProductRolesGroupByTitle;
  }>(emptySelcRoleGroup);

  const updateSelection = (role: UserRole, group: ProductRolesGroupByTitle) => {
    if (role !== 'ADMIN' && role !== 'LIMITED') {
      throw new Error(`Unexpected filter role: ${role}`);
    }
    const next = { ...selected, [role]: group };
    setSelected(next);
    onSelection(Object.values(next).flatMap((roles) => Object.values(roles).flat()));
  };

  return (
    <ProductRolesFilterSelect
      productRolesList={productRoles}
      productRoleCheckedBySelcRole={selected}
      showSelcRoleGrouped={grouped}
      handleUserRole={(isSelected, group, role) =>
        updateSelection(role, isSelected ? {} : group)
      }
      handleProductRole={(isSelected, group, role, title, roles) =>
        updateSelection(
          role,
          isSelected
            ? Object.fromEntries(Object.entries(group).filter(([key]) => key !== title))
            : { ...group, [title]: roles }
        )
      }
    />
  );
}

const openSelect = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.tab();
  expect(screen.getByRole('combobox')).toHaveFocus();
  await user.keyboard('{Enter}');
};

test('group options expose their visible titles and descriptions without extra tab stops', async () => {
  const user = userEvent.setup();
  render(<Wrapper />);
  await openSelect(user);

  (['ADMIN', 'LIMITED'] as const).forEach((role) => {
    const title = i18n.t(labels[role].titleKey);
    const description = i18n.t(labels[role].descriptionKey);
    const option = screen.getByRole('option', { name: title });
    const checkbox = within(option).getByRole('checkbox', { name: title });

    expect(option).toHaveAccessibleName(title);
    expect(option).toHaveAccessibleDescription(description);
    expect(checkbox).toHaveAccessibleDescription(description);
    expect(checkbox).toHaveAttribute('tabindex', '-1');
    expect(document.getElementById(option.getAttribute('aria-labelledby')!)).toHaveTextContent(title);
    const descriptionElement = document.getElementById(option.getAttribute('aria-describedby')!);
    expect(descriptionElement).toHaveTextContent(description);
    expect(descriptionElement).not.toHaveAttribute('tabindex');
  });
});

test('keyboard navigation selects and deselects groups while retaining multi-selection', async () => {
  const user = userEvent.setup();
  const onSelection = vi.fn();
  render(<Wrapper onSelection={onSelection} />);
  await openSelect(user);

  const admin = screen.getByRole('option', { name: i18n.t(labels.ADMIN.titleKey) });
  const operator = screen.getByRole('option', { name: i18n.t(labels.LIMITED.titleKey) });
  expect(admin).toHaveFocus();
  await user.keyboard('{Enter}');
  expect(admin).toHaveAttribute('aria-selected', 'true');
  expect(onSelection).toHaveBeenLastCalledWith([productRoles[0]]);

  await user.keyboard('{ArrowDown}{ArrowDown}');
  expect(operator).toHaveFocus();
  await user.keyboard('{Enter}');
  expect(operator).toHaveAttribute('aria-selected', 'true');
  expect(onSelection).toHaveBeenLastCalledWith(productRoles);

  await user.keyboard('{ArrowUp}{ArrowUp}{Enter}');
  expect(admin).toHaveAttribute('aria-selected', 'false');
  expect(onSelection).toHaveBeenLastCalledWith([productRoles[1]]);
  expect(onSelection).toHaveBeenCalledTimes(3);

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(screen.getByRole('combobox')).toHaveFocus();
});

test.each(['option', 'title', 'description', 'checkbox'] as const)(
  'clicking a group %s updates selection exactly once',
  async (target) => {
    const user = userEvent.setup();
    const onSelection = vi.fn();
    render(<Wrapper onSelection={onSelection} />);
    await openSelect(user);
    const title = i18n.t(labels.ADMIN.titleKey);
    const option = screen.getByRole('option', { name: title });
    const targets = {
      option,
      title: within(option).getByText(title),
      description: within(option).getByText(i18n.t(labels.ADMIN.descriptionKey)),
      checkbox: within(option).getByRole('checkbox', { name: title }),
    };

    await user.click(targets[target]);
    expect(onSelection).toHaveBeenCalledTimes(1);
    expect(onSelection).toHaveBeenLastCalledWith([productRoles[0]]);
    expect(option).toHaveAttribute('aria-selected', 'true');
  }
);

test('multiple instances have unique description and title IDs', async () => {
  const user = userEvent.setup();
  render(
    <>
      <Wrapper />
      <Wrapper />
    </>
  );
  const selects = screen.getAllByRole('combobox');
  await user.click(selects[0]);
  const first = screen.getByRole('option', { name: i18n.t(labels.ADMIN.titleKey) });
  const firstTitleId = first.getAttribute('aria-labelledby');
  const firstDescriptionId = first.getAttribute('aria-describedby');
  await user.keyboard('{Escape}');
  await user.click(selects[1]);
  const second = screen.getByRole('option', { name: i18n.t(labels.ADMIN.titleKey) });

  expect(second.getAttribute('aria-labelledby')).not.toBe(firstTitleId);
  expect(second.getAttribute('aria-describedby')).not.toBe(firstDescriptionId);
  expect(second).toHaveAccessibleDescription(i18n.t(labels.ADMIN.descriptionKey));
});

test('the accessible description follows changes to the visible translated text', async () => {
  const user = userEvent.setup();
  const { rerender } = render(<Wrapper />);
  await openSelect(user);
  const original = i18n.t(labels.ADMIN.descriptionKey);
  const updated = 'Descrizione aggiornata per il gruppo';

  try {
    i18n.addResource('it', 'translation', labels.ADMIN.descriptionKey, updated);
    rerender(<Wrapper />);
    const option = screen.getByRole('option', { name: i18n.t(labels.ADMIN.titleKey) });
    expect(option).toHaveAccessibleDescription(updated);
    expect(within(option).getByText(updated)).toBeVisible();
  } finally {
    i18n.addResource('it', 'translation', labels.ADMIN.descriptionKey, original);
  }
});

test('ungrouped backend roles remain independently selectable without dangling descriptions', async () => {
  const user = userEvent.setup();
  const onSelection = vi.fn();
  render(<Wrapper grouped={false} onSelection={onSelection} />);
  await openSelect(user);
  const options = screen.getAllByRole('option', { name: productRoles[0].title });

  expect(options).toHaveLength(2);
  options.forEach((option) => {
    expect(option).not.toHaveAttribute('aria-describedby');
    expect(within(option).getByRole('checkbox')).toHaveAttribute('tabindex', '-1');
  });
  expect(screen.queryByText(i18n.t(labels.ADMIN.descriptionKey))).not.toBeInTheDocument();
  expect(screen.queryByText(productRoles[0].description)).not.toBeInTheDocument();

  await user.keyboard('{Enter}{ArrowDown}{Enter}');
  expect(onSelection).toHaveBeenCalledTimes(2);
  expect(onSelection).toHaveBeenLastCalledWith(productRoles);
  options.forEach((option) => expect(option).toHaveAttribute('aria-selected', 'true'));
});
