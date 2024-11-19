export default {
  session: {
    expired: {
      title: 'Seja je potekla',
      message: 'Preusmerjeni boste na stran za prijavo ...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Uporabniki',
    addUser: 'Dodaj novega uporabnika',
    editUser: 'Uredite svoj uporabniški profil',
    exit: 'Izhod',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Ime',
        email: 'E-pošta',
        role: 'Vloga',
      },
      rows: {
        isCurrentUser: '(ti)',
        suspendedChip: 'Prekinjeno',
      },
    },
    filterRole: {
      placeholder: 'Vse vloge',
      admin: {
        title: 'Upravitelj',
        description: 'Ima vsa dovoljenja in upravlja uporabnike',
      },
      limited: {
        title: 'Upravljavec',
        description: "Upravlja tehnološko integracijo in/ali delovanje storitev",
      },
      searchByName: 'Išči po imenu',
      addFilters: 'Filtriraj',
      deleteFilters: 'Odstrani filtre',
      noDataFilter:
        'I filtri che hai applicato non hanno dato nessun risultato. <1><2>Rimuovi filtri</2></1>.',
      errorOnFetch: 'Žal, nekaj je šlo narobe. <1><2>Poskusi ponovno</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Izberite vrsto dejanja',
      toolTipInfo: 'Dejanja so na voljo v profilu uporabnika',
      edit: 'Spremeni',
      rehabilitate: 'Ponovno vzpostavi',
      suspend: 'Prekini',
      delete: 'Odstrani',
      deleteModal: {
        title: 'Odstrani vlogo',
        message:
          'Stai per rimuovere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>.<5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        confirmButton: 'Potrdi',
        closeButton: 'Prekliči',
      },
      deleteSuccess: 'Vloga je bila uspešno odstranjena',
      deleteError: 'Vloge ni bilo mogoče odstraniti. Poskusi ponovno.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Prekini vlogo',
          message:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Ponovno vzpostavi vlogo',
          message:
            'Vuoi riabilitare <1>{{user}}</1> nel ruolo di <3>{{userRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
        },
        confirmButton: 'Potrdi',
        closeButton: 'Prekliči',
      },
      changeUserRoleSuccess: 'Pravilna vloga {{userStatus}}',
      suspendRoleError: 'Vloge ni bilo mogoče prekiniti. Poskusi ponovno.',
      reactivateRoleError: 'Vloge ni bilo mogoče ponovno vzpostaviti. Poskusi ponovno.',
    },
    loadMore: 'Naloži druge',
    addButton: 'Dodaj uporabnika',
    tabAll: 'Vse',
  },
  userDetail: {
    title: 'Profil uporabnika',
    name: 'Ime',
    surname: 'Priimek',
    fiscalCode: 'Davčna številka',
    institutionalEmail: 'Overjen e-poštni naslov',
    institution: 'ORGANIZACIJA',
    editButton: 'Spremeni',
    deleteButton: 'Odstrani',
    backButton: 'Nazaj',
    actions: {
      delete: {
        userRoleDelete: 'Vloga je bila uspešno odstranjena',
        userDelete: 'Uporabnik uspešno odstranjen',
        userDeleteError: "Uporabnika ni bilo mogoče odstraniti. Poskusi ponovno.",
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Odstrani vlogo',
          message:
            'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <6 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        },
        oneRoleOnProduct: {
          title: 'Izbriši uporabnika',
          message: 'Izbrisali boste <1>{{user}}</1>.<3 />Ali želite nadaljevati?',
        },
        haveMoreProducts:
          'Stai per rimuovere <2>{{user}}</2> dal ruolo di <4>{{productRole}}</4>. <5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        removeRoleButton: 'Odstrani',
        closeButton: 'Prekliči',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Prekini vlogo',
          messageWithOneRole:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Ponovno vzpostavi vlogo',
          messageWithOneRole:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi sospenderlo di nuovo in qualsiasi momento.',
        },
        confirmButton: 'Ponovno vzpostavi',
        confirmButtonSuspend: 'Prekini',
        closeButton: 'Prekliči',
      },
      changeUserStatusSuccess: 'Pravilna vloga {{userStatus}}',
      changeUserStatusSuspendError: 'Vloge ni bilo mogoče prekiniti. Poskusi ponovno.',
      changeUserStatusRehabilitateError: 'Vloge ni bilo mogoče ponovno vzpostaviti. Poskusi ponovno.',
      changeUserStatusRemoveError: 'Vloge ni bilo mogoče odstraniti. Poskusi ponovno.',
      suspendRole: 'Prekini',
      reactivateRole: 'Ponovno vzpostavi',
      deleteButton: 'Odstrani',
      successfulAddRole: 'Vloga je pravilno dodeljena',
      successfulAddUserToGroup: 'Uporabnik je uspešno dodeljen',
      addRoleError: 'Vloge ni bilo mogoče dodeliti. Poskusi ponovno.',
      newGroupAssign: 'Dodeli skupino',
      newGroupAssignModal: {
        title: 'Dodeli skupino',
        message:
          'Seleziona il gruppo che vuoi assegnare a <1>{{user}}</1> per il prodotto <3>{{productTitle}}</3>',
        groupPlaceholder: 'Izberite skupino',
        confirmButton: 'Dodeli skupino',
        closeButton: 'Prekliči',
      },
      newRoleAssign: 'Dodeli drugo vlogo',
      newRoleAssignModal: {
        title: 'Dodeli vlogo',
        message:
          'Assegna a <1>{{user}}</1> un altro ruolo <3>{{userRole}}</3> sul prodotto <5>{{productTitle}}</5>',
        confirmButton: 'Dodeli',
        closeButton: 'Prekliči',
      },
      deleteUserModal: {
        title: 'Odstrani vlogo',
        message:
          'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <5/> <6/> Se lo rimuovi da <8>{{product}}</8>, il profilo dell’utente verrà eliminato dall’Area Riservata, poiché non è presente in altri prodotti. Potrai nuovamente aggiungere l’utente, ma dovrai inserire di nuovo i suoi dati anagrafici.',
        confirmButton: 'Odstrani',
        closeButton: 'Prekliči',
      },
      deleteProductUserModal: {
        title: 'Odstrani vlogo',
        message: 'Izbrisali boste <1>{{user}}</1>.<3 />Ali želite nadaljevati?',
        confirmButton: 'Odstrani',
        closeButton: 'Prekliči',
      },
    },
    productSection: {
      title: 'Vloge',
      addButton: 'Dodeli vlogo',
    },
    pathDescription: 'Uporabniki',
    selfCareRole: 'VLOGA NA SAMOPOMOČI',
    suspended: 'prekinjeno',
    rehabilitated: 'ponovno vzpostavljeno',
    group: 'Skupine',
    role: 'Vloga',
    statusLabel: 'Prekinjeno',
    infoIcon: 'Nimate dovoljenja za upravljanje tega produkta',
    removeRoleBannerText:
      'Per rimuovere un Amministratore, segui le indicazioni che trovi in <1>questa pagina</1>.',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Ime ni pravilno ali se razlikuje od davčne številke',
      surname: 'Priimek ni pravilen ali se razlikuje od davčne številke',
    },
    addForm: {
      title: 'Dodajte novega uporabnika',
      subTitle:
        'Inserisci i dati dell’utente, indica il prodotto in cui dovrà operare e assegna un ruolo.',
      userData: {
        label: 'Podatki uporabnika',
        subTitle: 'Vnesite podatke uporabnika, ki ga želite dodati.',
      },
      fiscalCode: {
        label: 'Davčna številka',
      },
      name: {
        label: 'Ime',
      },
      surname: {
        label: 'Priimek',
      },
      institutionalEmail: {
        label: 'Overjen e-poštni naslov',
      },
      confirmInstitutionalEmail: {
        label: 'Potrdite e-pošto',
      },
      product: {
        title: 'Označuje produkt',
        subTitle: 'Označite, za kateri produkt želite dodati uporabnika.',
        selectLabel: 'Izberite produkt',
      },
      role: {
        title: 'Izberi vlogo',
        subTitle: 'Izberite vlogo, ki jo želite dodeliti uporabniku.',
        documentationLink: 'Ste v dvomih? Pojdite na priročnik',
        adminTooltip:
          'Per aggiungere questo ruolo è richiesta la sottoscrizione di un modulo da parte del Legale Rappresentante',
      },
      addLegalRepresentative: {
        title: 'Označuje pravnega zastopnika',
        subTitle:
          'Firmerà il Modulo di aggiunta per i nuovi Amministratori, inviato alla PEC dell’ente, per autorizzarli ad operare sul prodotto <strong>{{productName}}</strong> per il tuo ente.',
        taxCode: 'Davčna številka',
        name: 'Ime',
        surname: 'Priimek',
        institutionalEmail: 'Overjen e-poštni naslov',
        changeManagerModalTitle: 'Dodajate novega pravnega zastopnika',
        changeManagerModalMessage:
          'I dati del Legale Rappresentante inseriti sono diversi da quelli indicati in precedenza. Vuoi continuare?',
      },
      backButton: 'Nazaj',
      continueButton: 'Nadaljuj',
      errors: {
        invalidFiscalCode: 'Vnesena davčna številka je neveljavna ',
        invalidEmail: 'E-poštni naslov je neveljaven',
        mismatchEmail: 'E-poštna naslova se ne ujemata',
      },
      saveUserSuccess: 'Uporabnik je bil uspešno dodan',
      saveUserError: 'Tega uporabnika ste že dodali.',
      addMultiRoleModal: {
        title: 'Dodeli vlogo',
        message:
          'Stai per assegnare a <1>{{user}}</1> i ruoli <3>{{roles}}</3> sul prodotto <5>{{productTitle}}</5><6><7></7><8></8></6>Confermi di voler continuare?<9></9>',
        confirmButton: 'Dodeli',
        closeButton: 'Prekliči',
      },
      addOneRoleModal: {
        title: 'Dodeli vlogo',
        message:
          'Vuoi assegnare a <1>{{user}}</1> il ruolo di <3>{{role}}</3> per <5>{{productTitle}}</5>?<7><8></8><9></9></7>',
        confirmButton: 'Dodeli',
        closeButton: 'Prekliči',
      },
    },
    editRegistryForm: {
      title: 'Uredite svoj uporabniški profil',
      fiscalCode: {
        label: 'Davčna številka',
      },
      name: {
        label: 'Ime',
      },
      surname: {
        label: 'Priimek',
      },
      institutionalEmail: {
        label: 'Overjen e-poštni naslov',
      },
      confirmInstitutionalEmail: {
        label: 'Potrdite e-pošto',
      },
      backButton: 'Nazaj',
      confirmButton: 'Potrdi',
      errors: {
        userNotFind: "Ni mogoče najti želenega uporabnika",
        invalidEmail: 'E-poštni naslov je neveljaven',
        mismatchEmail: 'E-poštna naslova se ne ujemata',
      },
      editUserSuccess: 'Profil je bil uspešno spremenjen',
      editUserError: 'Med urejanjem vašega profila je prišlo do napake. Poskusi ponovno.',
    },
    addProduct: {
      navigation: 'Dodeli vlogo',
      title: 'Dodeli novo vlogo',
      subTitle: "Izberite produkt, ki jo želite dodeliti uporabniku.",
      name: 'Ime',
      surname: 'Priimek',
      fiscalCode: 'Davčna številka',
    },
  },
  usersPage: {
    title: 'Uporabniki',
    generic: {
      subTitle:
        'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.',
    },
    pnpg: {
      subTitle: 'Upravljajte, kdo lahko bere obvestila {{ businessName}}.',
    },
  },
};
