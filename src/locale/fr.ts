export default {
  session: {
    expired: {
      title: 'Session expirée',
      message: 'Vous allez être redirigé(e) vers la page de connexion...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Utilisateurs',
    addUser: 'Ajouter un nouvel utilisateur',
    editUser: 'Modifier le profil utilisateur',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Prénom',
        email: 'E-mail',
        role: 'Fonction',
      },
    },
    filterRole: {
      placeholder: 'Toutes les fonctions',
      admin: {
        title: 'Administrateur',
        description: 'Il dispose de toutes les autorisations et gère les utilisateurs',
      },
      limited: {
        title: 'Opérateur',
        description: 'Il gère l’intégration technologique et/ou le fonctionnement des services',
      },
      addFilters: 'Filtrer',
      deleteFilters: 'Annuler les filtres',
      noDataFilter:
        'Les filtres que vous avez appliqués n’ont donné aucun résultat. <1><2>Supprimer les filtres</2></1>.',
      errorOnFetch: 'Désolé, une erreur s’est produite. <1><2>Réessayer</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Sélectionner le type d’action',
      toolTipInfo: 'Les actions sont disponibles dans le profil de l’utilisateur',
      edit: 'Modifier',
      rehabilitate: 'Réhabiliter',
      suspend: 'Suspendre',
      delete: 'Supprimer',
      deleteModal: {
        title: 'Supprimer fonction',
        message:
          'Vous êtes sur le point de supprimer <1>{{user}}</1> de la fonction de <3>{{userRole}} </3>.<5 />En cas de suppression, il/elle ne pourra plus utiliser <7>{{productTitle}}</7>. <9 />Vous pourrez réattribuer la fonction à tout moment.',
        confirmButton: 'Confirmer',
        closeButton: 'Annuler',
      },
      deleteSuccess: 'Fonction supprimée correctement',
      deleteError: 'Il n’a pas été possible de supprimer la fonction. Réessayer.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Suspendre fonction',
          message:
            'Voulez-vous suspendre <1>{{user}}</1> de la fonction de <3>{{userRole}} </3> ?<4 />En cas de suspension, il/elle ne pourra plus utiliser <6>{{productTitle}}</6>. <8 />Vous pourrez le/la réhabiliter à tout moment.',
        },
        reactivate: {
          title: 'Réhabiliter fonction',
          message:
            'Voulez-vous réhabiliter <1>{{user}}</1> à la fonction de <3>{{userRole}} </3> ?<4 />En cas de réhabilitation, il/elle pourra à nouveau utiliser <6>{{productTitle}}</6>.<8 /> Vous pourrez à nouveau suspendre la fonction à tout moment.',
        },
        confirmButton: 'Confirmer',
        closeButton: 'Annuler',
      },
      changeUserRoleSuccess: 'Fonction {{userStatus}} correctement',
      suspendRoleError: 'Il n’a pas été possible de suspendre la fonction. Réessayer.',
      reactivateRoleError: 'Il n’a pas été possible de réhabiliter la fonction. Réessayer.',
    },
    loadMore: 'Charger autres',
    addButton: 'Ajouter utilisateur',
    tabAll: 'Tous',
  },
  userDetail: {
    title: 'Profil utilisateur',
    name: 'Prénom',
    surname: 'Nom',
    fiscalCode: 'Code d’identification fiscale',
    institutionalEmail: 'E-mail institutionnel',
    institution: 'ORGANISME',
    editButton: 'Modifier',
    deleteButton: 'Supprimer',
    backButton: 'Retour',
    actions: {
      delete: {
        userRoleDelete: 'Fonction supprimée correctement',
        userDelete: 'Utilisateur supprimé correctement',
        userDeleteError: 'Il n’a pas été possible de supprimer l’utilisateur. Réessayer.',
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Supprimer la fonction',
          message:
            'Voulez-vous supprimer <1>{{user}}</1> de la fonction de <3>{{role}}</3> ? <6 />Vous pourrez réattribuer la fonction à tout moment.',
        },
        oneRoleOnProduct: {
          title: 'Supprimer utilisateur',
          message:
            'Vous êtes sur le point de supprimer <1>{{user}}</1>.<3 />Voulez-vous continuer ?',
        },
        haveMoreProducts:
          'Vous êtes sur le point de supprimer<2>{{user}}</2> de la fonction de <4>{{productRole}}</4>. <5 />En cas de suppression, il/elle ne pourra plus utiliser <7>{{productTitle}}</7>. <9 />Vous pourrez réattribuer la fonction à tout moment.',
        removeRoleButton: 'Supprimer',
        closeButton: 'Annuler',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Suspendre fonction',
          messageWithOneRole:
            'Voulez-vous suspendre <1>{{user}}</1> de la fonction de <3>{{productRole}}</3> ?<4 />En cas de suspension, il/elle ne pourra plus utiliser <6>{{productTitle}}</6>. <8 />Vous pourrez le/la réhabiliter à tout moment.',
          messageWithMultipleRoles:
            'Voulez-vous suspendre <1>{{user}}</1> de la fonction de <3>{{productRole}}</3> ?<4 />Vous pourrez réhabiliter la fonction à tout moment.',
        },
        reactivate: {
          title: 'Réhabiliter fonction',
          messageWithOneRole:
            'Voulez-vous réhabiliter <1>{{user}}</1> à la fonction de <3>{{productRole}}</3> ?<4 />En cas de réhabilitation, il/elle pourra à nouveau utiliser <6>{{productTitle}}</6>.<8 /> Vous pourrez à nouveau suspendre la fonction à tout moment.',
          messageWithMultipleRoles:
            'Voulez-vous réhabiliter <1>{{user}}</1> à la fonction de <3>{{productRole}}</3> ?<4 /> Vous pourrez à nouveau suspendre la fonction à tout moment.',
        },
        confirmButton: 'Réhabiliter',
        confirmButtonSuspend: 'Suspendre',
        closeButton: 'Annuler',
      },
      changeUserStatusSuccess: 'Fonction {{userStatus}} correctement',
      changeUserStatusSuspendError: 'Il n’a pas été possible de suspendre la fonction. Réessayer.',
      changeUserStatusRehabilitateError:
        'Il n’a pas été possible de réhabiliter la fonction. Réessayer.',
      changeUserStatusRemoveError: 'Il n’a pas été possible de supprimer la fonction. Réessayer.',
      suspendRole: 'Suspendre',
      reactivateRole: 'Réhabiliter',
      deleteButton: 'Supprimer',
      successfulAddRole: 'Fonction attribuée correctement',
      successfulAddUserToGroup: 'Utilisateur attribué correctement',
      addRoleError: 'Il n’a pas été possible d’attribuer la fonction. Réessayer.',
      newGroupAssign: 'Attribuer un groupe',
      newGroupAssignModal: {
        title: 'Attribuer un groupe',
        message:
          'Sélectionner le groupe que vous souhaitez attribuer à <1>{{user}}</1> pour le produit <3>{{productTitle}}</3>',
        groupPlaceholder: 'Sélectionner le groupe',
        confirmButton: 'Attribuer un groupe',
        closeButton: 'Annuler',
      },
      newRoleAssign: 'Attribuer une autre fonction',
      newRoleAssignModal: {
        title: 'Attribuer fonction',
        message:
          'Attribuer un autre rôle <3>{{userRole}}</3> à <1>{{user}}</1> sur le produit <5>{{productTitle}}</5>',
        confirmButton: 'Attribuer',
        closeButton: 'Annuler',
      },
      deleteUserModal: {
        title: 'Supprimer fonction',
        message:
          'Voulez-vous supprimer <1>{{user}}</1> de la fonction de <3>{{role}}</3> ? <5/> <6/> En cas de suppression de <8>{{product}}</8>, le profil de l’utilisateur sera supprimé de l’Espace réservé car il n’apparaît dans aucun autre produit. Il sera possible d’ajouter cet utilisateur en saisissant à nouveau ses données personnelles.',
        confirmButton: 'Supprimer',
        closeButton: 'Annuler',
      },
      deleteProductUserModal: {
        title: 'Supprimer fonction',
        message: 'Vous êtes sur le point de supprimer <1>{{user}}</1>.<3 />Voulez-vous continuer ?',
        confirmButton: 'Supprimer',
        closeButton: 'Annuler',
      },
    },
    productSection: {
      title: 'Fonctions',
      addButton: 'Attribuer fonction',
    },
    pathDescription: 'Utilisateurs',
    selfCareRole: 'FONCTION SUR SELF CARE',
    suspended: 'suspendu',
    rehabilitated: 'réhabilité',
    group: 'Groupes',
    role: 'Fonction',
    statusLabel: 'Suspendue',
    infoIcon: 'Vous n’avez pas la permission de gérer ce produit',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Nom incorrect ou différent de celui figurant sur le code d’identification fiscale',
      surname: 'Nom incorrect ou différent de celui figurant sur le code d’identification fiscale',
    },
    addForm: {
      title: 'Ajouter un nouvel utilisateur',
      subTitle:
        'Saisir les informations concernant l’utilisateur, sélectionner un produit et lui attribuer une fonction.',
      userData: {
        label: 'Informations utilisateur',
      },
      fiscalCode: {
        label: 'Code d’identification fiscale',
      },
      name: {
        label: 'Prénom',
      },
      surname: {
        label: 'Nom',
      },
      institutionalEmail: {
        label: 'E-mail institutionnel',
      },
      confirmInstitutionalEmail: {
        label: 'Confirmer e-mail',
      },
      product: {
        title: 'Sélectionner le produit',
      },
      role: {
        title: 'Sélectionner la fonction que vous souhaitez attribuer à l’utilisateur',
      },
      backButton: 'Retour',
      continueButton: 'Continuer',
      errors: {
        invalidFiscalCode: 'Le code d’identification fiscale saisi est invalide ',
        invalidEmail: 'L’adresse e-mail est invalide',
        mismatchEmail: 'Les adresses e-mail ne correspondent pas',
      },
      saveUserSuccess: 'Utilisateur ajouté correctement',
      saveUserError: 'Il n’a pas été possible d’ajouter l’utilisateur. Réessayer.',
      addMultiRoleModal: {
        title: 'Attribuer fonction',
        message:
          'Vous êtes sur le point d’affecter les fonctions de <3>{{roles}}</3> sur le produit <5>{{productTitle}}</5><6><7></7><8></8></6> à <1>{{user}}</1>Souhaitez-vous vraiment continuer ?<9></9>',
        confirmButton: 'Attribuer',
        closeButton: 'Annuler',
      },
      addOneRoleModal: {
        title: 'Attribuer fonction',
        message:
          'Voulez-vous attribuer la fonction de <3>{{role}}</3> à <1>{{user}}</1> pour <5>{{productTitle}}</5> ?<7><8></8><9></9></7>',
        confirmButton: 'Attribuer',
        closeButton: 'Annuler',
      },
    },
    editRegistryForm: {
      title: 'Modifier le profil utilisateur',
      fiscalCode: {
        label: 'Code d’identification fiscale',
      },
      name: {
        label: 'Prénom',
      },
      surname: {
        label: 'Nom',
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
        userNotFind: 'Impossible de trouver l’utilisateur souhaité',
        invalidEmail: 'L’adresse e-mail est invalide',
        mismatchEmail: 'Les adresses e-mail ne correspondent pas',
      },
      editUserSuccess: 'Profil modifié correctement',
      editUserError: 'Une erreur s’est produite lors de la modification du profil. Réessayer.',
    },
    addProduct: {
      navigation: 'Attribuer fonction',
      title: 'Attribuer une nouvelle fonction',
      subTitle:
        'Sélectionner le produit et la fonction que vous souhaitez attribuer à l’utilisateur.',
      name: 'Prénom',
      surname: 'Nom',
      fiscalCode: 'Code d’identification fiscale',
    },
  },
  usersPage: {
    title: 'Utilisateurs',
    generic: {
      subTitle:
        'Afficher et gérer les fonctions attribuées aux utilisateurs pour les produits auxquels l’organisme a adhéré.',
    },
    pnpg: {
      subTitle: 'Gérer les utilisateurs habilités à lire les notifications de {{ businessName}}.',
    },
  },
};
