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
        description: 'Verwaltet die technologische Integration bzw. den Betrieb der Dienste',
      },
      searchByName: 'Suchen nach Namen',
      addFilters: 'Filtern',
      deleteFilters: 'Filter entfernen',
      noDataFilter:
        'Die von dir angewendeten Filter ergaben keine Ergebnisse. <1><2> Filter entfernen </2></1>.',
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
          'Du bist dabei, <1>{{user}} </1> aus der Rolle des <3>{{userRole}} </3> zu entfernen.<5 />Wenn du ihn entfernst, kann er nicht mehr auf <7>{{productTitle}}</7> zugreifen. <9 />Du kannst die Rolle jederzeit neu zuweisen.',
        confirmButton: 'Bestätigen',
        closeButton: 'Abbrechen',
      },
      deleteSuccess: 'Funktion erfolgreich entfernt',
      deleteError: 'Die Funktion konnte nicht entfernt werden. Erneut versuchen.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Funktion sperren',
          message:
            'Möchtest du <1>{{user}}</1> von der Rolle des <3>{{userRole}}</3> aussetzen?<4 />Wenn du ihn aussetzt, kann er nicht mehr auf <6>{{productTitle}}</6> zugreifen. <8 />Du kannst ihn jederzeit wieder aktivieren.',
        },
        reactivate: {
          title: 'Funktion reaktivieren',
          message:
            'Möchtest du <1>{{user}}</1> als <3>{{userRole}}</3> reaktivieren?<4 />Wenn du ihn reaktivierst kann er wieder auf <6>{{productTitle}}</6> zugreifen.<8 /> Du kannst ihn jederzeit wieder aussetzen.',
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
    name: 'Vorname',
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
        userDeleteError: 'Der Benutzer konnte nicht entfernt werden: Erneut versuchen.',
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Funktion entfernen',
          message:
            'Möchtest du <1>{{user}}</1> aus der Rolle des <3>{{role}}</3> entfernen? <6 />Du kannst die Rolle jederzeit neu zuweisen.',
        },
        oneRoleOnProduct: {
          title: 'Benutzer entfernen',
          message: 'Du bist dabei, den <1>{{user}}</1> zu entfernen.<3 />Möchtest du fortfahren?',
        },
        haveMoreProducts:
          'Du wirst <2>{{user}}</2> aus der Rolle des <4>{{productRole}}</4> entfernen. <5 />Wenn du ihn entfernst, kann er nicht mehr auf <7>{{productTitle}}</7> zugreifen. <9 />Du kannst die Rolle jederzeit neu zuweisen.',
        removeRoleButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Funktion sperren',
          messageWithOneRole:
            'Möchtest du <1>{{user}}</1> aus der Rolle des <3>{{productRole}}</3> entfernen?<4 />Wenn du ihn aussetzt, kann er nicht mehr auf <6>{{productTitle}}</6> zugreifen. <8 />Du kannst ihn jederzeit wieder aktivieren.',
          messageWithMultipleRoles:
            'Möchtest du <1>{{user}}</1> aus der Rolle des <3>{{productRole}}</3> entfernen?<4 />Du kannst ihn jederzeit wieder aktivieren.',
        },
        reactivate: {
          title: 'Funktion reaktivieren',
          messageWithOneRole:
            'Möchtest du <1>{{user}}</1> in der Rolle des <3>{{productRole}}</3> reaktivieren?<4 />Wenn du ihn reaktivierst kann er wieder auf <6>{{productTitle}}</6> zugreifen.<8 /> Du kannst ihn jederzeit wieder aussetzen.',
          messageWithMultipleRoles:
            'Möchtest du <1>{{user}}</1> in der Rolle des <3>{{productRole}}</3> reaktivieren?<4 />Du kannst ihn jederzeit wieder aussetzen.',
        },
        confirmButton: 'Reaktivieren',
        confirmButtonSuspend: 'Sperren',
        closeButton: 'Abbrechen',
      },
      changeUserStatusSuccess: 'Funktion {{userStatus}} erfolgreich',
      changeUserStatusSuspendError: 'Die Funktion konnte nicht gesperrt werden. Erneut versuchen.',
      changeUserStatusRehabilitateError:
        'Die Funktion konnte nicht reaktiviert werden. Erneut versuchen.',
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
          'Wähle die Gruppe aus, die du <1>{{user}}</1> für das Produkt <3>{{productTitle}}</3> zuweisen möchtest',
        groupPlaceholder: 'Gruppe wählen',
        confirmButton: 'Gruppe zuweisen',
        closeButton: 'Abbrechen',
      },
      newRoleAssign: 'Eine andere Funktion zuweisen',
      newRoleAssignModal: {
        title: 'Funktion zuweisen',
        message:
          'Weise <1>{{user}}</1> eine weitere Rolle <3>{{userRole}}</3> für das Produkt <5>{{productTitle}}</5> zu',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
      deleteUserModal: {
        title: 'Funktion entfernen',
        message:
          'Möchtest du <1>{{user}}</1> aus der Rolle des <3>{{role}}</3> entfernen? <5/> <6/> Wenn du ihn aus <8>{{product}}</8> entfernst, wird das Benutzerprofil aus dem reservierten Bereich gelöscht, da es in anderen Produkten nicht vorhanden ist. Du kannst den Benutzer erneut hinzufügen, musst jedoch seine Stammdaten erneut eingeben.',
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
      subTitle: 'Gib die Benutzerdaten ein, wähle ein Produkt aus und weise ihm eine Rolle zu.',
      userData: {
        label: 'Benutzerdaten',
        subTitle: 'Gib die Benutzerdaten ein, die du hinzufügen möchtest.',
      },
      fiscalCode: {
        label: 'Steuernummer',
      },
      name: {
        label: 'Vorname',
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
        name: 'Vorname',
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
          'Du bist dabei <1>{{user}}</1> die Rollen <3>{{roles}}</3> dem Produkt <5>{{productTitle}}</5><6><7></7><8></8></6> zuzuweisen. Möchtest du fortfahren?<9></9>',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
      addOneRoleModal: {
        title: 'Funktion zuweisen',
        message:
          'Möchtest du <1>{{user}}</1> die Rolle von <3>{{role}}</3> für <5>{{productTitle}}</5> zuweisen?<7><8></8><9></9></7>',
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
        label: 'Vorname',
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
        userNotFind: 'Der gewünschte Benutzer kann nicht gefunden werden',
        invalidEmail: 'Die E-Mail-Adresse ist ungültig',
        mismatchEmail: 'Die E-Mail-Adressen stimmen nicht überein',
      },
      editUserSuccess: 'Profil erfolgreich geändert',
      editUserError: 'Es ist ein Fehler beim Ändern des Profils aufgetreten. Erneut versuchen.',
    },
    addProduct: {
      navigation: 'Funktion zuweisen',
      title: 'Eine neue Funktion zuweisen',
      subTitle: 'Wähle das Produkt und die Funktion, die du dem Benutzer zuweisen möchtest.',
      name: 'Vorname',
      surname: 'Nachname',
      fiscalCode: 'Steuernummer',
    },
  },
  usersPage: {
    title: 'Benutzer',
    generic: {
      subTitle:
        'Anzeigen und Verwalten der den Benutzern zugewiesenen Rollen für die Produkte, die die Körperschaft bearbeitet.',
    },
    pnpg: {
      subTitle: 'Verwalte die Benutzer, die die Zustellungen von {{ businessName}} lesen können.',
    },
  },
};
