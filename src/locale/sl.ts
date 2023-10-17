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
    editUser: 'Uredi uporabniški profil',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Ime',
        email: 'E-poštni naslov',
        role: 'Vloga',
      },
      rows: {
        isCurrentUser: '(ti)',
        suspendedChip: 'Prekinjena',
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
        description: 'Upravlja tehnološko integracijo in/ali delovanje storitev',
      },
      addFilters: 'Filtriraj',
      deleteFilters: 'Odstrani filtre',
      noDataFilter:
        'Uporabljeni filtri niso dali nobenih rezultatov. <1><2>Odstranite filtre</2></1>.',
      errorOnFetch: 'Žal, nekaj je šlo narobe. <1><2>Poskusite znova</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Izberite vrsto dejanja',
      toolTipInfo: 'Dejanja so na voljo v profilu uporabnika',
      edit: 'Spremeni',
      rehabilitate: 'Ponovno omogoči',
      suspend: 'Prekini',
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
          title: 'Prekini vlogo',
          message:
            'Ali želite prekiniti <1>{{user}}</1> iz vloge <3>{{userRole}}</3>?<4 />Če ga prekinete, ne bo več mogel delovati na <6>{{productTitle}}</6>. <8 />Kadarkoli ga lahko ponovno omogočite.',
        },
        reactivate: {
          title: 'Ponovno omogoči vlogo',
          message:
            'Ali želite ponovno omogočiti <1>{{user}}</1> v vlogi <3>{{userRole}}</3>?<4 />Če ga ponovno omogočite, bo lahko ponovno deloval na <6>{{productTitle}}</6>.<8 /> Kadarkoli ga lahko ponovno prekinete.',
        },
        confirmButton: 'Potrdi',
        closeButton: 'Prekliči',
      },
      changeUserRoleSuccess: 'Vloga je {{userStatus}} uspešno',
      suspendRoleError: 'Vloge ni bilo mogoče prekiniti. Poskusite znova.',
      reactivateRoleError: 'Vloge ni bilo mogoče ponovno omogočiti. Poskusite znova.',
    },
    loadMore: 'Naložite druge',
    addButton: 'Dodaj uporabnika',
    tabAll: 'Vsi',
  },
  userDetail: {
    title: 'Uporabniški profil',
    name: 'Ime',
    surname: 'Priimek',
    fiscalCode: 'Davčna številka',
    institutionalEmail: 'Institucionalni e-poštni naslov',
    institution: 'ORGANIZACIJA',
    editButton: 'Spremeni',
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
            'Ali želite odstraniti <1>{{user}}</1> iz vloge <3>{{role}}</3>? <6 />Vlogo lahko kadar koli ponovno dodelite.',
        },
        oneRoleOnProduct: {
          title: 'Izbriši uporabnika',
          message: 'Izbrisali boste <1>{{user}}</1>.<3 />Ali želite nadaljevati?',
        },
        haveMoreProducts:
          'Odstranili boste <2>{{user}}</2> iz vloge <4>{{productRole}}</4>. <5 />Če ga odstranite, ne bo več mogel delovati na <7>{{productTitle}}</7>. <9 />Vlogo lahko kadar koli znova dodelite.',
        removeRoleButton: 'Odstrani',
        closeButton: 'Prekliči',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Prekini vlogo',
          messageWithOneRole:
            'Ali želite prekiniti <1>{{user}}</1> iz vloge <3>{{productRole}}</3>?<4 />Če ga prekinete, ne bo več mogel delovati na <6>{{productTitle}}</6>. <8 />Kadarkoli ga lahko ponovno omogočite.',
          messageWithMultipleRoles:
            'Ali želite prekiniti <1>{{user}}</1> iz vloge <3>{{productRole}}</3>?<8 />Kadarkoli ga lahko ponovno omogočite.',
        },
        reactivate: {
          title: 'Ponovno omogoči vlogo',
          messageWithOneRole:
            'Ali želite ponovno omogočiti <1>{{user}}</1> iz vloge <3>{{productRole}}</3>?<4 />Če ga ponovno omogočite, bo lahko ponovno deloval na <6>{{productTitle}}</6>.<8 /> Kadarkoli ga lahko ponovno prekinete.',
          messageWithMultipleRoles:
            'Ali želite ponovno omogočiti <1>{{user}}</1> iz vloge <3>{{productRole}}</3>?<4 />Kadarkoli ga lahko ponovno prekinete.',
        },
        confirmButton: 'Ponovno omogoči',
        confirmButtonSuspend: 'Prekini',
        closeButton: 'Prekliči',
      },
      changeUserStatusSuccess: 'Vloga je {{userStatus}} uspešno',
      changeUserStatusSuspendError: 'Vloge ni bilo mogoče prekiniti. Poskusite znova.',
      changeUserStatusRehabilitateError: 'Vloge ni bilo mogoče ponovno omogočiti. Poskusite znova.',
      changeUserStatusRemoveError: 'Vloge ni bilo mogoče odstraniti. Poskusite znova.',
      suspendRole: 'Prekini',
      reactivateRole: 'Ponovno omogoči',
      deleteButton: 'Odstrani',
      successfulAddRole: 'Vloga je bila uspešno dodeljena',
      successfulAddUserToGroup: 'Uporabnik je bil uspešno dodeljen',
      addRoleError: 'Vloge ni bilo mogoče dodeliti. Poskusite znova.',
      newGroupAssign: 'Dodelite skupino',
      newGroupAssignModal: {
        title: 'Dodelite skupino',
        message:
          'Izberite skupino, ki jo želite dodeliti <1>{{user}}</1> za izdelek <3>{{productTitle}}</3>',
        groupPlaceholder: 'Izberite skupino',
        confirmButton: 'Dodelite skupino',
        closeButton: 'Prekliči',
      },
      newRoleAssign: 'Dodelite drugo vlogo',
      newRoleAssignModal: {
        title: 'Dodeli vlogo',
        message:
          'Dodelite <1>{{user}}</1> drugo vlogo <3>{{userRole}}</3> za izdelek <5>{{productTitle}}</5>',
        confirmButton: 'Dodeli',
        closeButton: 'Prekliči',
      },
      deleteUserModal: {
        title: 'Odstrani vlogo',
        message:
          'Ali želite odstraniti <1>{{user}}</1> iz vloge <3>{{role}}</3>? <5/> <6/> Če ga odstranite za <8>{{product}}</8>, bo uporabniški profil ostranjen iz Rezerviranega območja, ker ni prisoten za druge izdelke. Uporabnika boste lahko ponovno dodali, vendar boste morali znova vnesti njegove osebne podatke.',
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
    selfCareRole: 'VLOGA PRI SAMOOSKRBI',
    suspended: 'prekinjena',
    rehabilitated: 'ponovno omogočena',
    group: 'Skupine',
    role: 'Vloga',
    statusLabel: 'Prekinjena',
    infoIcon: 'Nimate dovoljenj za upravljanje tega izdelka',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Nepravilno ime ali drugačno od davčne številke',
      surname: 'Napačen priimek ali drugačen od davčne številke',
    },
    addForm: {
      title: 'Dodaj novega uporabnika',
      subTitle: 'Vnesite uporabnikove podatke, izberite izdelek in mu dodelite vlogo.',
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
        label: 'Institucionalni e-poštni naslov',
      },
      confirmInstitutionalEmail: {
        label: 'Potrdite e-poštni naslov',
      },
      product: {
        title: 'Izberite izdelek',
      },
      role: {
        title: 'Izberite vlogo, ki jo želite dodeliti uporabniku',
      },
      backButton: 'Nazaj',
      continueButton: 'Nadaljujte',
      errors: {
        invalidFiscalCode: 'Vnesena davčna številka ni veljavna ',
        invalidEmail: 'E-poštni naslov ni veljaven',
        mismatchEmail: 'E-poštni naslovi se ne ujemajo',
      },
      saveUserSuccess: 'Uporabnik je bil uspešno dodan',
      saveUserError: 'Tega uporabnika ste že dodali.',
      addMultiRoleModal: {
        title: 'Dodeli vlogo',
        message:
          'Ali boste dodelili <1>{{user}}</1> vloge <3>{{roles}}</3> za izdelek <5>{{productTitle}}</5><6><7></7><8></8></6>Ali ste prepričani, da želite nadaljevati?<9></9>',
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
        label: 'Institucionalni e-poštni naslov',
      },
      confirmInstitutionalEmail: {
        label: 'Potrdite e-poštni naslov',
      },
      backButton: 'Nazaj',
      confirmButton: 'Potrdi',
      errors: {
        userNotFind: 'Želenega uporabnika ni mogoče najti',
        invalidEmail: 'E-poštni naslov ni veljaven',
        mismatchEmail: 'E-poštni naslovi se ne ujemajo',
      },
      editUserSuccess: 'Profil je bil uspešno spremenjen',
      editUserError: 'Pri spreminjanju profila je prišlo do napake. Poskusite znova.',
    },
    addProduct: {
      navigation: 'Dodeli vlogo',
      title: 'Dodeli novo vlogo',
      subTitle: 'Izberite izdelek in vlogo, ki jo želite dodeliti uporabniku.',
      name: 'Ime',
      surname: 'Priimek',
      fiscalCode: 'Davčna številka',
    },
  },
  usersPage: {
    title: 'Uporabniki',
    generic: {
      subTitle:
        'Oglejte si in upravljajte vloge, dodeljene uporabnikom za izdelke, na katere je organizacija naročena.',
    },
    pnpg: {
      subTitle: 'Upravljajte uporabnike, ki lahko berejo obvestila {{ businessName}}.',
    },
  },
};
