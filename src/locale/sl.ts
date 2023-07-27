export default {
  session: {
    expired: {
      title: 'Seja je potekla',
      message: 'Preusmerjeni boste na stran za prijavo...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Uporabniki',
    addUser: 'Dodaj novega uporabnika',
    editUser: 'Uredi uporabniški profil',
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
        suspendedChip: 'Odstavljen',
      },
    },
    filterRole: {
      placeholder: 'Vse vloge',
      admin: {
        title: 'Skrbnik',
        description: 'Ima vsa dovoljenja in upravlja uporabnike',
      },
      limited: {
        title: 'Upravljavec',
        description: 'Upravlja tehnološko integracijo in/ali delovanje storitev',
      },
      addFiltersButton: 'Filtriraj',
      deleteFiltersButton: 'Prekliči filtre',
      noDataFilter:
        'Filtri, ki ste jih uporabili, niso dali nobenih rezultatov. <1><2>Odstrani filtre</2></1>.',
      errorOnFetch: 'Žal, nekaj je šlo narobe. <1><2>Poskusite znova</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Izberite vrsto dejanja',
      toolTipInfo: 'Dejanja so na voljo v profilu uporabnika',
      edit: 'Uredi',
      rehabilitate: 'Vnovič omogoči',
      suspend: 'Začasno odstavi',
      delete: 'Odstrani',
      deleteModal: {
        title: 'Odstrani vlogo',
        message:
          'Odstranili boste <1>{{user}}</1> iz vloge <3>{{userRole}}</3>.<5 />Če ga odstranite, ne bo več mogel delovati na <7>{{productTitle}}</7>. <9 />Vlogo lahko kadar koli znova dodelite.',
        confirmButton: 'Potrdi',
        closeButton: 'Prekliči',
      },
      deleteSuccess: 'Vloga je bila uspešno odstranjena',
      deleteError: 'Vloge ni bilo mogoče odstraniti. Poskusite znova.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Začasno odstavi vlogo',
          message:
            'Ali želite začasno ustaviti <1>{{user}}</1> iz vloge <3>{{userRole}}</3>?<4 />Če ga začasno odstavite, ne bo več mogel delovati na <6>{{productTitle}}</6>. <8 />Vlogo lahko kadar koli vnovič omogočite.',
        },
        reactivate: {
          title: 'Vnovič omogoči vlogo',
          message:
            'Ali želite vnovič omogočiti <1>{{user}}</1> v vlogi <3>{{userRole}}</3>?<4 />Če jo vnovič omogočite, lahko ponovno deluje na <6>{{productTitle}}</6>.<8 /> Lahko ga kadar koli znova začasno odstavite.',
        },
        confirmButton: 'Potrdi',
        closeButton: 'Prekliči',
      },
      changeUserRoleSuccess: 'Vloga {{userStatus}} je bila uspešno začasno odstavljena',
      suspendRoleError: 'Vloge ni bilo mogoče začasno odstaviti. Poskusite znova.',
      reactivateRoleError: 'Vloge ni bilo mogoče vnovič omogočiti. Poskusite znova.',
    },
    loadMore: 'Naloži več',
    addButton: 'Dodaj uporabnika',
    tabAll: 'Vsi',
  },
  userDetail: {
    title: 'Uporabniški profil',
    name: 'Ime',
    surname: 'Priimek',
    fiscalCode: 'Davčna številka',
    institutionalEmail: 'Institucionalna e-pošta',
    institution: 'SUBJEKT',
    editButton: 'Uredi',
    deleteButton: 'Odstrani',
    backButton: 'Nazaj',
    actions: {
      delete: {
        userRoleDelete: 'Vloga je bila uspešno odstranjena',
        userDelete: 'Uporabnik je bil uspešno odstranjen',
        userDeleteError: 'Uporabnika ni bilo mogoče odstraniti. Poskusite znova.',
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Odstrani vlogo',
          message:
            'Ali želite odstraniti <1>{{user}}</1> iz vloge <3>{{role}}</3>? <6 />Vlogo lahko kadarkoli znova dodelite.',
        },
        oneRoleOnProduct: {
          title: 'Zbriši uporabnika',
          message: 'Izbrisali boste <1>{{user}}</1>.<3 />Ali želite nadaljevati?',
        },
        haveMoreProducts:
          'Odstranili boste <2>{{user}}</2> iz vloge <4>{{productRole}}</4>. <5 />Če ga odstranite, ne bo več mogel delovati na <7>{{productTitle}}</7>. <9 />Vlogo lahko kadar koli znova dodelite.',
        removeRoleButton: 'Odstrani',
        closeButton: 'Prekliči',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Začasno odstavi vlogo',
          messageWithOneRole:
            'Ali želite začasno odstaviti <1>{{user}}</1> iz vloge <3>{{productRole}}</3>?<4 />Če ga začasno odstavite, ne bo več mogel delovati na <6>{{productTitle}}</6>. <8 />Vlogo lahko kadar koli vnovič omogočite.',
          messageWithMultipleRoles:
            'Ali želite začasno odstaviti <1>{{user}}</1> iz vloge <3>{{productRole}}</3>?<4 />Vlogo lahko kadar koli vnovič omogočite.',
        },
        reactivate: {
          title: 'Vnovič omogoči vlogo',
          messageWithOneRole:
            'Ali želite vnovič omogočiti <1>{{user}}</1> iz vloge <3>{{productRole}}</3>?<4 />Če jo vnovič omogočite, lahko ponovno deluje na <6>{{productTitle}}</6>.<8 /> Lahko ga kadar koli znova začasno odstavite.',
          messageWithMultipleRoles:
            'Ali želite vnovič omogočiti <1>{{user}}</1> iz vloge <3>{{productRole}}</3>?<4 />Lahko ga kadar koli znova začasno odstavite.',
        },
        confirmButton: 'Vnovič omogoči',
        confirmButtonSuspend: 'Začasno odstavi',
        closeButton: 'Prekliči',
      },
      changeUserStatusSuccess: 'Vloga {{userStatus}} je bila uspešno začasno odstavljena',
      changeUserStatusSuspendError: 'Vloge ni bilo mogoče začasno odstaviti. Poskusite znova.',
      changeUserStatusRehabilitateError: 'Vloge ni bilo mogoče vnovič omogočiti. Poskusite znova.',
      changeUserStatusRemoveError: 'Vloge ni bilo mogoče odstraniti. Poskusite znova.',
      suspendRole: 'Začasno odstavi',
      reactivateRole: 'Vnovič omogoči',
      deleteButton: 'Odstrani',
      successfulAddRole: 'Vloga je bila uspešno dodeljena',
      successfulAddUserToGroup: 'Uporabnik je bil uspešno dodeljen',
      addRoleError: 'Vloge ni bilo mogoče dodeliti. Poskusite znova.',
      newGroupAssign: 'Dodeli skupino',
      newGroupAssignModal: {
        title: 'Dodeli skupino',
        message:
          'Izberite skupino, ki jo želite dodeliti <1>{{user}}</1> za izdelek <3>{{productTitle}}</3>',
        groupPlaceholder: 'Izberite skupino',
        confirmButton: 'Dodeli skupino',
        closeButton: 'Prekliči',
      },
      newRoleAssign: 'Dodeli drugo vlogo',
      newRoleAssignModal: {
        title: 'Dodeli vlogo',
        message:
          'Dodeli <1>{{user}}</1> drugo vlogo <3>{{userRole}}</3> za izdelek <5>{{productTitle}}</5>',
        confirmButton: 'Dodeli',
        closeButton: 'Prekliči',
      },
      deleteUserModal: {
        title: 'Odstrani vlogo',
        message:
          'Ali želite odstraniti <1>{{user}}</1> iz vloge <3>{{role}}</3>? <5/> <6/> Če ga odstranite iz <8>{{product}}</8>, bo uporabniški profil izbrisan iz rezerviranega območja, saj ni prisoten v drugih izdelkih. Ponovno boste lahko dodali uporabnika, vendar boste morali znova vnesti njegove osebne podatke.',
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
    selfCareRole: 'VLOGA V SAMOOSKRBI',
    suspended: 'začasno odstavljen',
    rehabilitated: 'vnovič omogočen',
    group: 'Skupine',
    role: 'Vloga',
    statusLabel: 'Začasno odstavljen',
    infoIcon: 'Nimate dovoljenja za upravljanje tega izdelka',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Nepravilno ali drugačno ime od davčne številke',
      surname: 'Priimek je nepravilen ali se razlikuje od davčne številke',
    },
    addForm: {
      title: 'Dodaj novega uporabnika',
      subTitle: 'Vnesite uporabniške podatke, izberite izdelek in mu dodelite vlogo.',
      userData: {
        label: 'Uporabniški podatki',
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
        label: 'Institucionalna e-pošta',
      },
      confirmInstitutionalEmail: {
        label: 'Potrdi e-naslov',
      },
      product: {
        title: 'Izberite izdelek',
      },
      role: {
        title: 'Izberite vlogo, ki jo želite dodeliti uporabniku',
      },
      backButton: 'Nazaj',
      continueButton: 'Nadaljuj',
      errors: {
        invalidFiscalCode: 'Davčna številka, ki ste jo vnesli, ni veljavna ',
        invalidEmail: 'E-poštni naslov je neveljaven',
        mismatchEmail: 'E-poštni naslovi se ne ujemajo',
      },
      saveUserSuccess: 'Uporabnik je bil uspešno dodan',
      saveUserError: 'Uporabnika ni bilo mogoče dodati. Poskusite znova.',
      addMultiRoleModal: {
        title: 'Dodeli vlogo',
        message:
          'Dodelili boste <1>{{user}}</1> vloge <3>{{roles}}</3> za izdelek <5>{{productTitle}}</5><6><7></7><8></8></6>Ali ste prepričani, da želite nadaljevati?<9></9>',
        confirmButton: 'Dodeli',
        closeButton: 'Prekliči',
      },
      addOneRoleModal: {
        title: 'Dodeli vlogo',
        message:
          'Ali želite dodeliti <1>{{user}}</1> vlogo <3>{{role}}</3> za <5>{{productTitle}}</5>?<7><8></8><9></9></7>',
        confirmButton: 'Dodeli',
        closeButton: 'Prekliči',
      },
    },
    editRegistryForm: {
      title: 'Uredi uporabniški profil',
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
        label: 'Institucionalna e-pošta',
      },
      confirmInstitutionalEmail: {
        label: 'Potrdi e-naslov',
      },
      backButton: 'Nazaj',
      confirmButton: 'Potrdi',
      errors: {
        userNotFind: 'Ni mogoče najti želenega uporabnika',
        invalidEmail: 'E-poštni naslov je neveljaven',
        mismatchEmail: 'E-poštni naslovi se ne ujemajo',
      },
      editUserSuccess: 'Profil je bil uspešno spremenjen',
      editUserError: 'Pri urejanju profila je prišlo do napake. Poskusite znova.',
    },
    addProduct: {
      navigation: 'Dodeli vlogo',
      title: 'Dodeli novo vlogo',
      subTitle: 'Izberite izdelek in vlogo, ki ju želite dodeliti uporabniku.',
      name: 'Ime',
      surname: 'Priimek',
      fiscalCode: 'Davčna številka',
    },
  },
  usersPage: {
    title: 'Uporabniki',
    generic: {
      subTitle:
        'Oglejte si vloge, dodeljene uporabnikom za izdelke, ki se jim je subjekt pridružil, in jih upravljajte.',
    },
    pnpg: {
      subTitle: 'Upravljajte uporabnike, ki lahko berejo obvestila {{ businessName}}.',
    },
  },
};
