export default {
  session: {
    expired: {
      title: 'Session expired',
      message: 'You are being redirected to the login page...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Users',
    addUser: 'Add a new user',
    editUser: 'Change the user profile',
    exit: 'Exit',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
      },
      rows: {
        isCurrentUser: '(you)',
        suspendedChip: 'Suspended',
        detailPageRedirectButton: 'Access the detail page of',
      },
    },
    filterRole: {
      placeholder: 'All roles',
      admin: {
        title: 'Administrator',
        description: 'You have all permissions and manage the users',
      },
      limited: {
        title: 'Operator',
        description: 'Manage the technical integration and/or operation of the services',
      },
      searchByName: 'Search by name',
      addFilters: 'Filter',
      deleteFilters: 'Remove filters',
      noDataFilter:
        'The filters you applied did not yield any results. <1><2>Remove filters</2></1>.',
      errorOnFetch: 'Sorry, something went wrong. <1><2>Try again</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Select the type of action',
      toolTipInfo: 'The actions are available in the user profile',
      edit: 'Change',
      rehabilitate: 'Re-enable',
      suspend: 'Suspend',
      delete: 'Remove',
      deleteModal: {
        title: 'Remove role',
        message:
          'You are about to remove <1>{{user}}</1> from the role of <3>{{userRole}}</3>.<5 />If you remove them, they will no longer be able to operate on <7>{{productTitle}}</7>. <9 />You can reassign the role at any time.',
        confirmButton: 'Confirm',
        closeButton: 'Cancel',
      },
      deleteSuccess: 'Role removed correctly',
      deleteError: 'It was not possible to remove the role. Try again.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Suspend role',
          message:
            'Do you want to suspend <1>{{user}}</1> from the role of <3>{{userRole}}</3>?<4 />If you suspend them, they will no longer be able to operate on <6>{{productTitle}}</6>. <8 />You can re-enable them at any time.',
        },
        reactivate: {
          title: 'Re-enable role',
          message:
            'Do you want to re-enable <1>{{user}}</1> in the role of <3>{{userRole}}</3>?<4 />If you re-enable them, they will be able to operate on <6>{{productTitle}}</6> again.<8 /> You can suspend them again at any time.',
        },
        confirmButton: 'Confirm',
        closeButton: 'Cancel',
      },
      changeUserRoleSuccess: 'Role {{userStatus}} correctly',
      suspendRoleError: 'It was not possible to suspend the role. Try again.',
      reactivateRoleError: 'It was not possible to re-enable the role. Try again.',
    },
    loadMore: 'Load others',
    addButton: 'Add user',
    tabAll: 'All',
  },
  userDetail: {
    title: 'User profile',
    name: 'Name',
    surname: 'Surname',
    fiscalCode: 'Tax code',
    institutionalEmail: 'Institutional email',
    institution: 'INSTITUTION',
    editButton: 'Change',
    deleteButton: 'Remove',
    backButton: 'Go back',
    actions: {
      delete: {
        userRoleDelete: 'Role removed correctly',
        userDelete: 'User removed correctly',
        userDeleteError: 'It was not possible to remove the user. Try again.',
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Remove role',
          message:
            'Do you want to remove <1>{{user}}</1> from the role of <3>{{role}}</3>? <6 />You can reassign the role at any time.',
        },
        oneRoleOnProduct: {
          title: 'Delete user',
          message: 'You are about to delete <1>{{user}}</1>.<3 />Do you want to continue?',
        },
        haveMoreProducts:
          'You are about to remove <2>{{user}}</2> from the role of <4>{{productRole}}</4>. <5 />If you remove them, they will no longer be able to operate on <7>{{productTitle}}</7>. <9 />You can reassign the role at any time.',
        removeRoleButton: 'Remove',
        closeButton: 'Cancel',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Suspend role',
          messageWithOneRole:
            'Do you want to suspend <1>{{user}}</1> from the role of <3>{{productRole}}</3>?<4 />If you suspend them, they will no longer be able to operate on <6>{{productTitle}}</6>. <8 />You can re-enable them at any time.',
          messageWithMultipleRoles:
            'Do you want to suspend <1>{{user}}</1> from the role of <3>{{productRole}}</3>?<4 />You can re-enable them at any time.',
        },
        reactivate: {
          title: 'Re-enable role',
          messageWithOneRole:
            'Do you want to re-enable <1>{{user}}</1> in the role of <3>{{productRole}}</3>?<4 />If you re-enable them, they will be able to operate on <6>{{productTitle}}</6> again.<8 /> You can suspend them again at any time.',
          messageWithMultipleRoles:
            'Do you want to re-enable <1>{{user}}</1> in the role of <3>{{productRole}}</3>?<4 /> You can suspend them again at any time.',
        },
        confirmButton: 'Re-enable',
        confirmButtonSuspend: 'Suspend',
        closeButton: 'Cancel',
      },
      changeUserStatusSuccess: 'Role {{userStatus}} correctly',
      changeUserStatusSuspendError: 'It was not possible to suspend the role. Try again.',
      changeUserStatusRehabilitateError: 'It was not possible to re-enable the role. Try again.',
      changeUserStatusRemoveError: 'It was not possible to remove the role. Try again.',
      suspendRole: 'Suspend',
      reactivateRole: 'Re-enable',
      deleteButton: 'Remove',
      successfulAddRole: 'Role assigned correctly',
      successfulAddUserToGroup: 'User assigned correctly',
      addRoleError: 'It was not possible to assign the role. Try again.',
      newGroupAssign: 'Assign group',
      newGroupAssignModal: {
        title: 'Assign group',
        message:
          'Select the group you want to assign to <1>{{user}}</1> for product <3>{{productTitle}}</3>',
        groupPlaceholder: 'Select the group',
        confirmButton: 'Assign group',
        closeButton: 'Cancel',
      },
      newRoleAssign: 'Assign another role',
      newRoleAssignModal: {
        title: 'Assign role',
        message:
          'Assign <1>{{user}}</1> another role <3>{{userRole}}</3> for the product <5>{{productTitle}}</5>',
        confirmButton: 'Assign',
        closeButton: 'Cancel',
      },
      deleteUserModal: {
        title: 'Remove role',
        message:
          "Do you want to remove <1>{{user}}</1> from the role of <3>{{role}}</3>? <5/> <6/> If you remove it from <8>{{product}}</8>, the user's profile will be deleted from the Area Riservata, as it is not present in other products. You will be able to add the user again, but you will have to enter their personal data again.",
        confirmButton: 'Remove',
        closeButton: 'Cancel',
      },
      deleteProductUserModal: {
        title: 'Remove role',
        message: 'You are about to delete <1>{{user}}</1>.<3 />Do you want to continue?',
        confirmButton: 'Remove',
        closeButton: 'Cancel',
      },
    },
    productSection: {
      title: 'Roles',
      addButton: 'Assign role',
    },
    pathDescription: 'Users',
    selfCareRole: 'ROLE ON SELF CARE',
    suspended: 'suspended',
    rehabilitated: 're-enabled',
    group: 'Groups',
    role: 'Role',
    statusLabel: 'Suspended',
    infoIcon: 'You do not have the permissions to manage this product',
    removeRoleBannerText:
      'Per rimuovere un Amministratore, segui le indicazioni che trovi in <1>questa pagina</1>.',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Incorrect or different than the fiscal code',
      surname: 'Incorrect or different than the fiscal code',
    },
    addForm: {
      title: 'Add a new user',
      subTitle: "Enter the user's details, select a product and assign it a role.",
      userData: {
        label: 'User data',
        subTitle: 'Enter the data for the user you want to add.',
      },
      fiscalCode: {
        label: 'Tax code',
      },
      name: {
        label: 'Name',
      },
      surname: {
        label: 'Surname',
      },
      institutionalEmail: {
        label: 'Institutional email',
      },
      confirmInstitutionalEmail: {
        label: 'Confirm email',
      },
      product: {
        title: 'Indicate the product',
        subTitle: 'Indicate for which product you want to add the user.',
        selectLabel: 'Select the product',
      },
      role: {
        title: 'Select the role',
        subTitle: 'Select the role you want to assign to the user.',
        documentationLink: 'Questions? Consult the manual',
        adminTooltip:
          'Per aggiungere questo ruolo è richiesta la sottoscrizione di un modulo da parte del Legale Rappresentante',
      },
      addLegalRepresentative: {
        title: 'Indicate the Legal representative',
        subTitle:
          'Firmerà il Modulo di aggiunta per i nuovi Amministratori, inviato alla PEC dell’ente, per autorizzarli ad operare sul prodotto <strong>{{productName}}</strong> per il tuo ente.',
        taxCode: 'Tax code',
        name: 'Name',
        surname: 'Surname',
        institutionalEmail: 'Institutional email',
        changeManagerModalTitle: 'You are adding a new Legal representative',
        changeManagerModalMessage:
          'I dati del Legale Rappresentante inseriti sono diversi da quelli indicati in precedenza. Vuoi continuare?',
      },
      backButton: 'Go back',
      continueButton: 'Continue',
      errors: {
        invalidFiscalCode: 'The entered fiscal code is not valid ',
        invalidEmail: 'The email address is not valid',
        mismatchEmail: 'The email addresses do not correspond',
      },
      saveUserSuccess: 'User added correctly',
      saveUserError: 'You already added this user.',
      addMultiRoleModal: {
        title: 'Assign role',
        message:
          'You are about to assign <1>{{user}}</1> the roles <3>{{roles}}</3> for the product < 5 >{{productTitle}}</5>< 6 >< 7 ></7>< 8 ></8></6>Are you sure you want to continue?<9></9>',
        confirmButton: 'Assign',
        closeButton: 'Cancel',
      },
      addOneRoleModal: {
        title: 'Assign role',
        message:
          'Do you want to assign <1>{{user}}</1> the role of <3>{{role}}</3> for <5>{{productTitle}}</5>?<7><8></8><9></9></7>',
        confirmButton: 'Assign',
        closeButton: 'Cancel',
      },
    },
    editRegistryForm: {
      title: 'Change the user profile',
      fiscalCode: {
        label: 'Tax code',
      },
      name: {
        label: 'Name',
      },
      surname: {
        label: 'Surname',
      },
      institutionalEmail: {
        label: 'Institutional email',
      },
      confirmInstitutionalEmail: {
        label: 'Confirm email',
      },
      backButton: 'Go back',
      confirmButton: 'Confirm',
      errors: {
        userNotFind: 'It is impossible to locate the desired user',
        invalidEmail: 'The email address is not valid',
        mismatchEmail: 'The email addresses do not correspond',
      },
      editUserSuccess: 'Profile changed correctly',
      editUserError: 'An error occurred when changing the profile. Try again.',
    },
    addProduct: {
      navigation: 'Assign role',
      title: 'Assign a new role',
      subTitle: 'Select the product and the role you want to assign to the user.',
      name: 'Name',
      surname: 'Surname',
      fiscalCode: 'Tax code',
    },
  },
  usersPage: {
    title: 'Users',
    generic: {
      subTitle:
        'View and manage the roles assigned to users for the products to which the organisation has joined.',
    },
    pnpg: {
      subTitle: 'Manage the users that can read the notifications for {{ businessName}}.',
    },
  },
};
