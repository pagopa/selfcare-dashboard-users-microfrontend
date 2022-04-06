export default {
  session: {
    expired: {
      title: 'Sessione scaduta',
      message: 'Stai per essere rediretto alla pagina di login...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Referenti',
    addProduct: 'Aggiungi Prodotto',
    addUser: 'Aggiungi un Referente',
    editUser: 'Modifica Referente',
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
    title: 'Dettaglio Referente',
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
        title: 'RUOLO ELIMINATO',
        message:
          'Hai eliminato correttamente il ruolo <1>{{role}}</1> assegnato a <3>{{user}}</3>.',
      },
      modalDelete: {
        title: 'Elimina Ruolo',
        message:
          'Stai per eliminare il ruolo <1> {{role}} </1> di <3> {{productTitle}} </3> assegnato a <4>{{user}}</4>.<5 />Vuoi continuare?',
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      changeUserStatusModal: {
        titleSuspend: 'Sospendi Ruolo',
        messageSuspend: 'Stai per sospendere il ruolo',
        titleReactivate: 'Riabilita Ruolo',
        messageReactivate: 'Stai per riabilitare il ruolo',
        message:
          '<0></0> <1>{{transcodeProductRole}}</1> di <3>{{productTitle}}</3> assegnato a <5>{{partyAndUser}}</5>. <7></7>Vuoi continuare?',
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      changeUserStatus: {
        title: 'REFERENTE {{userStatus}}',
        message: 'Hai {{userStatus}} correttamente <3>{{user}}</3>.',
      },
      suspendRole: 'Sospendi',
      reactivateRole: 'Riabilita',
      deleteButton: 'Elimina',
      successfulAddRole: {
        title: 'RUOLO AGGIUNTO',
        messageRole: 'il ruolo',
        messageRoles: 'i ruoli',
        message: 'Hai aggiunto correttamente {{roles}} per il referente <4>{{user}}</4>',
      },
      addRoleError: {
        title: "ERRORE DURANTE L'AGGIUNTA",
        description: "C'è stato un errore durante l'aggiunta del ruolo per il referente {{user}}",
        message:
          "C'è stato un errore durante l'aggiunta del ruolo per il referente <1>{{user}}</1>.",
      },
      newRoleAssign: '+ Assegna ruolo',
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
        message: 'Stai per eliminare il referente <1>{{user}}</1>.<2 />Vuoi continuare?',
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
    },
    productSection: {
      title: 'Prodotti',
      description: 'Qui trovi tutti i dati dei prodotti relativi al tuo profilo',
      addButton: 'Aggiungi',
    },
    pathDescription: 'Referenti',
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
        title: 'Prodotto',
        description: 'Seleziona il prodotto sul quale vuoi aggiungere il referente',
      },
      role: {
        title: 'Ruolo',
        description:
          'Seleziona il ruolo che vuoi assegnare al referente relativo al prodotto selezionato',
      },
      backButton: 'Indietro',
      confirmButton: 'Conferma',
      errors: {
        invalidFiscalCode: 'Il Codice Fiscale inserito non è valido ',
        invalidEmail: 'L’indirizzo email non è valido',
        mismatchEmail: 'Gli indirizzi email non corrispondono',
      },
      saveUserSuccess: {
        title: 'REFERENTE AGGIUNTO',
        message: 'Hai aggiunto correttamente <1>{{user}}</1>.',
      },
      saveUserError: {
        title: "ERRORE DURANTE L'AGGIUNTA",
        message: "C'è stato un errore durante l'aggiunta del referente <1>{{user}}</1>.",
      },
      addMultiRoleModal: {
        title: 'Assegna ruolo',
        message:
          'Stai per assegnare a <1>{{user}}</1>i ruoli <3>{{roles}}</3> sul prodotto <5>{{productTitle}}</5><6><7></7><8></8></6>Confermi di voler continuare?<9></9>',
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
    },
    editRegistryForm: {
      title: 'Modifica Referente',
      subTitle: 'Modifica i dati della persona che hai autorizzato a gestire.',
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
      title: 'Aggiungi Prodotto',
      subTitle: 'Assegna un prodotto al referente abilitato per {{institutionName}}',
      name: 'NOME',
      surname: 'COGNOME',
      fiscalCode: 'CODICE FISCALE',
    },
  },
  usersPage: {
    title: 'Referenti',
    generic: {
      subTitle:
        'Visualizza e gestisci i referenti abilitati alla gestione dei prodotti del tuo Ente.',
    },
    vertical: {
      subTitle:
        'Gestisci i Referenti Amministrativi e Operativi abilitati alla gestione del prodotto {{selectedProduct}}',
    },
  },
};
