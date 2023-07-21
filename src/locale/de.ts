export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Log-in-Seite weitergeleitet ...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Benutzer',
    addUser: 'Neuen Benutzer hinzufügen',
    editUser: 'Benutzerprofil ändern',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Vorname',
        email: 'E-Mail-Adresse',
        role: 'Rolle',
      },
    },
    filterRole: {
      placeholder: 'Alle Rollen',
      admin: {
        title: 'Administrator',
        description: 'Hat alle Berechtigungen und verwaltet Benutzer',
      },
      limited: {
        title: 'Bediener',
        description: 'Verwaltet die technologische Integration und/oder den Betrieb der Dienste',
      },
      addFilters: 'Filtern',
      deleteFilters: 'Filter löschen',
      noDataFilter:
        'Die angewendeten Filter lieferten keine Ergebnisse. <1><2>Filter entfernen</2></1>.',
      errorOnFetch: 'Es ist leider ein Fehler aufgetreten. <1><2>Erneut versuchen</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Art der Aktion wählen',
      toolTipInfo: 'Die Aktionen sind im Benutzerprofil verfügbar',
      edit: 'Bearbeiten',
      rehabilitate: 'Reaktivieren',
      suspend: 'Aussetzen',
      delete: 'Entfernen',
      deleteModal: {
        title: 'Rolle entfernen',
        message:
          'Du bist dabei, <1>{{user}}</1> aus der Rolle <3>{{userRole}}</3> zu entfernen.<5 />Nachdem Entfernen ist ein Zugriff auf <7>{{productTitle}}</7> nicht mehr möglich. <9 />Die Rolle kann jederzeit erneut zugewiesen werden.',
        confirmButton: 'Bestätigen',
        closeButton: 'Abbrechen',
      },
      deleteSuccess: 'Rolle erfolgreich entfernt',
      deleteError: 'Die Rolle konnte nicht entfernt werden. Erneut versuchen.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Rolle aussetzen',
          message:
            'Willst du <1>{{user}}</1> aus der Rolle <3>{{userRole}}</3> aussetzen?<4 />Nachdem Aussetzen ist ein Zugriff auf <6>{{productTitle}}</6> nicht mehr möglich. <8 />Der Benutzer kann jederzeit reaktiviert werden.',
        },
        reactivate: {
          title: 'Rolle reaktivieren',
          message:
            'Willst du für <1>{{user}}</1> die Rolle <3>{{userRole}}</3> reaktivieren?<4 />Durch das Reaktivieren ist ein Zugriff auf <6>{{productTitle}}</6> erneut möglich.<8 /> Der Benutzer kann jederzeit erneut ausgesetzt werden.',
        },
        confirmButton: 'Bestätigen',
        closeButton: 'Abbrechen',
      },
      changeUserRoleSuccess: 'Rolle {{userStatus}} erfolgreich',
      suspendRoleError: 'Die Rolle konnte nicht ausgesetzt werden. Erneut versuchen.',
      reactivateRoleError: 'Die Rolle konnte nicht reaktiviert werden. Erneut versuchen.',
    },
    loadMore: 'Weitere laden',
    addButton: 'Benutzer hinzufügen',
    tabAll: 'Alle',
  },
  userDetail: {
    title: 'Benutzerprofil',
    name: 'Vorname',
    surname: 'Nachname',
    fiscalCode: 'Steuernummer',
    institutionalEmail: 'Institutionelle E-Mail',
    institution: 'KÖRPERSCHAFT',
    editButton: 'Bearbeiten',
    deleteButton: 'Entfernen',
    backButton: 'Zurück',
    actions: {
      delete: {
        userRoleDelete: 'Rolle erfolgreich entfernt',
        userDelete: 'Benutzer erfolgreich entfernt',
        userDeleteError: 'Der Benutzer konnte nicht entfernt werden. Erneut versuchen.',
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Rolle entfernen',
          message:
            'Willst du <1>{{user}}</1> aus der Rolle <3>{{role}}</3> entfernen? <6 />Die Rolle kann jederzeit erneut zugewiesen werden.',
        },
        oneRoleOnProduct: {
          title: 'Benutzer löschen',
          message: 'Du bist dabei, <1>{{user}}</1> zu entfernen.<3 />Möchtest du fortfahren?',
        },
        haveMoreProducts:
          'Du bist dabei, <2>{{user}}</2> aus der Rolle <4>{{productRole}}</4> zu entfernen. <5 />Nachdem Entfernen ist ein Zugriff auf <7>{{productTitle}}</7> nicht mehr möglich. <9 />Die Rolle kann jederzeit erneut zugewiesen werden.',
        removeRoleButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Rolle aussetzen',
          messageWithOneRole:
            'Willst du <1>{{user}}</1> aus der Rolle <3>{{productRole}}</3> aussetzen?<4 />Nachdem Aussetzen ist ein Zugriff auf <6>{{productTitle}}</6> nicht mehr möglich. <8 />Der Benutzer kann jederzeit reaktiviert werden.',
          messageWithMultipleRoles:
            'Willst du <1>{{user}}</1> aus der Rolle <3>{{productRole}}</3> aussetzen?<4 />Der Benutzer kann jederzeit reaktiviert werden.',
        },
        reactivate: {
          title: 'Rolle reaktivieren',
          messageWithOneRole:
            'Willst du für <1>{{user}}</1> die Rolle <3>{{productRole}}</3> reaktivieren?<4 />Durch das Reaktivieren ist ein Zugriff auf <6>{{productTitle}}</6> erneut möglich.<8 /> Der Benutzer kann jederzeit erneut ausgesetzt werden.',
          messageWithMultipleRoles:
            'Willst du für <1>{{user}}</1> die Rolle <3>{{productRole}}</3> reaktivieren?<4 />Der Benutzer kann jederzeit ausgesetzt werden.',
        },
        confirmButton: 'Reaktivieren',
        confirmButtonSuspend: 'Aussetzen',
        closeButton: 'Abbrechen',
      },
      changeUserStatusSuccess: 'Rolle {{userStatus}} erfolgreich',
      changeUserStatusSuspendError: 'Die Rolle konnte nicht ausgesetzt werden. Erneut versuchen.',
      changeUserStatusRehabilitateError:
        'Die Rolle konnte nicht reaktiviert werden. Erneut versuchen.',
      changeUserStatusRemoveError: 'Die Rolle konnte nicht entfernt werden. Erneut versuchen.',
      suspendRole: 'Aussetzen',
      reactivateRole: 'Reaktivieren',
      deleteButton: 'Entfernen',
      successfulAddRole: 'Rolle erfolgreich zugewiesen',
      successfulAddUserToGroup: 'Benutzer erfolgreich zugewiesen',
      addRoleError: 'Die Rolle konnte nicht zugewiesen werden. Erneut versuchen.',
      newGroupAssign: 'Gruppe zuweisen',
      newGroupAssignModal: {
        title: 'Gruppe zuweisen',
        message:
          'Wähle die Gruppe aus, die du <1>{{user}}</1> für das Produkt <3>{{productTitle}}</3> zuweisen möchtest',
        groupPlaceholder: 'Gruppe auswählen',
        confirmButton: 'Gruppe zuweisen',
        closeButton: 'Abbrechen',
      },
      newRoleAssign: 'Eine andere Rolle zuweisen',
      newRoleAssignModal: {
        title: 'Rolle zuweisen',
        message:
          'Weise <1>{{user}}</1> eine andere Rolle <3>{{userRole}}</3> für Produkt <5>{{productTitle}}</5> zu',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
      deleteUserModal: {
        title: 'Rolle entfernen',
        message:
          'Willst du <1>{{user}}</1> aus der Rolle <3>{{role}}</3> entfernen? <5/> <6/> Wenn du den Benutzer aus <8>{{product}}</8> entfernst, wird das Benutzerprofil aus dem reservierten Bereich gelöscht, da es in anderen Produkten nicht vorhanden ist. Du kannst den Benutzer erneut hinzufügen, musst jedoch seine persönlichen Daten erneut eingeben.',
        confirmButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
      deleteProductUserModal: {
        title: 'Rolle entfernen',
        message: 'Du bist dabei, <1>{{user}}</1> zu entfernen.<3 />Möchtest du fortfahren?',
        confirmButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
    },
    productSection: {
      title: 'Rollen',
      addButton: 'Rolle zuweisen',
    },
    pathDescription: 'Benutzer',
    selfCareRole: 'ROLLE AUF SELF CARE',
    suspended: 'ausgesetzt',
    rehabilitated: 'reaktiviert',
    group: 'Gruppen',
    role: 'Rolle',
    statusLabel: 'Ausgesetzt',
    infoIcon: 'Du hast keine Berechtigung zur Verwaltung dieses Produkts',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Unkorrekter oder von der Steuernummer abweichender Vorname',
      surname: 'Unkorrekter oder von der Steuernummer abweichender Nachname',
    },
    addForm: {
      title: 'Neuen Benutzer hinzufügen',
      subTitle: 'Daten des Benutzers eingeben, ein Produkt auswählen und eine Rolle zuweisen.',
      userData: {
        label: 'Benutzerdaten',
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
        label: 'Institutionelle E-Mail',
      },
      confirmInstitutionalEmail: {
        label: 'E-Mail-Bestätigung',
      },
      product: {
        title: 'Produkt wählen',
      },
      role: {
        title: 'Wähle die Rolle aus, die du dem Benutzer zuweisen möchtest',
      },
      backButton: 'Zurück',
      continueButton: 'Weiter',
      errors: {
        invalidFiscalCode: 'Die eingegebene Steuernummer ist ungültig ',
        invalidEmail: 'Die E-Mail-Adresse ist ungültig',
        mismatchEmail: 'Die E-Mail-Adressen stimmen nicht überein',
      },
      saveUserSuccess: 'Benutzer erfolgreich hinzugefügt',
      saveUserError: 'Benutzer konnte nicht hinzugefügt werden. Erneut versuchen.',
      addMultiRoleModal: {
        title: 'Rolle zuweisen',
        message:
          'Du bist dabei, <1>{{user}}</1> die Rollen <3>{{roles}}</3> für das Produkt zuzuweisen <5>{{productTitle}}</5><6><7></7><8></8></6>Bestätigst du, dass du fortfahren möchtest?<9></9>',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
      addOneRoleModal: {
        title: 'Rolle zuweisen',
        message:
          'Willst du <1>{{user}}</1> die Rolle <3>{{role}}</3> für <5>{{productTitle}}</5> zuweisen?<7><8></8><9></9></7>',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
    },
    editRegistryForm: {
      title: 'Benutzerprofil ändern',
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
        label: 'Institutionelle E-Mail',
      },
      confirmInstitutionalEmail: {
        label: 'E-Mail-Bestätigung',
      },
      backButton: 'Zurück',
      confirmButton: 'Bestätigen',
      errors: {
        userNotFind: 'Der gewünschte Benutzer konnte nicht gefunden werden',
        invalidEmail: 'Die E-Mail-Adresse ist ungültig',
        mismatchEmail: 'Die E-Mail-Adressen stimmen nicht überein',
      },
      editUserSuccess: 'Profil erfolgreich geändert',
      editUserError: 'Beim Bearbeiten der Datei ist ein Fehler aufgetreten. Erneut versuchen.',
    },
    addProduct: {
      navigation: 'Rolle zuweisen',
      title: 'Eine neue Rolle zuweisen',
      subTitle: 'Wähle das Produkt und die Rolle, die du dem Benutzer zuweisen möchtest.',
      name: 'Vorname',
      surname: 'Nachname',
      fiscalCode: 'Steuernummer',
    },
  },
  usersPage: {
    title: 'Benutzer',
    generic: {
      subTitle:
        'Anzeigen und Verwalten der den Benutzern zugewiesenen Rollen für die Produkte, die die Körperschaft betreffen.',
    },
    pnpg: {
      subTitle:
        'Verwalten der Benutzer, die zum Aufrufen der Bescheide von {{ businessName}} berechtigt sind.',
    },
  },
};
