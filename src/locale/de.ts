export default {
  session: {
    expired: {
      title: 'Sitzung abgelaufen',
      message: 'Du wirst zur Login-Seite weitergeleitet...',
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
      rows: {
        isCurrentUser: '(du)',
        suspendedChip: 'Ausgesetzt',
      },
    },
    filterRole: {
      placeholder: 'Alle Rollen',
      admin: {
        title: 'Administrator',
        description: 'Hat alle Berechtigungen und verwaltet Benutzer',
      },
      limited: {
        title: 'Bearbeiter',
        description: 'Verwaltet die technologische Integration und/oder den Betrieb der Dienste',
      },
      addFilters: 'Filtern',
      deleteFilters: 'Filter entfernen',
      noDataFilter:
        'Die von dir angewendeten Filter ergaben keine Ergebnisse. <1><2> Filter entfernen </2></1>.',
      errorOnFetch: 'Es ist leider ein Fehler aufgetreten. <1><2>Nochmals versuchen</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Art der Aktion wählen',
      toolTipInfo: 'Aktionen stehen im Benutzerprofil zur Verfügung',
      edit: 'Bearbeiten',
      rehabilitate: 'Reaktivieren',
      suspend: 'Aussetzen',
      delete: 'Entfernen',
      deleteModal: {
        title: 'Rolle entfernen',
        message:
          'Du bist dabei, <1>{{user}} </1> aus der Rolle des <3>{{userRole}} </3> zu entfernen.<5 />Wenn du ihn entfernst, kann er nicht mehr auf <7>{{productTitle}}</7> zugreifen. <9 />Du kannst die Rolle jederzeit neu zuweisen.',
        confirmButton: 'Bestätigen',
        closeButton: 'Abbrechen',
      },
      deleteSuccess: 'Rolle erfolgreich entfernt',
      deleteError: 'Die Rolle konnte nicht entfernt werden. Nochmals versuchen.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Rolle aussetzen',
          message:
            'Möchtest du <1>{{user}}</1> von der Rolle des <3>{{userRole}}</3> aussetzen?<4 />Wenn du ihn aussetzt, kann er nicht mehr auf <6>{{productTitle}}</6> zugreifen. <8 />Du kannst ihn jederzeit wieder aktivieren.',
        },
        reactivate: {
          title: 'Rolle reaktivieren',
          message:
            'Möchtest du <1>{{user}}</1> als <3>{{userRole}}</3> reaktivieren?<4 />Wenn du ihn reaktivierst kann er wieder auf <6>{{productTitle}}</6> zugreifen.<8 /> Du kannst ihn jederzeit wieder aussetzen.',
        },
        confirmButton: 'Bestätigen',
        closeButton: 'Abbrechen',
      },
      changeUserRoleSuccess: 'Rolle {{userStatus}} korrekt',
      suspendRoleError: 'Die Rolle konnte nicht ausgesetzt werden. Nochmals versuchen.',
      reactivateRoleError: 'Die Rolle konnte nicht reaktiviert werden. Nochmals versuchen.',
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
    institutionalEmail: 'Institutionelle E-Mail-Adresse',
    institution: 'KÖRPERSCHAFT',
    editButton: 'Bearbeiten',
    deleteButton: 'Entfernen',
    backButton: 'Zurück',
    actions: {
      delete: {
        userRoleDelete: 'Rolle erfolgreich entfernt',
        userDelete: 'Benutzer erfolgreich entfernt',
        userDeleteError: 'Der Benutzer konnte nicht entfernt werden. Nochmals versuchen.',
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Rolle entfernen',
          message:
            'Möchtest du <1>{{user}}</1> aus der Rolle des <3>{{role}}</3> entfernen? <6 />Du kannst die Rolle jederzeit neu zuweisen.',
        },
        oneRoleOnProduct: {
          title: 'Benutzer löschen',
          message: 'Du bist dabei, <1>{{user}}</1> zu löschen.<3 />Möchtest du fortfahren?',
        },
        haveMoreProducts:
          'Du wirst <2>{{user}}</2> aus der Rolle des <4>{{productRole}}</4> entfernen. <5 />Wenn du ihn entfernst, kann er nicht mehr auf <7>{{productTitle}}</7> zugreifen. <9 />Du kannst die Rolle jederzeit neu zuweisen.',
        removeRoleButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Rolle aussetzen',
          messageWithOneRole:
            'Möchtest du <1>{{user}}</1> aus der Rolle des <3>{{productRole}}</3> entfernen?<4 />Wenn du ihn aussetzt, kann er nicht mehr auf <6>{{productTitle}}</6> zugreifen. <8 />Du kannst ihn jederzeit wieder aktivieren.',
          messageWithMultipleRoles:
            'Möchtest du <1>{{user}}</1> aus der Rolle des <3>{{productRole}}</3> entfernen?<4 />Du kannst ihn jederzeit wieder aktivieren.',
        },
        reactivate: {
          title: 'Rolle reaktivieren',
          messageWithOneRole:
            'Möchtest du <1>{{user}}</1> in der Rolle des <3>{{productRole}}</3> reaktivieren?<4 />Wenn du ihn reaktivierst kann er wieder auf <6>{{productTitle}}</6> zugreifen.<8 /> Du kannst ihn jederzeit wieder aussetzen.',
          messageWithMultipleRoles:
            'Möchtest du <1>{{user}}</1> in der Rolle des <3>{{productRole}}</3> reaktivieren?<4 />Du kannst ihn jederzeit wieder aussetzen.',
        },
        confirmButton: 'Reaktivieren',
        confirmButtonSuspend: 'Aussetzen',
        closeButton: 'Abbrechen',
      },
      changeUserStatusSuccess: 'Rolle {{userStatus}} korrekt',
      changeUserStatusSuspendError: 'Die Rolle konnte nicht ausgesetzt werden. Nochmals versuchen.',
      changeUserStatusRehabilitateError:
        'Die Rolle konnte nicht reaktiviert werden. Nochmals versuchen.',
      changeUserStatusRemoveError: 'Die Rolle konnte nicht entfernt werden. Nochmals versuchen.',
      suspendRole: 'Aussetzen',
      reactivateRole: 'Reaktivieren',
      deleteButton: 'Entfernen',
      successfulAddRole: 'Rolle erfolgreich zugewiesen',
      successfulAddUserToGroup: 'Benutzer erfolgreich zugewiesen',
      addRoleError: 'Die Rolle konnte nicht zugewiesen werden. Nochmals versuchen.',
      newGroupAssign: 'Gruppe zuweisen',
      newGroupAssignModal: {
        title: 'Gruppe zuweisen',
        message:
          'Wähle die Gruppe aus, die du <1>{{user}}</1> für das Produkt <3>{{productTitle}}</3> zuweisen möchtest',
        groupPlaceholder: 'Gruppe wählen',
        confirmButton: 'Gruppe zuweisen',
        closeButton: 'Abbrechen',
      },
      newRoleAssign: 'Eine andere Rolle zuweisen',
      newRoleAssignModal: {
        title: 'Rolle zuweisen',
        message:
          'Weise <1>{{user}}</1> eine weitere Rolle <3>{{userRole}}</3> für das Produkt <5>{{productTitle}}</5> zu',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
      deleteUserModal: {
        title: 'Rolle entfernen',
        message:
          'Möchtest du <1>{{user}}</1> aus der Rolle des <3>{{role}}</3> entfernen? <5/> <6/> Wenn du ihn aus <8>{{product}}</8> entfernst, wird das Benutzerprofil aus dem reservierten Bereich gelöscht, da es in anderen Produkten nicht vorhanden ist. Du kannst den Benutzer erneut hinzufügen, musst jedoch seine Stammdaten erneut eingeben.',
        confirmButton: 'Entfernen',
        closeButton: 'Abbrechen',
      },
      deleteProductUserModal: {
        title: 'Rolle entfernen',
        message: 'Du bist dabei, <1>{{user}}</1> zu löschen.<3 />Möchtest du fortfahren?',
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
    infoIcon: 'Du besitzt keine Berechtigung zur Verwaltung dieses Produkts',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Falscher Name oder abweichend von der Steuernummer',
      surname: 'Falscher oder von der Steuernummer abweichender Nachname',
    },
    addForm: {
      title: 'Neuen Benutzer hinzufügen',
      subTitle: 'Gib die Benutzerdaten ein, wähle ein Produkt aus und weise ihm eine Rolle zu.',
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
        label: 'Institutionelle E-Mail-Adresse',
      },
      confirmInstitutionalEmail: {
        label: 'E-Mail-Adresse bestätigen',
      },
      product: {
        title: 'Produkt wählen',
      },
      role: {
        title: 'Wähle die Rolle aus, die du dem Benutzer zuweisen möchtest',
      },
      backButton: 'Zurück',
      continueButton: 'Fortfahren',
      errors: {
        invalidFiscalCode: 'Die eingegebene Steuernummer ist ungültig ',
        invalidEmail: 'Die E-Mail-Adresse ist ungültig',
        mismatchEmail: 'Die E-Mail-Adressen stimmen nicht überein',
      },
      saveUserSuccess: 'Benutzer erfolgreich hinzugefügt',
      saveUserError: 'Du hast diesen Benutzer bereits hinzugefügt.',
      addMultiRoleModal: {
        title: 'Rolle zuweisen',
        message:
          'Du bist dabei <1>{{user}}</1> die Rollen <3>{{roles}}</3> dem Produkt <5>{{productTitle}}</5><6><7></7><8></8></6> zuzuweisen. Möchtest du fortfahren?<9></9>',
        confirmButton: 'Zuweisen',
        closeButton: 'Abbrechen',
      },
      addOneRoleModal: {
        title: 'Rolle zuweisen',
        message:
          'Möchtest du <1>{{user}}</1> die Rolle von <3>{{role}}</3> für <5>{{productTitle}}</5> zuweisen?<7><8></8><9></9></7>',
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
        label: 'Institutionelle E-Mail-Adresse',
      },
      confirmInstitutionalEmail: {
        label: 'E-Mail-Adresse bestätigen',
      },
      backButton: 'Zurück',
      confirmButton: 'Bestätigen',
      errors: {
        userNotFind: 'Der gewünschte Benutzer konnte nicht gefunden werden',
        invalidEmail: 'Die E-Mail-Adresse ist ungültig',
        mismatchEmail: 'Die E-Mail-Adressen stimmen nicht überein',
      },
      editUserSuccess: 'Profil erfolgreich geändert',
      editUserError: 'Beim Bearbeiten der Datei ist ein Fehler aufgetreten. Nochmals versuchen.',
    },
    addProduct: {
      navigation: 'Rolle zuweisen',
      title: 'Eine neue Rolle zuweisen',
      subTitle: 'Wähle das Produkt und die Rolle aus, die du dem Benutzer zuweisen möchtest.',
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
      subTitle: 'Verwalten der Nutzer, die die Bescheide von {{ businessName}} lesen können.',
    },
  },
};
