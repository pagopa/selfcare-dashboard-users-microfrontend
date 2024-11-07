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
        description: "Manage the technical integration and/or operation of the services",
      },
      searchByName: 'Search by name',
      addFilters: 'Filter',
      deleteFilters: 'Remove filters',
      noDataFilter:
        'I filtri che hai applicato non hanno dato nessun risultato. <1><2>Rimuovi filtri</2></1>.',
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
          'Stai per rimuovere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>.<5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        confirmButton: 'Confirm',
        closeButton: 'Cancel',
      },
      deleteSuccess: 'Role removed correctly',
      deleteError: 'It was not possible to remove the role. Try again.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Suspend role',
          message:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Re-enable role',
          message:
            'Vuoi riabilitare <1>{{user}}</1> nel ruolo di <3>{{userRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
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
        userDeleteError: "It was not possible to remove the user. Try again.",
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Remove role',
          message:
            'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <6 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        },
        oneRoleOnProduct: {
          title: 'Delete user',
          message: 'You are about to delete <1>{{user}}</1>.<3 />Do you want to continue?',
        },
        haveMoreProducts:
          'Stai per rimuovere <2>{{user}}</2> dal ruolo di <4>{{productRole}}</4>. <5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        removeRoleButton: 'Remove',
        closeButton: 'Cancel',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Suspend role',
          messageWithOneRole:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Re-enable role',
          messageWithOneRole:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi sospenderlo di nuovo in qualsiasi momento.',
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
          'Seleziona il gruppo che vuoi assegnare a <1>{{user}}</1> per il prodotto <3>{{productTitle}}</3>',
        groupPlaceholder: 'Select the group',
        confirmButton: 'Assign group',
        closeButton: 'Cancel',
      },
      newRoleAssign: 'Assign another role',
      newRoleAssignModal: {
        title: 'Assign role',
        message:
          'Assegna a <1>{{user}}</1> un altro ruolo <3>{{userRole}}</3> sul prodotto <5>{{productTitle}}</5>',
        confirmButton: 'Assign',
        closeButton: 'Cancel',
      },
      deleteUserModal: {
        title: 'Remove role',
        message:
          'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <5/> <6/> Se lo rimuovi da <8>{{product}}</8>, il profilo dell’utente verrà eliminato dall’Area Riservata, poiché non è presente in altri prodotti. Potrai nuovamente aggiungere l’utente, ma dovrai inserire di nuovo i suoi dati anagrafici.',
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
      subTitle:
        'Inserisci i dati dell’utente, indica il prodotto in cui dovrà operare e assegna un ruolo.',
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
          'Stai per assegnare a <1>{{user}}</1> i ruoli <3>{{roles}}</3> sul prodotto <5>{{productTitle}}</5><6><7></7><8></8></6>Confermi di voler continuare?<9></9>',
        confirmButton: 'Assign',
        closeButton: 'Cancel',
      },
      addOneRoleModal: {
        title: 'Assign role',
        message:
          'Vuoi assegnare a <1>{{user}}</1> il ruolo di <3>{{role}}</3> per <5>{{productTitle}}</5>?<7><8></8><9></9></7>',
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
        userNotFind: "It is impossible to locate the desired user",
        invalidEmail: 'The email address is not valid',
        mismatchEmail: 'The email addresses do not correspond',
      },
      editUserSuccess: 'Profile changed correctly',
      editUserError: 'An error occurred when changing the profile. Try again.',
    },
    addProduct: {
      navigation: 'Assign role',
      title: 'Assign a new role',
      subTitle: "Select the product and the role you want to assign to the user.",
      name: 'Name',
      surname: 'Surname',
      fiscalCode: 'Tax code',
    },
  },
  usersPage: {
    title: 'Users',
    generic: {
      subTitle:
        'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.',
    },
    pnpg: {
      subTitle: 'Manage the users that can read the notifications for {{ businessName}}.',
    },
  },
};
