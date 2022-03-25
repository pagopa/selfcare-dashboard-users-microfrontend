export default {
  userDetail: {
    title: 'Dettaglio Referente',
    name: 'NOME',
    surname: 'COGNOME',
    fiscalCode: 'CODICE FISCALE',
    institutionalEmail: 'EMAIL ISTITUZIONALE',
    institution: 'ENTE',
    addButton: 'Aggiungi',
    editButton: 'Modifica',
    deleteButton: 'Elimina',
    backButton: 'Indietro',
    filterRole: {
      // TODO CHECK POSITION IN JSON FILE AND NAME OF THE KEYS
      admin: {
        // TODO CHECK IF WORK AND IF IT'S CORRECT
        title: 'Amministratore',
        description: 'tutti i ruoli abilitati alla gestione dei prodotti e di Self Care',
      },
      limited: {
        // TODO CHECK IF WORK AND IF IT'S CORRECT
        title: 'Operatore',
        description: 'tutti i ruoli ruoli autorizzati a operare sui prodotti',
      },
      goFilterButton: 'Filtra',
      deleteFilterButton: 'Cancella filtri',
      noDataFilter:
        'I filtri che hai applicato non hanno dato nessun risultato. <1><2>Rimuovi filtri</2></1>.', // TODO CHECK JSON NAME AND POSITION
      errorOnFetch: 'Spiacenti, qualcosa è andato storto. <1><2>Riprova</2></1>.', // TODO CHECK POSITION IN JSON DOCUMENT
      loadMore: 'Carica altri', // TODO CHECK POSITION IN JSON DOCUMENT
      userProductRowActions: {
        // TODO userProductRowActions.tsx
        // TODO UserProductTableColumns.tsx
      },
    },
    actions: {
      delete: {
        // TODO USER ACTIONS
        title: 'RUOLO ELIMINATO',
        message: 'Hai eliminato correttamente il ruolo assegnato a <0>{{name}} {{surname}}</0>.', // TODO CHECK
      },
      modalDelete: {
        title: 'Elimina Ruolo',
        message: '', // TODO
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      changeUserStatusModal: {
        title: '', // TODO
        message: '', // TODO
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      changeUserStatus: {
        title: '', // TODO
        message: '', // TODO
      },
      deleteButton: 'Elimina',
      successfulAddRole: {
        title: 'RUOLO AGGIUNTO',
        message: '', // TODO
      },
      addRoleError: {
        title: "ERRORE DURANTE L'AGGIUNTA",
        description: '', // TODO
        message: '', // TODO
      },
      newRoleAssign: '+ Assegna ruolo',
      newRoleAssignModal: {
        title: 'Assegna ruolo',
        message: '', // TODO
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
      deleteUser: {
        title: 'REFERENTE ELIMINATO',
        message: '', // TODO in UserProductDetailPage && UserDetailPage too
      },
      deleteUserModal: {
        title: 'Elimina Referente',
        message: '', // TODO in UserProductDetailPage && UserDetailPage too
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
    statusLabel: 'Sospeso', // TODO NOT EXACT JSON KEY NAME
  },
  userEdit: {
    // TODO NOT EXACT JSON KEY NAME
    addForm: {
      path: 'Referenti', // TODO NOT EXACT JSON KEY NAME
      pathDescription: 'Aggiungi un Referente', // TODO NOT EXACT JSON KEY NAME
      title: 'Aggiungi un Referente',
      subTitle: {
        // TODO CHECK IF VERTICAL AND GENERIC HAVE THE CORRECT VALUE (CHECK FOR REVERSE)
        vertical:
          'Inserisci i dati della persona che vuoi autorizzare a gestire i prodotti per il {{institutionName}}', // TODO CHECK WORKING
        generic:
          'Inserisci i dati della persona che vuoi autorizzare a gestire {{selectedProduct}}', // TODO CHECK WORKING
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
        message: '', // TODO
      },
      saveUserError: {
        title: "ERRORE DURANTE L'AGGIUNTA",
        message: '', // TODO
      },
      addMultiRoleModal: {
        title: 'Assegna ruolo',
        message: '', // TODO
        confirmButton: 'Conferma',
        closeButton: 'Annulla',
      },
    },
    editRegistryForm: {
      path: 'Referenti', // TODO NOT EXACT JSON KEY NAME
      pathDescription: 'Modifica Referente', // TODO NOT EXACT JSON KEY NAME
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
        message: '', // TODO
      },
      editUserError: {
        title: 'ERRORE DURANTE LA MODIFICA',
        message: '', // TODO
      },
    },
    addProduct: {
      pathDescription: 'Referenti', // TODO CHECK THIS
      title: 'Aggiungi Prodotto', // TODO CHECK THIS
      pageTitle: 'Aggiungi Prodotto', // TODO CHECK JSON KEYS
      pageSubtitle: 'Assegna un prodotto al referente abilitato per {{institutionName}}', // TODO CHECK JSON KEYS AND CHECK
      name: 'NOME',
      surname: 'COGNOME',
      fiscalCode: 'CODICE FISCALE',
    },
  },
  usersPage: {
    // CHECK NAME, POSITION AND ADD PATHDESCRIPTION IN THE TWO PAGES (UsersPage, UsersProductPage)
    title: 'Referenti',
    vertical: {
      subTitle:
        'Visualizza e gestisci i referenti abilitati alla gestione dei prodotti del tuo Ente.',
    },
    generic: {
      subTitle:
        'Gestisci i Referenti Amministrativi e Operativi abilitati alla gestione del prodotto {{selectedProduct}}',
    },
  },
};
