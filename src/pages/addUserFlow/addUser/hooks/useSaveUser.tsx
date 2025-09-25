import { UserNotify } from '@pagopa/selfcare-common-frontend/lib/model/UserNotify';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { History } from 'history';
import { TFunction } from 'i18next';
import { Party } from '../../../../model/Party';
import { PartyUserOnCreation } from '../../../../model/PartyUser';
import { Product } from '../../../../model/Product';
import { ProductRolesLists } from '../../../../model/ProductRole';
import { DASHBOARD_USERS_ROUTES } from '../../../../routes';
import { addUserProductRoles, savePartyUser } from '../../../../services/usersService';

type Props = {
  party: Party;
  userProduct?: Product;
  t: TFunction<'translation', undefined>;
  addNotify: (notify: UserNotify) => void;
  addError: (error: any) => void;
  history: History;
  setLoadingSaveUser: (loading: boolean) => void;
  unregisterUnloadEvent: () => void;
  initialFormData: PartyUserOnCreation;
  isPnpgTheOnlyProduct: boolean;
  selectedProduct?: Product;
  productRoles?: ProductRolesLists;
};

export const useSaveUser =
  ({
    party,
    userProduct,
    t,
    addNotify,
    addError,
    history,
    setLoadingSaveUser,
    unregisterUnloadEvent,
    initialFormData,
    isPnpgTheOnlyProduct,
    selectedProduct,
    productRoles,
  }: Props) =>
  (values: PartyUserOnCreation, userId?: string) => {
    setLoadingSaveUser(true);
    const values2submit = {
      ...values,
      taxCode: values.taxCode.toUpperCase(),
      email: values.email.toLowerCase(),
    };

    const partyRole = productRoles?.groupByProductRole[values.productRoles[0]].partyRole;

    if (!userProduct) {
      setLoadingSaveUser(false);
      return;
    }

    const addUserOrRole = userId
      ? addUserProductRoles(party, userProduct, userId, values2submit, partyRole)
      : savePartyUser(party, userProduct, values2submit, partyRole);

    addUserOrRole
      .then((userId) => {
        unregisterUnloadEvent();
        trackEvent(initialFormData.taxCode ? 'USER_ADD_ROLE' : 'USER_ADD', {
          party_id: party.partyId,
          product_id: userProduct?.id,
          product_role: values2submit.productRoles,
        });
        addNotify({
          component: 'Toast',
          id: 'SAVE_PARTY_USER',
          title: initialFormData.taxCode
            ? t('userDetail.actions.successfulAddRole')
            : t('userEdit.addForm.saveUserSuccess'),
          message: '',
        });

        history.push(
          resolvePathVariables(
            selectedProduct && !isPnpgTheOnlyProduct
              ? DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.PARTY_PRODUCT_USER_DETAIL.path
              : DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
            {
              partyId: party.partyId,
              productId: selectedProduct?.id ?? '',
              userId: userId ?? '',
            }
          )
        );
      })
      .catch((reason) =>
        addError({
          id: 'SAVE_PARTY_USER',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while saving party user ${party.partyId}`,
          toNotify: true,
          displayableTitle: userId
            ? t('userDetail.actions.addRoleError')
            : t('userEdit.addForm.saveUserError'),
          displayableDescription: '',
          component: 'Toast',
        })
      )
      .finally(() => setLoadingSaveUser(false));
  };
