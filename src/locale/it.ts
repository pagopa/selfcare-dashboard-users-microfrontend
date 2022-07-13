export default {
  session: {
    expired: {
      title: 'Sessione scaduta',
      message: 'Stai per essere rediretto alla pagina di login...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Utenti',
    addUser: 'Aggiungi nuovo utente',
    editUser: 'Modifica il profilo utente',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Nome',
        email: 'Email',
        role: 'Ruolo',
      },
    },
    filterRole: {
      placeholder: 'Tutti i ruoli',
      admin: {
        title: 'Amministratore',
        description: 'Ha tutti i permessi e gestisce gli utenti',
      },
      limited: {
        title: 'Operatore',
        description: "Gestisce l’integrazione tecnologica e/o l'operatività dei servizi",
      },
      addFiltersButton: 'Filtra',
      deleteFiltersButton: 'Annulla filtri',
      noDataFilter:
        'I filtri che hai applicato non hanno dato nessun risultato. <1><2>Rimuovi filtri</2></1>.',
      errorOnFetch: 'Spiacenti, qualcosa è andato storto. <1><2>Riprova</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Seleziona il tipo di azione',
      toolTipInfo: 'Le azioni sono disponibili nel profilo dell’utente',
      edit: 'Modifica',
      rehabilitate: 'Riabilita',
      suspend: 'Sospendi',
      delete: 'Rimuovi',
      deleteModal: {
        title: 'Rimuovi ruolo',
        message:
          'Stai per rimuovere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>.<5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      deleteSuccess: 'Ruolo rimosso correttamente',
      deleteError: 'Non è stato possibile rimuovere il ruolo. Riprova.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Sospendi ruolo',
          message:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Riabilita ruolo',
          message:
            'Vuoi riabilitare <1>{{user}}</1> nel ruolo di <3>{{userRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
        },
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      changeUserRoleSuccess: 'Ruolo {{userStatus}} correttamente',
      suspendRoleError: 'Non è stato possibile sospendere il ruolo. Riprova.',
      reactivateRoleError: 'Non è stato possibile riabilitare il ruolo. Riprova.',
    },
    loadMore: 'Carica altri',
    addButton: 'Aggiungi utente',
  },
  userDetail: {
    title: 'Profilo Utente',
    name: 'Nome',
    surname: 'Cognome',
    fiscalCode: 'Codice Fiscale',
    institutionalEmail: 'Email istituzionale',
    institution: 'ENTE',
    editButton: 'Modifica',
    deleteButton: 'Rimuovi',
    backButton: 'Indietro',
    actions: {
      delete: {
        userRoleDelete: 'Ruolo rimosso correttamente',
        userDelete: 'Utente rimosso correttamente',
        userDeleteError: "Non è stato possibile rimuovere l'utente. Riprova.",
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Rimuovi Ruolo',
          message:
            'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <6 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        },
        oneRoleOnProduct: {
          title: 'Elimina Utente',
          message: 'Stai per eliminare <1>{{user}}</1>.<3 />Vuoi continuare?',
        },
        haveMoreProducts:
          'Stai per rimuovere <2>{{user}}</2> dal ruolo di <4>{{productRole}}</4>. <5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        removeRoleButton: 'Rimuovi',
        closeButton: 'Annulla',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Sospendi ruolo',
          messageWithOneRole:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. Puoi riabilitarlo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Riabilita ruolo',
          messageWithOneRole:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi sospenderlo di nuovo in qualsiasi momento.',
        },
        confirmButton: 'Riabilita',
        confirmButtonSuspend: 'Sospendi',
        closeButton: 'Annulla',
      },
      changeUserStatusSuccess: 'Ruolo {{userStatus}} correttamente',
      changeUserStatusSuspendError: 'Non è stato possibile sospendere il ruolo. Riprova.',
      changeUserStatusRehabilitateError: 'Non è stato possibile riabilitare il ruolo. Riprova.',
      changeUserStatusRemoveError: 'Non è stato possibile rimuovere il ruolo. Riprova.',
      suspendRole: 'Sospendi',
      reactivateRole: 'Riabilita',
      deleteButton: 'Rimuovi',
      successfulAddRole: 'Ruolo assegnato correttamente',
      addRoleError: 'Non è stato possibile assegnare il ruolo. Riprova.',
      newRoleAssign: 'Assegna un altro ruolo',
      newRoleAssignModal: {
        title: 'Assegna ruolo',
        message:
          'Assegna a <1>{{user}}</1> un altro ruolo <3>{{userRole}}</3> sul prodotto <5>{{productTitle}}</5>',
        confirmButton: 'Assegna',
        closeButton: 'Annulla',
      },
      deleteUserModal: {
        title: 'Rimuovi ruolo',
        message:
          'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <5/> <6/> Se lo rimuovi da <8>{{product}}</8>, il profilo dell’utente verrà eliminato dall’Area Riservata, poiché non è presente in altri prodotti. Potrai nuovamente aggiungere l’utente, ma dovrai inserire di nuovo i suoi dati anagrafici.',
        confirmButton: 'Rimuovi',
        closeButton: 'Annulla',
      },
      deleteProductUserModal: {
        title: 'Rimuovi ruolo',
        message: 'Stai per eliminare <1>{{user}}</1>.<3 />Vuoi continuare?',
        confirmButton: 'Rimuovi',
        closeButton: 'Annulla',
      },
    },
    productSection: {
      title: 'Ruoli',
      addButton: 'Assegna ruolo',
    },
    pathDescription: 'Utenti',
    selfCareRole: 'RUOLO SU SELF CARE',
    suspended: 'sospeso',
    rehabilitated: 'riabilitato',
    group: 'Gruppi',
    role: 'Ruolo',
    statusLabel: 'Sospeso',
    infoIcon: 'Non hai i permessi per gestire questo prodotto',
  },
  userEdit: {
    addForm: {
      title: 'Aggiungi un nuovo utente',
      subTitle: 'Inserisci i dati dell’utente, seleziona un prodotto e assegnagli un ruolo.',
      fiscalCode: {
        label: 'Codice Fiscale',
      },
      name: {
        label: 'Nome',
      },
      surname: {
        label: 'Cognome',
      },
      institutionalEmail: {
        label: 'Email istituzionale',
      },
      confirmInstitutionalEmail: {
        label: 'Conferma email',
      },
      product: {
        title: 'Seleziona il prodotto',
      },
      role: {
        title: 'Seleziona il ruolo che vuoi assegnare all’utente',
      },
      backButton: 'Indietro',
      continueButton: 'Continua',
      errors: {
        invalidFiscalCode: 'Il Codice Fiscale inserito non è valido ',
        invalidEmail: 'L’indirizzo email non è valido',
        mismatchEmail: 'Gli indirizzi email non corrispondono',
      },
      saveUserSuccess: 'Utente aggiunto correttamente',
      saveUserError: "Non è stato possibile aggiungere l'utente. Riprova.",
      addMultiRoleModal: {
        title: 'Assegna ruolo',
        message:
          'Stai per assegnare a <1>{{user}}</1> i ruoli <3>{{roles}}</3> sul prodotto <5>{{productTitle}}</5><6><7></7><8></8></6>Confermi di voler continuare?<9></9>',
        confirmButton: 'Assegna',
        closeButton: 'Annulla',
      },
      addOneRoleModal: {
        title: 'Assegna ruolo',
        message:
          'Vuoi assegnare a <1>{{user}}</1> il ruolo di <3>{{role}}</3> per <5>{{productTitle}}</5>?<7><8></8><9></9></7>',
        confirmButton: 'Assegna',
        closeButton: 'Annulla',
      },
    },
    editRegistryForm: {
      title: 'Modifica il profilo utente',
      fiscalCode: {
        label: 'Codice Fiscale',
      },
      name: {
        label: 'Nome',
      },
      surname: {
        label: 'Cognome',
      },
      institutionalEmail: {
        label: 'Email istituzionale',
      },
      confirmInstitutionalEmail: {
        label: 'Conferma email',
      },
      backButton: 'Indietro',
      confirmButton: 'Conferma',
      errors: {
        userNotFind: "Impossibile individuare l'utente desiderato",
        invalidEmail: 'L’indirizzo email non è valido',
        mismatchEmail: 'Gli indirizzi email non corrispondono',
      },
      editUserSuccess: 'Profilo modificato correttamente',
      editUserError: 'Si è verificato un errore durante la modifica del profilo. Riprova.',
    },
    addProduct: {
      navigation: 'Assegna ruolo',
      title: 'Assegna un nuovo ruolo',
      subTitle: "Seleziona il prodotto e il ruolo che vuoi assegnare all'utente.",
      name: 'Nome',
      surname: 'Cognome',
      fiscalCode: 'Codice fiscale',
    },
  },
  usersPage: {
    title: 'Utenti',
    generic: {
      subTitle:
        'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.',
    },
    vertical: {
      paths: {
        description: 'Utenti',
      },
      subTitle:
        'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.',
    },
  },
};
