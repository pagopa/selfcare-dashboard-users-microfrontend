export default {
  session: {
    expired: {
      title: 'Session expirée',
      message: 'Vous allez être redirigé vers la page de connexion...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Utilisateurs',
    addUser: 'Ajouter un nouvel utilisateur',
    editUser: 'Modifier le profil de l’utilisateur',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Prénom',
        email: 'Adresse e-mail',
        role: 'Fonction',
      },
      rows: {
        isCurrentUser: '(vous)',
        suspendedChip: 'Suspendu',
      },
    },
    filterRole: {
      placeholder: 'Toutes les fonctions',
      admin: {
        title: 'Administrateur',
        description: 'A toutes les autorisations et gère les utilisateurs',
      },
      limited: {
        title: 'Opérateur',
        description: 'Gère l’intégration technologique et/ou le fonctionnement des services',
      },
      addFilters: 'Filtrer',
      deleteFilters: 'Supprimer les filtres',
      noDataFilter:
        'Les filtres que vous avez appliqués n’ont donné aucun résultat. <1><2>Supprimer les filtres</2></1>.',
      errorOnFetch: 'Désolé, quelque chose s’est mal passé. <1><2>Veuillez réessayer</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Sélectionnez le type d’action',
      toolTipInfo: 'Les actions sont disponibles dans le profil de l’utilisateur',
      edit: 'Modifier',
      rehabilitate: 'Réinitialiser',
      suspend: 'Suspendre',
      delete: 'Supprimer',
      deleteModal: {
        title: 'Supprimer le rôle',
        message:
          'Vous allez supprimer <1>{{user}} </1> du rôle de <3>{{userRole}} </3>.<5 />Si vous le retirez, il ne pourra plus travailler sur <7>{{productTitle}} </7>. <9 />Vous pouvez réaffecter le rôle à tout moment.',
        confirmButton: 'Confirmer',
        closeButton: 'Annuler',
      },
      deleteSuccess: 'Rôle supprimé correctement',
      deleteError: 'Impossible de supprimer le rôle. Réessayer.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Suspendre le rôle',
          message:
            'Voulez-vous suspendre <1>{{user}} </1> du rôle de <3>{{userRole}} </3> ?<4 />Si vous le suspendez, il ne pourra plus travailler sur <6>{{productTitle}} </6>. <8 />Vous pouvez le réactiver à tout moment.',
        },
        reactivate: {
          title: 'Réhabiliter le rôle',
          message:
            'Voulez-vous réhabiliter <1>{{user}} </1> dans le rôle de <3>{{userRole}} </3> ?<4 />Si vous le réhabilitez, il pourra à nouveau travailler sur <6>{{productTitle}} </6>.<8 /> Vous pouvez le suspendre à tout moment.',
        },
        confirmButton: 'Confirmer',
        closeButton: 'Annuler',
      },
      changeUserRoleSuccess: 'Rôle  {{userStatus}} correctement',
      suspendRoleError: 'Impossible de suspendre le rôle. Réessayer.',
      reactivateRoleError: 'Le rôle n’a pas pu être réhabilité. Réessayer.',
    },
    loadMore: 'Charger d’autres',
    addButton: 'Ajouter utilisateur',
    tabAll: 'Tous',
  },
  userDetail: {
    title: 'Profil utilisateur',
    name: 'Prénom',
    surname: 'Nom de famille',
    fiscalCode: 'Numéro fiscal',
    institutionalEmail: 'E-mail institutionnel',
    institution: 'ORGANISME',
    editButton: 'Modifier',
    deleteButton: 'Supprimer',
    backButton: 'Retour',
    actions: {
      delete: {
        userRoleDelete: 'Rôle supprimé correctement',
        userDelete: 'Utilisateur supprimé correctement',
        userDeleteError: 'Impossible de supprimer l’utilisateur. Réessayer.',
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Supprimer le rôle',
          message:
            'Voulez-vous supprimer <1>{{user}} </1> du rôle de <3>{{role}} </3> ? <6 />Vous pouvez réaffecter le rôle à tout moment.',
        },
        oneRoleOnProduct: {
          title: 'Supprimer utilisateur',
          message: 'Vous allez supprimer <1>{{user}} </1>.<3 />Voulez-vous continuer ?',
        },
        haveMoreProducts:
          'Vous allez supprimer <2>{{user}} </2> du rôle de <4>{{productRole}} </4>. <5 />Si vous le retirez, il ne pourra plus travailler sur <7>{{productTitle}} </7>. <9 />Vous pouvez réaffecter le rôle à tout moment.',
        removeRoleButton: 'Supprimer',
        closeButton: 'Annuler',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Suspendre le rôle',
          messageWithOneRole:
            'Voulez-vous suspendre <1>{{user}} </1> du rôle de <3>{{productRole}} </3> ?<4 />Si vous le suspendez, il ne pourra plus travailler sur <6>{{productTitle}} </6>. <8 />Vous pouvez le réactiver à tout moment.',
          messageWithMultipleRoles:
            'Voulez-vous suspendre <1>{{user}} </1> du rôle de <3>{{productRole}} </3> ?<8 />Vous pouvez le réactiver à tout moment.',
        },
        reactivate: {
          title: 'Réhabiliter le rôle',
          messageWithOneRole:
            'Voulez-vous réhabiliter <1>{{user}} </1> dans le rôle de <3>{{productRole}} </3> ?<4 />Si vous le réhabilitez, il pourra à nouveau travailler sur <6>{{productTitle}} </6>.<8 /> Vous pouvez le suspendre à tout moment.',
          messageWithMultipleRoles:
            'Voulez-vous réhabiliter <1>{{user}} </1> dans le rôle de <3>{{productRole}} </3> ?<8 /> Vous pouvez le suspendre à tout moment.',
        },
        confirmButton: 'Réinitialiser',
        confirmButtonSuspend: 'Suspendre',
        closeButton: 'Annuler',
      },
      changeUserStatusSuccess: 'Rôle  {{userStatus}} correctement',
      changeUserStatusSuspendError: 'Impossible de suspendre le rôle. Réessayer.',
      changeUserStatusRehabilitateError: 'Le rôle n’a pas pu être réhabilité. Réessayer.',
      changeUserStatusRemoveError: 'Impossible de supprimer le rôle. Réessayer.',
      suspendRole: 'Suspendre',
      reactivateRole: 'Réinitialiser',
      deleteButton: 'Supprimer',
      successfulAddRole: 'Rôle affecté correctement',
      successfulAddUserToGroup: 'Utilisateur affecté correctement',
      addRoleError: 'Impossible d’affecter le rôle. Réessayer.',
      newGroupAssign: 'affecter un groupe',
      newGroupAssignModal: {
        title: 'affecter un groupe',
        message:
          'Sélectionnez le groupe que vous souhaitez affecter à <1>{{user}} </1> pour le produit <3>{{productTitle}} </3>',
        groupPlaceholder: 'Sélectionner le groupe',
        confirmButton: 'affecter un groupe',
        closeButton: 'Annuler',
      },
      newRoleAssign: 'affecter un autre rôle',
      newRoleAssignModal: {
        title: 'affecter un rôle',
        message:
          'affecter à <1>{{user}} </1> un autre rôle <3>{{userRole}} </3> sur le produit <5>{{productTitle}} </5>',
        confirmButton: 'Affecter',
        closeButton: 'Annuler',
      },
      deleteUserModal: {
        title: 'Supprimer le rôle',
        message:
          'Voulez-vous supprimer <1>{{user}} </1> du rôle de <3>{{role}} </3> ? <5/> <6/> Si vous le supprimez de <8>{{product}} </8>, le profil de l’utilisateur sera supprimé de la zone réservée, car il n’est pas présent dans d’autres produits. Vous pourrez à nouveau ajouter l’utilisateur, mais vous devrez saisir à nouveau ses données personnelles.',
        confirmButton: 'Supprimer',
        closeButton: 'Annuler',
      },
      deleteProductUserModal: {
        title: 'Supprimer le rôle',
        message: 'Vous allez supprimer <1>{{user}} </1>.<3 />Voulez-vous continuer ?',
        confirmButton: 'Supprimer',
        closeButton: 'Annuler',
      },
    },
    productSection: {
      title: 'Rôles',
      addButton: 'affecter un rôle',
    },
    pathDescription: 'Utilisateurs',
    selfCareRole: 'RÔLE DANS LES SOINS PERSONNELS',
    suspended: 'suspendu',
    rehabilitated: 'réaffecté',
    group: 'Groupes',
    role: 'Fonction',
    statusLabel: 'Suspendu',
    infoIcon: 'Vous n’avez pas la permission de gérer ce produit',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Nom incorrect ou différent du code fiscal',
      surname: 'Nom incorrect ou différent du code fiscal',
    },
    addForm: {
      title: 'Ajouter un nouvel utilisateur',
      subTitle:
        'Saisissez les données de l’utilisateur, sélectionnez un produit et affectez-lui un rôle.',
      userData: {
        label: 'Données de l’utilisateur',
      },
      fiscalCode: {
        label: 'Numéro fiscal',
      },
      name: {
        label: 'Prénom',
      },
      surname: {
        label: 'Nom de famille',
      },
      institutionalEmail: {
        label: 'E-mail institutionnel',
      },
      confirmInstitutionalEmail: {
        label: 'Confirmer e-mail',
      },
      product: {
        title: 'Sélection du produit',
      },
      role: {
        title: 'Sélectionnez le rôle que vous souhaitez affecter à l’utilisateur',
      },
      backButton: 'Retour',
      continueButton: 'Continuer',
      errors: {
        invalidFiscalCode: 'Le code saisi est incorrect ',
        invalidEmail: 'L’adresse email n’est pas valide',
        mismatchEmail: 'Les adresses e-mail ne correspondent pas',
      },
      saveUserSuccess: 'Utilisateur ajouté correctement',
      saveUserError: 'Vous avez déjà ajouté cet utilisateur.',
      addMultiRoleModal: {
        title: 'affecter un rôle',
        message:
          'Vous allez affecter à <1>{{user}} </1> les rôles <3>{{roles}} </3> sur le produit <5>{{productTitle}} </5><6><7></7><8></8></6>Confirmez-vous vouloir continuer ?<9></9>',
        confirmButton: 'Affecter',
        closeButton: 'Annuler',
      },
      addOneRoleModal: {
        title: 'affecter un rôle',
        message:
          'Voulez-vous affecter à <1>{{user}} </1> le rôle de <3>{{role}} </3> pour <5>{{productTitle}} </5> ?<7><8></8><9></9></7>',
        confirmButton: 'Affecter',
        closeButton: 'Annuler',
      },
    },
    editRegistryForm: {
      title: 'Modifier le profil de l’utilisateur',
      fiscalCode: {
        label: 'Numéro fiscal',
      },
      name: {
        label: 'Prénom',
      },
      surname: {
        label: 'Nom de famille',
      },
      institutionalEmail: {
        label: 'E-mail institutionnel',
      },
      confirmInstitutionalEmail: {
        label: 'Confirmer e-mail',
      },
      backButton: 'Retour',
      confirmButton: 'Confirmer',
      errors: {
        userNotFind: 'Impossible d’identifier l’utilisateur souhaité',
        invalidEmail: 'L’adresse email n’est pas valide',
        mismatchEmail: 'Les adresses e-mail ne correspondent pas',
      },
      editUserSuccess: 'Profil modifié avec succès',
      editUserError: 'Une erreur s’est produite lors de la modification du profil. Réessayer.',
    },
    addProduct: {
      navigation: 'affecter un rôle',
      title: 'affecter un nouveau rôle',
      subTitle: 'Sélectionnez le produit et le rôle que vous souhaitez affecter à l’utilisateur.',
      name: 'Prénom',
      surname: 'Nom de famille',
      fiscalCode: 'Code fiscal',
    },
  },
  usersPage: {
    title: 'Utilisateurs',
    generic: {
      subTitle:
        'Visualisez et gérez les rôles affectés aux utilisateurs pour les produits auxquels l’organisme a adhéré.',
    },
    pnpg: {
      subTitle: 'Gérez les utilisateurs qui peuvent lire les notifications de{{ businessName}}.',
    },
  },
};
