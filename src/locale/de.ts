export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Anmeldeseite weitergeleitet...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Benutzer',
    addUser: 'Einen neuen Benutzer hinzufügen',
    editUser: 'Das Benutzerprofil ändern',
    exit: 'Beenden',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Name',
        email: 'E-Mail',
        role: 'Funktion',
      },
      rows: {
        isCurrentUser: '(du)',
        suspendedChip: 'Gesperrt',
      },
    },
    filterRole: {
      placeholder: 'Alle Funktionen',
      admin: {
        title: 'Administrator',
        description: 'Hat alle Berechtigungen und verwaltet die Benutzer',
      },
      limited: {
        title: 'Betreiber',
        description: "Verwaltet die technologische Integration bzw. den Betrieb der Dienste",
      },
      searchByName: 'Suchen nach Namen',
      addFilters: 'Filtern',
      deleteFilters: 'Filter entfernen',
      noDataFilter:
        'I filtri che hai applicato non hanno dato nessun risultato. <1><2>Rimuovi filtri</2></1>.',
      errorOnFetch: 'Leider ist etwas schiefgelaufen. <1><2>Erneut versuchen</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Den Aktionstyp wählen',
      toolTipInfo: 'Die Aktionen sind im Benutzerprofil verfügbar',
      edit: 'Ändern',
      rehabilitate: 'Reaktivieren',
      suspend: 'Sperren',
      delete: 'Entfernen',
      deleteModal: {
        title: 'Funktion entfernen',
        message:
          'Stai per rimuovere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>.<5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        confirmButton: 'Bestätigen',
        closeButton: 'Abbrechen',
      },
      deleteSuccess: 'Funktion erfolgreich entfernt',
      deleteError: 'Die Funktion konnte nicht entfernt werden. Erneut versuchen.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Funktion sperren',
          message:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Funktion reaktivieren',
          message:
            'Vuoi riabilitare <1>{{user}}</1> nel ruolo di <3>{{userRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
        },
        confirmButton: 'Bestätigen',
        closeButton: 'Abbrechen',
      },
      changeUserRoleSuccess: 'Funktion {{userStatus}} erfolgreich',
      suspendRoleError: 'Die Funktion konnte nicht gesperrt werden. Erneut versuchen.',
      reactivateRoleError: 'Die Funktion konnte nicht reaktiviert werden. Erneut versuchen.',
    },
    loadMore: 'Andere laden',
    addButton: 'Benutzer hinzufügen',
    tabAll: 'Alle',
  },
  userDetail: {
    title: 'Benutzerprofil',
    name: 'Name',
    surname: 'Nachname',
    fiscalCode: 'Steuernummer',
    institutionalEmail: 'Institutionelle -E-Mail-Adresse',
    institution: 'KÖRPERSCHAFT',
    editButton: 'Ändern',
    deleteButton: 'Entfernen',
    backButton: 'Zurück',
    actions: {
      delete: {
        userRoleDelete: 'Funktion erfolgreich entfernt',
        userDelete: 'Benutzer erfolgreich entfernt',
        userDeleteError: "Der Benutzer konnte nicht entfernt werden: Erneut versuchen.",
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Funktion entfernen',
          message:
            'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <6 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        },
        oneRoleOnProduct: {
          title: 'Benutzer entfernen',
          message: 'Du bist dabei, den <1>{{user}}</1> zu entfernen.<3 />Möchtest du fortfahren?',
        },
        haveMoreProducts:
          'Stai per rimuovere <2>{{user}}</2> dal ruolo di <4>{{productRole}}</4>. <5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        removeRoleButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Funktion sperren',
          messageWithOneRole:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Funktion reaktivieren',
          messageWithOneRole:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi sospenderlo di nuovo in qualsiasi momento.',
        },
        confirmButton: 'Reaktivieren',
        confirmButtonSuspend: 'Sperren',
        closeButton: 'Abbrechen',
      },
      changeUserStatusSuccess: 'Funktion {{userStatus}} erfolgreich',
      changeUserStatusSuspendError: 'Die Funktion konnte nicht gesperrt werden. Erneut versuchen.',
      changeUserStatusRehabilitateError: 'Die Funktion konnte nicht reaktiviert werden. Erneut versuchen.',
      changeUserStatusRemoveError: 'Die Funktion konnte nicht entfernt werden. Erneut versuchen.',
      suspendRole: 'Sperren',
      reactivateRole: 'Reaktivieren',
      deleteButton: 'Entfernen',
      successfulAddRole: 'Funktion erfolgreich zugewiesen',
      successfulAddUserToGroup: 'Benutzer erfolgreich zugewiesen',
      addRoleError: 'Die Funktion konnte nicht zugewiesen werden. Erneut versuchen.',
      newGroupAssign: 'Gruppe zuweisen',
      newGroupAssignModal: {
        title: 'Gruppe zuweisen',
        message:
          'Seleziona il gruppo che vuoi assegnare a <1>{{user}}</1> per il prodotto <3>{{productTitle}}</3>',
        groupPlaceholder: 'Gruppe wählen',
        confirmButton: 'Gruppe zuweisen',
        closeButton: 'Abbrechen',
      },
      newRoleAssign: 'Eine andere Funktion zuweisen',
      newRoleAssignModal: {
        title: 'Funktion zuweisen',
        message:
          'Assegna a <1>{{user}}</1> un altro ruolo <3>{{userRole}}</3> sul prodotto <5>{{productTitle}}</5>',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
      deleteUserModal: {
        title: 'Funktion entfernen',
        message:
          'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <5/> <6/> Se lo rimuovi da <8>{{product}}</8>, il profilo dell’utente verrà eliminato dall’Area Riservata, poiché non è presente in altri prodotti. Potrai nuovamente aggiungere l’utente, ma dovrai inserire di nuovo i suoi dati anagrafici.',
        confirmButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
      deleteProductUserModal: {
        title: 'Funktion entfernen',
        message: 'Du bist dabei, den <1>{{user}}</1> zu entfernen.<3 />Möchtest du fortfahren?',
        confirmButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
    },
    productSection: {
      title: 'Funktionen',
      addButton: 'Funktion zuweisen',
    },
    pathDescription: 'Benutzer',
    selfCareRole: 'FUNKTION AUF SELF-CARE',
    suspended: 'gesperrt',
    rehabilitated: 'reaktiviert',
    group: 'Gruppen',
    role: 'Funktion',
    statusLabel: 'Gesperrt',
    infoIcon: 'Du hast nicht die Berechtigungen zur Verwaltung dieses Produkts',
    removeRoleBannerText:
      'Per rimuovere un Amministratore, segui le indicazioni che trovi in <1>questa pagina</1>.',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Name falsch oder stimmt nicht mit der Steuernummer überein',
      surname: 'Nachname falsch oder stimmt nicht mit der Steuernummer überein',
    },
    addForm: {
      title: 'Einen neuen Benutzer hinzufügen',
      subTitle:
        'Inserisci i dati dell’utente, indica il prodotto in cui dovrà operare e assegna un ruolo.',
      userData: {
        label: 'Benutzerdaten',
        subTitle: 'Gib die Benutzerdaten ein, die du hinzufügen möchtest.',
      },
      fiscalCode: {
        label: 'Steuernummer',
      },
      name: {
        label: 'Name',
      },
      surname: {
        label: 'Nachname',
      },
      institutionalEmail: {
        label: 'Geschäftliche E-Mail',
      },
      confirmInstitutionalEmail: {
        label: 'E-Mail bestätigen',
      },
      product: {
        title: 'Gib das Produkt an',
        subTitle: 'Gib an, für welches Produkt du den Benutzer hinzufügen möchtest.',
        selectLabel: 'Produkt wählen',
      },
      role: {
        title: 'Funktion wählen',
        subTitle: 'Wähle die Funktion, die du dem Benutzer zuweisen möchtest.',
        documentationLink: 'Zweifel? Zur Anleitung',
        adminTooltip:
          'Per aggiungere questo ruolo è richiesta la sottoscrizione di un modulo da parte del Legale Rappresentante',
      },
      addLegalRepresentative: {
        title: 'Gib den Rechtsvertreter an',
        subTitle:
          'Firmerà il Modulo di aggiunta per i nuovi Amministratori, inviato alla PEC dell’ente, per autorizzarli ad operare sul prodotto <strong>{{productName}}</strong> per il tuo ente.',
        taxCode: 'Steuernummer',
        name: 'Name',
        surname: 'Nachname',
        institutionalEmail: 'Geschäftliche E-Mail',
        changeManagerModalTitle: 'Du fügst einen einen Rechtsvertreter hinzu',
        changeManagerModalMessage:
          'I dati del Legale Rappresentante inseriti sono diversi da quelli indicati in precedenza. Vuoi continuare?',
      },
      backButton: 'Zurück',
      continueButton: 'Weiter',
      errors: {
        invalidFiscalCode: 'Die eingegebene Steuernummer ist ungültig ',
        invalidEmail: 'Die E-Mail-Adresse ist ungültig',
        mismatchEmail: 'Die E-Mail-Adressen stimmen nicht überein',
      },
      saveUserSuccess: 'Benutzer erfolgreich hinzugefügt',
      saveUserError: 'Du hast diesen Benutzer bereits hinzugefügt.',
      addMultiRoleModal: {
        title: 'Funktion zuweisen',
        message:
          'Stai per assegnare a <1>{{user}}</1> i ruoli <3>{{roles}}</3> sul prodotto <5>{{productTitle}}</5><6><7></7><8></8></6>Confermi di voler continuare?<9></9>',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
      addOneRoleModal: {
        title: 'Funktion zuweisen',
        message:
          'Vuoi assegnare a <1>{{user}}</1> il ruolo di <3>{{role}}</3> per <5>{{productTitle}}</5>?<7><8></8><9></9></7>',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
    },
    editRegistryForm: {
      title: 'Das Benutzerprofil ändern',
      fiscalCode: {
        label: 'Steuernummer',
      },
      name: {
        label: 'Name',
      },
      surname: {
        label: 'Nachname',
      },
      institutionalEmail: {
        label: 'Geschäftliche E-Mail',
      },
      confirmInstitutionalEmail: {
        label: 'E-Mail bestätigen',
      },
      backButton: 'Zurück',
      confirmButton: 'Bestätigen',
      errors: {
        userNotFind: "Der gewünschte Benutzer kann nicht gefunden werden",
        invalidEmail: 'Die E-Mail-Adresse ist ungültig',
        mismatchEmail: 'Die E-Mail-Adressen stimmen nicht überein',
      },
      editUserSuccess: 'Profil erfolgreich geändert',
      editUserError: 'Es ist ein Fehler beim Ändern des Profils aufgetreten. Erneut versuchen.',
    },
    addProduct: {
      navigation: 'Funktion zuweisen',
      title: 'Eine neue Funktion zuweisen',
      subTitle: "Wähle das Produkt und die Funktion, die du dem Benutzer zuweisen möchtest.",
      name: 'Name',
      surname: 'Nachname',
      fiscalCode: 'Steuernummer',
    },
  },
  usersPage: {
    title: 'Benutzer',
    generic: {
      subTitle:
        'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.',
    },
    pnpg: {
      subTitle: 'Verwalte die Benutzer, die die Zustellungen von {{ businessName}} lesen können.',
    },
  },
};
