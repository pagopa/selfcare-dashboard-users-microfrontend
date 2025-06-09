import { Trans } from 'react-i18next';
import { RoleEnum } from '../../../../api/generated/onboarding/UserDto';
import { PartyUserOnCreation } from '../../../../model/PartyUser';
import { ProductRolesLists } from '../../../../model/ProductRole';
import { checkUserService } from '../../../../services/usersService';

type Props = {
  partyId: string;

  t: any;
  addError: any;
  addNotify: any;
  forwardNextStep: any;
  setAddedUserList: any;
  isAddInBulkEAFlow: boolean;
  isAsyncFlow: boolean;
  userProductId?: string;
  productRoles?: ProductRolesLists;
};

export const useCheckOnboardedUser =
  ({
    partyId,
    userProductId,
    t,
    addError,
    addNotify,
    forwardNextStep,
    setAddedUserList,
    isAddInBulkEAFlow,
    isAsyncFlow,
    productRoles,
  }: Props) =>
  (values: PartyUserOnCreation) => {
    checkUserService(partyId, userProductId ?? '', values.taxCode)
      .then((response) => {
        if (response && response.isUserOnboarded === true) {
          addError({
            id: 'CHECK_ONBOARD_USER_ERROR',
            blocking: false,
            error: new Error(),
            techDescription: `An error occurred while checking if user is onboarded ${partyId}`,
            toNotify: true,
            displayableTitle: t('userEdit.addForm.saveUserError'),
            displayableDescription: '',
            component: 'Toast',
          });
          return;
        }
        if (response && response.isUserOnboarded === false) {
          setAddedUserList([
            {
              name: values.name,
              surname: values.surname,
              taxCode: values.taxCode.toUpperCase(),
              email: values.email.toLowerCase(),
              role: RoleEnum.DELEGATE,
            },
          ]);
          if (isAddInBulkEAFlow) {
            addNotify({
              component: 'SessionModal',
              id: 'ADD_IN_BULK_EA_USER',
              title: t('userEdit.addForm.addUserInBulkModal.title'),
              message: (
                <Trans
                  i18nKey="userEdit.addForm.addUserInBulkModal.message"
                  values={{
                    user: `${values.name} ${values.surname} `,
                    role: `${values.productRoles.map(
                      (r) => productRoles?.groupByProductRole[r].title
                    )}`,
                  }}
                  components={{ 1: <strong />, 3: <strong />, 4: <strong />, 8: <strong /> }}
                >
                  {`<1>{{user}}</1> verrà aggiunto come utente su <3>tutti gli enti aggregati </3> con il ruolo di <4>{{role}}</4>. Potrà gestire e operare su tutti gli enti.`}
                </Trans>
              ),
              confirmLabel: t('userEdit.addForm.addUserInBulkModal.confirmButton'),
              closeLabel: t('userEdit.addForm.addUserInBulkModal.closeButton'),
              onConfirm: forwardNextStep,
            });
            return;
          }
        }
        if (isAsyncFlow) {
          forwardNextStep();
        }
      })
      .catch((reason) => {
        addError({
          id: 'CHECK_ONBOARD_USER_ERROR',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while checking if user is onboarded ${partyId}`,
          toNotify: true,
          displayableTitle: t('userEdit.addForm.saveUserError'),
          displayableDescription: '',
          component: 'Toast',
        });
      });
  };
