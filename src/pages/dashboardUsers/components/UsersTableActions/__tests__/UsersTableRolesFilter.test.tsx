import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import UsersTableRolesFilter from '../UsersTableRolesFilter';
import { UsersTableFiltersConfig } from '../UsersTableFilters';

vi.mock('@pagopa/selfcare-common-frontend/lib/utils/storage', () => ({
  isPagoPaUser: () => true,
}));

vi.mock('../../../../hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

const emptyFilters: UsersTableFiltersConfig = {
  productIds: [],
  productRoles: [],
  partyRoles: [],
  states: [],
};

// Stateful wrapper mirroring how UsersTableFilters/UsersPage manage state,
// so real UI interactions (opening the select, clicking an option) update state.
function Wrapper({ onFiltersChange }: { onFiltersChange: (f: UsersTableFiltersConfig) => void }) {
  const [filters, setFilters] = useState<UsersTableFiltersConfig>(emptyFilters);
  const [searchByName, setSearchByName] = useState('');
  const [disableRemoveFiltersButton, setDisableRemoveFiltersButton] = useState(true);
  const [selectedPartyRoles, setSelectedPartyRoles] = useState<Array<any>>([]);
  const [selectedStates, setSelectedStates] = useState<Array<string>>([]);

  return (
    <UsersTableRolesFilter
      productRolesList={[]}
      productRolesSelected={[]}
      filters={filters}
      onFiltersChange={(f) => {
        setFilters(f);
        onFiltersChange(f);
      }}
      disableFilters={false}
      showSelcRoleGrouped={false}
      loading={false}
      setOpenDialogMobile={vi.fn()}
      searchByName={searchByName}
      setSearchByName={setSearchByName}
      disableRemoveFiltersButton={disableRemoveFiltersButton}
      setDisableRemoveFiltersButton={setDisableRemoveFiltersButton}
      selectedPartyRoles={selectedPartyRoles}
      setSelectedPartyRoles={setSelectedPartyRoles}
      selectedStates={selectedStates}
      setSelectedStates={setSelectedStates}
    />
  );
}

const renderComponent = (onFiltersChange = vi.fn()) => {
  render(<Wrapper onFiltersChange={onFiltersChange} />);
  return { onFiltersChange };
};

test('renders the state filter select with placeholder', () => {
  renderComponent();
  expect(screen.getByText('Stato')).toBeInTheDocument();
});

test('selecting a state option enables filter button and submits states filter', () => {
  const { onFiltersChange } = renderComponent();

  const filterButton = screen.getByRole('button', { name: 'Filtra' });
  expect(filterButton).toBeDisabled();

  const stateSelect = screen.getByText('Stato');
  fireEvent.mouseDown(stateSelect);

  const activeOption = screen.getByText('Attivo');
  fireEvent.click(activeOption);

  expect(filterButton).toBeEnabled();
  fireEvent.click(filterButton);

  expect(onFiltersChange).toHaveBeenCalledWith(expect.objectContaining({ states: ['ACTIVE'] }));
});

test('resetting filters clears selected states', () => {
  const { onFiltersChange } = renderComponent();

  const filterButton = screen.getByRole('button', { name: 'Filtra' });
  const deleteFiltersButton = screen.getByText('Rimuovi filtri');

  fireEvent.mouseDown(screen.getByText('Stato'));
  fireEvent.click(screen.getByText('Attivo'));
  fireEvent.click(filterButton);

  expect(onFiltersChange).toHaveBeenLastCalledWith(expect.objectContaining({ states: ['ACTIVE'] }));

  fireEvent.click(deleteFiltersButton);

  expect(onFiltersChange).toHaveBeenLastCalledWith(expect.objectContaining({ states: [] }));
});
