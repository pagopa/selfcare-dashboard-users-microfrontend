export default {
  session: {
    expired: {
      title: 'Sessione scaduta',
      message: 'Stai per essere rediretto alla pagina di login...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Utenti',
    addUser: 'Aggiungi un Referente',
    editUser: 'Modifica il profilo utente',
  },
  usersTable: {
    filterRole: {
      placeholder: 'Tutti i ruoli',
      admin: {
        title: 'Amministratore',
        description: 'tutti i ruoli abilitati alla gestione dei prodotti e di Self Care',
      },
      limited: {
        title: 'Operatore',
        description: 'tutti i ruoli ruoli autorizzati a operare sui prodotti',
      },
      addFiltersButton: 'Filtra',
      deleteFiltersButton: 'Cancella filtri',
      noDataFilter:
        'I filtri che hai applicato non hanno dato nessun risultato. <1><2>Rimuovi filtri</2></1>.',
      errorOnFetch: 'Spiacenti, qualcosa è andato storto. <1><2>Riprova</2></1>.',
    },
    rowActions: {
      edit: 'Modifica',
      rehabilitate: 'Riabilita',
      suspend: 'Sospendi',
      delete: 'Elimina',
      deleteModal: {
        title: 'Elimina Referente',
        message: `Stai per eliminare `,
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      deleteSuccess: {
        title: 'REFERENTE ELIMINATO',
        message: 'Hai eliminato correttamente ',
      },
      changeUserStatusModal: {
        titleSuspended: 'Sospendi Referente',
        titleReactivate: 'Riabilita Referente',
        messageSuspended: 'Stai per sospendere ',
        messageReactivate: 'Stai per riabilitare ',
        message: ` <0>{{user}}</0>.<4/>Vuoi continuare?`,
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      wantContinue: 'Vuoi continuare?',
      changeUserStatusSuccess: {
        title: 'REFERENTE {{userStatus}}',
        message: 'Hai {{userStatus}} correttamente ',
      },
    },
    loadMore: 'Carica altri',
    addButton: 'Aggiungi',
  },
  userDetail: {
    title: 'Profilo Utente',
    name: 'NOME',
    surname: 'COGNOME',
    fiscalCode: 'CODICE FISCALE',
    institutionalEmail: 'EMAIL ISTITUZIONALE',
    institution: 'ENTE',
    editButton: 'Modifica',
    deleteButton: 'Elimina',
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
            'Stai per rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}.</3> <4 />Se lo rimuovi, non potrà più operare su <6 />{{productTitle}}. Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        },
        oneRoleOnProduct: {
          title: 'Elimina Utente',
          message: "Stai per eliminare l'utente <1>{{user}}</1>.<3 />Vuoi continuare?",
        },
        confirmButton: 'Rimuovi',
        closeButton: 'Annulla',
      },
      changeUserStatusModal: {
        moreRolesOnProduct: {
          titleSuspend: 'Sospendi Ruolo',
          messageSuspend: 'Stai per sospendere il ruolo',
          titleReactivate: 'Riabilita Ruolo',
          messageReactivate: 'Stai per riabilitare il ruolo',
          message:
            '<0/> <1>{{transcodeProductRole}}</1> di <3>{{productTitle}}</3> assegnato a <5>{{partyAndUser}}</5>. <7></7>Vuoi continuare?',
        },
        oneRoleOnProduct: {
          titleSuspend: 'Sospendi Referente',
          messageSuspend: `Stai per sospendere il referente `,
          titleReactivate: 'Riabilita Referente',
          messageReactivate: 'Stai per riabilitare il referente',
          message: `<0/> <1>{{partyAndUser}}</1>. <3/> <4>Vuoi Continuare?</4>`,
        },
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      changeUserStatusSuccess: 'Ruolo {{userStatus}} correttamente',
      changeUserStatusSuspendError: 'Non è stato possibile sospendere il ruolo. Riprova.',
      changeUserStatusRehabilitateError: 'Non è stato possibile riabilitare il ruolo. Riprova.',
      changeUserStatusRemoveError: 'Non è stato possibile rimuovere il ruolo. Riprova.',
      suspendRole: 'Sospendi',
      reactivateRole: 'Riabilita',
      deleteButton: 'Elimina',
      successfulAddRole: 'Ruolo assegnato correttamente',
      addRoleError: 'Non è stato possibile assegnare il ruolo. Riprova.',
      newRoleAssign: '+ Assegna un altro ruolo',
      newRoleAssignModal: {
        title: 'Assegna ruolo',
        message:
          'Assegna a <1>{{user}}</1> un altro ruolo <3>{{userRole}}</3> sul prodotto <5>{{productTitle}}</5>',
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      deleteUser: {
        title: 'REFERENTE ELIMINATO',
        message: 'Hai eliminato correttamente il referente <1>{{user}}</1>.',
      },
      deleteUserModal: {
        title: 'Elimina Referente',
        message: 'Stai per eliminare il referente <1>{{user}}</1>.<3 />Vuoi continuare?',
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
    },
    productSection: {
      title: 'Ruoli',
      description: 'Qui trovi tutti i dati dei prodotti relativi al tuo profilo',
      addButton: 'Assegna ruolo',
    },
    pathDescription: 'Utenti',
    selfCareRole: 'RUOLO SU SELF CARE',
    suspended: 'sospeso',
    rehabilitated: 'riabilitato',
    group: 'GRUPPO',
    role: 'RUOLO',
    statusLabel: 'Sospeso',
  },
  userEdit: {
    addForm: {
      title: 'Aggiungi un Referente',
      subTitle: {
        generic:
          'Inserisci i dati della persona che vuoi autorizzare a gestire i prodotti per il {{institutionName}}',
        vertical:
          'Inserisci i dati della persona che vuoi autorizzare a gestire {{selectedProduct}}',
      },
      fiscalCode: {
        label: 'Codice Fiscale',
        placeholder: 'Inserisci il Codice Fiscale del referente',
      },
      name: {
        label: 'Nome',
        placeholder: 'Inserisci il nome del referente',
      },
      surname: {
        label: 'Cognome',
        placeholder: 'Inserisci il cognome del referente',
      },
      institutionalEmail: {
        label: 'Email istituzionale',
        placeholder: 'Inserisci l’indirizzo email istituzionale del referente',
      },
      confirmInstitutionalEmail: {
        label: 'Conferma email',
        placeholder: 'Conferma l’indirizzo email istituzionale del referente',
      },
      product: {
        title: 'Seleziona il prodotto',
      },
      role: {
        title: 'Seleziona il ruolo che vuoi assegnare all’utente',
      },
      backButton: 'Indietro',
      confirmButton: 'Conferma',
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
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
    },
    editRegistryForm: {
      title: 'Modifica il profilo utente',
      fiscalCode: {
        label: 'Codice Fiscale',
        placeholder: 'Inserisci il Codice Fiscale del referente',
      },
      name: {
        label: 'Nome',
        placeholder: 'Inserisci il nome del referente',
      },
      surname: {
        label: 'Cognome',
        placeholder: 'Inserisci il cognome del referente',
      },
      institutionalEmail: {
        label: 'Email istituzionale',
        placeholder: 'Inserisci l’indirizzo email istituzionale del referente',
      },
      confirmInstitutionalEmail: {
        label: 'Conferma email',
        placeholder: 'Conferma l’indirizzo email istituzionale del referente',
      },
      backButton: 'Indietro',
      confirmButton: 'Conferma',
      errors: {
        userNotFind: "Impossibile individuare l'utente desiderato",
        invalidEmail: 'L’indirizzo email non è valido',
        mismatchEmail: 'Gli indirizzi email non corrispondono',
      },
      editUserSuccess: {
        title: 'REFERENTE MODIFICATO',
        message: 'Hai modificato correttamente i dati di <1>{{user}}</1>.',
      },
      editUserError: {
        title: 'ERRORE DURANTE LA MODIFICA',
        message: "C'è stato un errore durante la modifica del referente <1>{{user}}</1>.",
      },
    },
    addProduct: {
      title: 'Assegna un nuovo ruolo',
      subTitle: "Seleziona il prodotto e il ruolo che vuoi assegnare all'utente.",
      name: 'NOME',
      surname: 'COGNOME',
      fiscalCode: 'CODICE FISCALE',
    },
  },
  usersPage: {
    title: 'Utenti',
    generic: {
      subTitle:
        'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.',
    },
    vertical: {
      subTitle:
        'Gestisci i Referenti Amministrativi e Operativi abilitati alla gestione del prodotto {{selectedProduct}}',
    },
  },
};
