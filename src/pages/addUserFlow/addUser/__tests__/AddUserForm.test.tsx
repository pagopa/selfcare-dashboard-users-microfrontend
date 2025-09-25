import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RoleEnum } from '../../../../api/generated/onboarding/UserDto';
import { mockedParties } from '../../../../microcomponents/mock_dashboard/data/party';
import {
  mockedPartyProducts,
  mockedProductRoles,
} from '../../../../microcomponents/mock_dashboard/data/product';
import { productRoles2ProductRolesList } from '../../../../model/ProductRole';
import { renderWithProviders } from '../../../../utils/test-utils';
import AddUserForm from '../components/AddUserForm/AddUserForm';

describe('AddUserForm Component', () => {
  const defaultProps = {
    party: mockedParties[1],
    products: [],
    productsRolesMap: {},
    canEditRegistryData: true,
    initialFormData: {
      name: 'name',
      surname: 'surname',
      taxCode: 'taxCode',
      email: 'emeal@mail.com',
      confirmEmail: 'emeal@mail.com',
      productRoles: [],
      role: RoleEnum.DELEGATE,
      certifiedName: true,
      certifiedSurname: true,
      certifiedMail: true,
    },
    forwardNextStep: jest.fn(),
    setCurrentSelectedProduct: jest.fn(),
    setAddedUserList: jest.fn(),
    isAddInBulkEAFlow: true,
    setIsAddInBulkEAFlow: jest.fn(),
  };

  test('should render AddUserForm with all required fields', () => {
    renderWithProviders(<AddUserForm {...defaultProps} />);

    expect(screen.getByText('Dati utente')).toBeInTheDocument();

    expect(
      screen.getByText((content) =>
        content.includes('Inserisci i dati dell’utente che vuoi aggiungere')
      )
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue('taxCode')).toBeInTheDocument();
    expect(screen.getByDisplayValue('name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('surname')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('emeal@mail.com')[0]).toBeInTheDocument();

    expect(screen.getByText('Indica il prodotto')).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes('Indica per quale prodotto vuoi aggiungere l’utente.')
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Seleziona il prodotto')).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /Indietro/i });
    expect(backButton).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Continua/i })).toBeInTheDocument();

    fireEvent.click(backButton);
  });

  test('should render AddUserForm with the correct initial values', () => {
    renderWithProviders(<AddUserForm {...defaultProps} />);

    expect(screen.getByDisplayValue('taxCode')).toHaveValue('taxCode');
    expect(screen.getByDisplayValue('name')).toHaveValue('name');
    expect(screen.getByDisplayValue('surname')).toHaveValue('surname');
    expect(screen.getAllByDisplayValue('emeal@mail.com')[0]).toHaveValue('emeal@mail.com');
    expect(screen.getAllByDisplayValue('emeal@mail.com')[1]).toHaveValue('emeal@mail.com');
  });

  test('should disable name and surname fields when certifiedName and certifiedSurname are true', () => {
    renderWithProviders(<AddUserForm {...defaultProps} />);

    const nameInput = screen.getByDisplayValue('name');
    const surnameInput = screen.getByDisplayValue('surname');

    expect(nameInput).toBeDisabled();
    expect(surnameInput).toBeDisabled();
  });

  test('should enable Continue button when all required fields are filled and product is selected', () => {
    const propsWithProducts = {
      ...defaultProps,
      products: mockedPartyProducts,
      productsRolesMap: {
        [mockedPartyProducts[0].id]: productRoles2ProductRolesList(mockedProductRoles),
      },
      selectedProduct: mockedPartyProducts[0],
    };

    renderWithProviders(<AddUserForm {...propsWithProducts} />);

    expect(screen.getByRole('button', { name: /Continua/i })).toBeDisabled();

    fireEvent.change(screen.getByDisplayValue('referente-legale'), {
      target: { value: 'referente-legale' },
    });

    const radio = screen.getByDisplayValue('referente-legale');
    fireEvent.click(radio);

  });

  test('should validate tax code format when changed', async () => {
    renderWithProviders(<AddUserForm {...defaultProps} />);

    const taxCodeField = screen.getByDisplayValue('taxCode');

    fireEvent.change(taxCodeField, { target: { value: 'invalid' } });
    fireEvent.blur(taxCodeField);

    await waitFor(() => {
      const errorMessage = screen.queryByText(/Il codice fiscale non è valido/i);
      if (errorMessage) {
        expect(errorMessage).toBeInTheDocument();
      }
    });
  });

  test('should validate email format when changed', async () => {
    renderWithProviders(<AddUserForm {...defaultProps} />);

    const emailField = screen.getByLabelText(/E-mail istituzionale/i);

    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(screen.getByText(/L’indirizzo email non è valido/i)).toBeInTheDocument();
    });
  });

  test('should validate email confirmation matches email', async () => {
    renderWithProviders(<AddUserForm {...defaultProps} />);

    const emailField = screen.getByLabelText(/E-mail istituzionale/i);
    const confirmEmailField = screen.getByLabelText(/Conferma e-mail/i);

    fireEvent.change(emailField, { target: { value: 'valid@example.com' } });
    fireEvent.change(confirmEmailField, { target: { value: 'different@example.com' } });
    fireEvent.blur(confirmEmailField);

    await waitFor(() => {
      expect(screen.getByText(/Gli indirizzi email non corrispondono/i)).toBeInTheDocument();
    });
  });

  test('should render AddUserForm with false props', () => {
    const mockedPartyAgencyOnboarded = mockedParties[4];

    renderWithProviders(
      <AddUserForm
        party={mockedPartyAgencyOnboarded}
        products={[]}
        productsRolesMap={{}}
        canEditRegistryData={true}
        initialFormData={{
          name: 'name',
          surname: 'surname',
          taxCode: 'taxCode',
          email: 'emeal@mail.com',
          confirmEmail: 'emeal@mail.com',
          productRoles: [],
          role: RoleEnum.DELEGATE,
          certifiedName: true,
          certifiedSurname: true,
          certifiedMail: true,
        }}
        forwardNextStep={jest.fn()}
        setCurrentSelectedProduct={jest.fn()}
        setAddedUserList={jest.fn()}
        isAddInBulkEAFlow={true}
        setIsAddInBulkEAFlow={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/Codice Fiscale/i)).toHaveValue('taxCode');

    expect(screen.getByLabelText((label) => label.includes('Nome'))).toHaveValue('name');

    expect(screen.getByLabelText((label) => label.includes('Cognome'))).toHaveValue('surname');

    expect(screen.getByLabelText(/E-mail istituzionale/i)).toHaveValue('emeal@mail.com');
    expect(screen.getByLabelText(/Conferma e-mail/i)).toHaveValue('emeal@mail.com');

    expect(screen.getByRole('button', { name: /Continua/i })).toBeDisabled();
  });
});
