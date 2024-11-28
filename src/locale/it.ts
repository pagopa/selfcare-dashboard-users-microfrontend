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
    exit: 'Esci',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Nome',
        email: 'Email',
        role: 'Ruolo',
      },
      rows: {
        isCurrentUser: '(tu)',
        suspendedChip: 'Sospeso',
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
      searchByName: 'Cerca per nome',
      addFilters: 'Filtra',
      deleteFilters: 'Rimuovi filtri',
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
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
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
    tabAll: 'Tutti',
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
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
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
      successfulAddUserToGroup: 'Utente assegnato correttamente',
      addRoleError: 'Non è stato possibile assegnare il ruolo. Riprova.',
      newGroupAssign: 'Assegna gruppo',
      newGroupAssignModal: {
        title: 'Assegna gruppo',
        message:
          'Seleziona il gruppo che vuoi assegnare a <1>{{user}}</1> per il prodotto <3>{{productTitle}}</3>',
        groupPlaceholder: 'Seleziona il gruppo',
        confirmButton: 'Assegna gruppo',
        closeButton: 'Annulla',
      },
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
    removeRoleBannerText:
      'Per rimuovere un Amministratore, segui le indicazioni che trovi in <1>questa pagina</1>.',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Nome non corretto o diverso dal Codice Fiscale',
      surname: 'Cognome non corretto o diverso dal Codice Fiscale',
    },
    addForm: {
      title: 'Aggiungi un nuovo utente',
      subTitle:
        'Inserisci i dati dell’utente, indica il prodotto in cui dovrà operare e assegna un ruolo.',
      userData: {
        label: 'Dati utente',
        subTitle: 'Inserisci i dati dell’utente che vuoi aggiungere.',
      },
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
        label: 'E-mail istituzionale',
      },
      confirmInstitutionalEmail: {
        label: 'Conferma e-mail',
      },
      product: {
        title: 'Indica il prodotto',
        subTitle: 'Indica per quale prodotto vuoi aggiungere l’utente.',
        selectLabel: 'Seleziona il prodotto',
      },
      role: {
        title: 'Seleziona il ruolo',
        subTitle: 'Seleziona il ruolo che vuoi assegnare all’utente.',
        documentationLink: 'Dubbi? Vai al manuale',
        adminTooltip:
          'Per aggiungere questo ruolo è richiesta la sottoscrizione di un modulo da parte del Legale Rappresentante',
      },
      addLegalRepresentative: {
        title: 'Indica il Legale Rappresentante',
        subTitle:
          'Firmerà il Modulo di aggiunta per i nuovi Amministratori, inviato alla PEC dell’ente, per autorizzarli ad operare sul prodotto <strong>{{productName}}</strong> per il tuo ente.',
        taxCode: 'Codice Fiscale',
        name: 'Nome',
        surname: 'Cognome',
        institutionalEmail: 'E-mail istituzionale',
        changeManagerModalTitle: 'Stai aggiungendo un nuovo Legale Rappresentante',
        changeManagerModalMessage:
          'Stai per sostituire l’attuale Legale Rappresentante, {{managerFullName}}, con una nuova persona. <1 />Se procedi, l’attuale Legale rappresentante potrà continuare a operare come Amministratore. <3 /> <4 />Vuoi continuare?',
        sendRequest: 'Invia richiesta',
        requestOkTitle: 'Hai inviato la richiesta',
        requestOkMessage:
          'Invieremo un’email all’indirizzo PEC primario dell’ente. <1 /> Al suo interno, ci sono le istruzioni per completare <3 />l’operazione.',
        requestErrorTitle: 'Si è verificato un errore durante l’invio della richiesta',
        requestErrorMessage:
          'A causa di un errore del sistema non è possibile completare <1 />la procedura. Ti chiediamo di riprovare più tardi.',
        backHome: 'Torna alla home',
        moreInformationOnRoles: 'Vorrei più informazioni',
      },
      backButton: 'Indietro',
      continueButton: 'Continua',
      errors: {
        invalidFiscalCode: 'Il Codice Fiscale inserito non è valido ',
        invalidEmail: 'L’indirizzo email non è valido',
        mismatchEmail: 'Gli indirizzi email non corrispondono',
      },
      saveUserSuccess: 'Utente aggiunto correttamente',
      saveUserError: 'Hai già aggiunto questo utente.',
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
      addUserInBulkModal: {
        title: 'Aggiungi per tutti gli enti aggregati',
        message:
          '<1>{{user}}</1> verrà aggiunto come utente su <3>tutti gli enti aggregati </3> con il ruolo di <4>{{role}}</4>. Potrà gestire e operare su tutti gli enti.',
        confirmButton: 'Aggiungi',
        closeButton: 'Annulla',
      },
    },
    editRegistryForm: {
      title: 'Modifica il profilo utente',
      userData: 'Dati utente',
      subTitle: 'Inserisci i dati dell’utente che vuoi aggiungere.',
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
        label: 'E-mail istituzionale',
      },
      confirmInstitutionalEmail: {
        label: 'Conferma e-mail',
      },
      mobilePhone: {
        label: 'Numero di telefono (facoltativo)',
        description: 'Solo per gli Amministratori, inserisci il numero di telefono di lavoro',
      },
      backButton: 'Indietro',
      confirmButton: 'Continua',
      errors: {
        userNotFind: "Impossibile individuare l'utente desiderato",
        invalidEmail: 'L’indirizzo email non è valido',
        mismatchEmail: 'Gli indirizzi email non corrispondono',
        invalidMobilePhone: 'Il numero di telefono inserito non è valido ',
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
    pnpg: {
      subTitle: 'Gestisci gli utenti che possono leggere le notifiche di {{ businessName}}.',
    },
    customAlert: {
      message: 'Aggiungi il tuo numero di cellulare di lavoro, o se non disponibile un fisso. Ci permetterà di contattarti in caso di necessità.',
      button: 'Aggiungi',
    }
  },
};
