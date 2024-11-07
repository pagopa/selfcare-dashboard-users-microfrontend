export default {
  session: {
    expired: {
      title: 'Session expirée',
      message: 'Vous allez être redirigé vers la page de connexion...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Utilisateurs',
    addUser: 'Ajouter nouvel utilisateur',
    editUser: 'Modifier le profil utilisateur',
    exit: 'Quitter',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Prénom',
        email: 'Email',
        role: 'Rôle',
      },
      rows: {
        isCurrentUser: '(vous)',
        suspendedChip: 'En attente',
      },
    },
    filterRole: {
      placeholder: 'Tous les rôles',
      admin: {
        title: 'Administrateur',
        description: 'Il a toutes les autorisations nécessaires et gère les utilisateurs',
      },
      limited: {
        title: 'Opérateur',
        description: "Il gère l’intégration technologique et/ou le fonctionnement des services",
      },
      searchByName: 'Recherche par nom',
      addFilters: 'Filtrer',
      deleteFilters: 'Supprimer les filtres',
      noDataFilter:
        'I filtri che hai applicato non hanno dato nessun risultato. <1><2>Rimuovi filtri</2></1>.',
      errorOnFetch: 'Désolé, un problème est survenu. <1><2>Réessayer</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Sélectionner le type d’action',
      toolTipInfo: 'Les actions sont disponibles dans le profil de l’utilisateur',
      edit: 'Modifier',
      rehabilitate: 'Réactiver',
      suspend: 'Suspendre',
      delete: 'Supprimer',
      deleteModal: {
        title: 'Supprimer rôle',
        message:
          'Stai per rimuovere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>.<5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        confirmButton: 'Confirmer',
        closeButton: 'Annuler',
      },
      deleteSuccess: 'Rôle correctement supprimé',
      deleteError: 'Le rôle n’a pas pu être supprimé. Réessayer.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Suspendre rôle',
          message:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{userRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Réactiver rôle',
          message:
            'Vuoi riabilitare <1>{{user}}</1> nel ruolo di <3>{{userRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
        },
        confirmButton: 'Confirmer',
        closeButton: 'Annuler',
      },
      changeUserRoleSuccess: 'Rôle correctement {{userStatus}}',
      suspendRoleError: 'Le rôle n’a pas pu être suspendu. Réessayer.',
      reactivateRoleError: 'Le rôle n’a pas pu être réactivé. Réessayer.',
    },
    loadMore: 'Télécharger autres',
    addButton: 'Ajouter utilisateur',
    tabAll: 'Tous',
  },
  userDetail: {
    title: 'Profil Utilisateur',
    name: 'Prénom',
    surname: 'Nom de famille',
    fiscalCode: 'Code Fiscal',
    institutionalEmail: 'E-mail institutionnel',
    institution: 'ORGANISME',
    editButton: 'Modifier',
    deleteButton: 'Supprimer',
    backButton: 'Retour',
    actions: {
      delete: {
        userRoleDelete: 'Rôle correctement supprimé',
        userDelete: 'Utilisateur correctement supprimé',
        userDeleteError: "L’utilisateur n’a pas pu être supprimé. Réessayer.",
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Supprimer Rôle',
          message:
            'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <6 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        },
        oneRoleOnProduct: {
          title: 'Supprimer Utilisateur',
          message: 'Vous éliminez <1>{{user}}</1>.<3 />Voulez-vous continuer ?',
        },
        haveMoreProducts:
          'Stai per rimuovere <2>{{user}}</2> dal ruolo di <4>{{productRole}}</4>. <5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.',
        removeRoleButton: 'Supprimer',
        closeButton: 'Annuler',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Suspendre rôle',
          messageWithOneRole:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi riabilitarlo in qualsiasi momento.',
        },
        reactivate: {
          title: 'Réactiver rôle',
          messageWithOneRole:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.',
          messageWithMultipleRoles:
            'Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi sospenderlo di nuovo in qualsiasi momento.',
        },
        confirmButton: 'Réactiver',
        confirmButtonSuspend: 'Suspendre',
        closeButton: 'Annuler',
      },
      changeUserStatusSuccess: 'Rôle correctement {{userStatus}}',
      changeUserStatusSuspendError: 'Le rôle n’a pas pu être suspendu. Réessayer.',
      changeUserStatusRehabilitateError: 'Le rôle n’a pas pu être réactivé. Réessayer.',
      changeUserStatusRemoveError: 'Le rôle n’a pas pu être supprimé. Réessayer.',
      suspendRole: 'Suspendre',
      reactivateRole: 'Réactiver',
      deleteButton: 'Supprimer',
      successfulAddRole: 'Rôle correctement attribué',
      successfulAddUserToGroup: 'Utilisateur correctement attribué',
      addRoleError: 'Le rôle n’a pas pu être attribué. Réessayer.',
      newGroupAssign: 'Affecter groupe',
      newGroupAssignModal: {
        title: 'Affecter groupe',
        message:
          'Seleziona il gruppo che vuoi assegnare a <1>{{user}}</1> per il prodotto <3>{{productTitle}}</3>',
        groupPlaceholder: 'Sélectionner le groupe',
        confirmButton: 'Affecter groupe',
        closeButton: 'Annuler',
      },
      newRoleAssign: 'Attribuer un autre rôle',
      newRoleAssignModal: {
        title: 'Attribuer rôle',
        message:
          'Assegna a <1>{{user}}</1> un altro ruolo <3>{{userRole}}</3> sul prodotto <5>{{productTitle}}</5>',
        confirmButton: 'Attribuer',
        closeButton: 'Annuler',
      },
      deleteUserModal: {
        title: 'Supprimer rôle',
        message:
          'Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <5/> <6/> Se lo rimuovi da <8>{{product}}</8>, il profilo dell’utente verrà eliminato dall’Area Riservata, poiché non è presente in altri prodotti. Potrai nuovamente aggiungere l’utente, ma dovrai inserire di nuovo i suoi dati anagrafici.',
        confirmButton: 'Supprimer',
        closeButton: 'Annuler',
      },
      deleteProductUserModal: {
        title: 'Supprimer rôle',
        message: 'Vous éliminez <1>{{user}}</1>.<3 />Voulez-vous continuer ?',
        confirmButton: 'Supprimer',
        closeButton: 'Annuler',
      },
    },
    productSection: {
      title: 'Rôles',
      addButton: 'Attribuer rôle',
    },
    pathDescription: 'Utilisateurs',
    selfCareRole: 'RÔLE SUR SELF CARE',
    suspended: 'en attente',
    rehabilitated: 'réactivé',
    group: 'Groupes',
    role: 'Rôle',
    statusLabel: 'En attente',
    infoIcon: 'Vous n’avez pas les autorisations nécessaires pour gérer ce produit',
    removeRoleBannerText:
      'Per rimuovere un Amministratore, segui le indicazioni che trovi in <1>questa pagina</1>.',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Nom incorrect ou différent par rapport au Code Fiscal',
      surname: 'Nom de famille incorrect ou différent par rapport au Code Fiscal',
    },
    addForm: {
      title: 'Ajouter un nouvel utilisateur',
      subTitle:
        'Inserisci i dati dell’utente, indica il prodotto in cui dovrà operare e assegna un ruolo.',
      userData: {
        label: 'Données utilisateur',
        subTitle: 'Saisissez les données de l’utilisateur que vous souhaitez ajouter.',
      },
      fiscalCode: {
        label: 'Code Fiscal',
      },
      name: {
        label: 'Prénom',
      },
      surname: {
        label: 'Nom de famille',
      },
      institutionalEmail: {
        label: 'Email institutionnel',
      },
      confirmInstitutionalEmail: {
        label: 'Confirmer email',
      },
      product: {
        title: 'Indiquer le produit',
        subTitle: 'Indiquez pour quel produit vous souhaitez ajouter l’utilisateur.',
        selectLabel: 'Sélectionner le produit',
      },
      role: {
        title: 'Sélectionner le rôle',
        subTitle: 'Sélectionnez le rôle que vous souhaitez attribuer à l’utilisateur.',
        documentationLink: 'Des doutes ? Aller au manuel',
        adminTooltip:
          'Per aggiungere questo ruolo è richiesta la sottoscrizione di un modulo da parte del Legale Rappresentante',
      },
      addLegalRepresentative: {
        title: 'Indiquer le Représentant Légal',
        subTitle:
          'Firmerà il Modulo di aggiunta per i nuovi Amministratori, inviato alla PEC dell’ente, per autorizzarli ad operare sul prodotto <strong>{{productName}}</strong> per il tuo ente.',
        taxCode: 'Code Fiscal',
        name: 'Prénom',
        surname: 'Nom de famille',
        institutionalEmail: 'Email institutionnel',
        changeManagerModalTitle: 'Vous ajoutez un nouveau Représentant Légal',
        changeManagerModalMessage:
          'I dati del Legale Rappresentante inseriti sono diversi da quelli indicati in precedenza. Vuoi continuare?',
      },
      backButton: 'Retour',
      continueButton: 'Continuer',
      errors: {
        invalidFiscalCode: 'Le Code Fiscal saisi est invalide ',
        invalidEmail: 'L’adresse mail est invalide',
        mismatchEmail: 'Les adresses mail ne correspondent pas',
      },
      saveUserSuccess: 'Utilisateur correctement ajouté',
      saveUserError: 'Vous avez ajouté cet utilisateur.',
      addMultiRoleModal: {
        title: 'Attribuer rôle',
        message:
          'Stai per assegnare a <1>{{user}}</1> i ruoli <3>{{roles}}</3> sul prodotto <5>{{productTitle}}</5><6><7></7><8></8></6>Confermi di voler continuare?<9></9>',
        confirmButton: 'Attribuer',
        closeButton: 'Annuler',
      },
      addOneRoleModal: {
        title: 'Attribuer rôle',
        message:
          'Vuoi assegnare a <1>{{user}}</1> il ruolo di <3>{{role}}</3> per <5>{{productTitle}}</5>?<7><8></8><9></9></7>',
        confirmButton: 'Attribuer',
        closeButton: 'Annuler',
      },
    },
    editRegistryForm: {
      title: 'Modifier le profil utilisateur',
      fiscalCode: {
        label: 'Code Fiscal',
      },
      name: {
        label: 'Prénom',
      },
      surname: {
        label: 'Nom de famille',
      },
      institutionalEmail: {
        label: 'Email institutionnel',
      },
      confirmInstitutionalEmail: {
        label: 'Confirmer email',
      },
      backButton: 'Retour',
      confirmButton: 'Confirmer',
      errors: {
        userNotFind: "Impossible de trouver l’utilisateur souhaité",
        invalidEmail: 'L’adresse mail est invalide',
        mismatchEmail: 'Les adresses mail ne correspondent pas',
      },
      editUserSuccess: 'Profil correctement modifié',
      editUserError: 'Une erreur s’est produite lors de la modification du profil. Réessayer.',
    },
    addProduct: {
      navigation: 'Attribuer rôle',
      title: 'Attribuer un nouveau rôle',
      subTitle: "Sélectionnez le produit et le rôle que vous souhaitez attribuer à l’utilisateur.",
      name: 'Prénom',
      surname: 'Nom de famille',
      fiscalCode: 'Code fiscal',
    },
  },
  usersPage: {
    title: 'Utilisateurs',
    generic: {
      subTitle:
        'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.',
    },
    pnpg: {
      subTitle: 'Gérez les utilisateurs qui peuvent lire les notifications de {{ businessName}}.',
    },
  },
};
