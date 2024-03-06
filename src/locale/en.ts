export default {
  session: {
    expired: {
      title: 'Session expired',
      message: 'You are about to be redirected to the login page...',
    },
  },
  userPagesPath: {
    detailRedirect: 'Users',
    addUser: 'Add new user',
    editUser: 'Edit user profile',
  },
  usersTable: {
    usersProductTableColumns: {
      headerFields: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
      },
      rows: {
        isCurrentUser: '(you)',
        suspendedChip: 'Suspended',
      },
    },
    filterRole: {
      placeholder: 'All roles',
      admin: {
        title: 'Administrator',
        description: 'Has all permissions and manages users',
      },
      limited: {
        title: 'Operator',
        description: 'Manages the technological integration and/or operation of services',
      },
      addFilters: 'Filter',
      deleteFilters: 'Reset filter',
      noDataFilter:
        'The filters you applied did not yield any results. <1><2>Remove filters</2></1>.',
      errorOnFetch: 'Sorry, something went wrong. <1><2>Try again</2></1>.',
    },
    rowActions: {
      toolTipActions: 'Select action type',
      toolTipInfo: "Actions are available in the user's profile",
      edit: 'Edit',
      rehabilitate: 'Re-enable',
      suspend: 'Suspend',
      delete: 'Remove',
      deleteModal: {
        title: 'Remove role',
        message:
          'You are about to remove <1>{{user}}</1> from the role of <3>{{userRole}}</3>.<5 />If you remove them, they will no longer be able to operate on <7>{{productTitle}}</7>. <9 />You can reassign the role at any time.',
        confirmButton: 'Confirm',
        closeButton: 'Cancel',
      },
      deleteSuccess: 'Role removed successfully',
      deleteError: 'The role could not be removed. Please try again.',
      changeUserRoleStatusModal: {
        suspend: {
          title: 'Suspend role',
          message:
            'Do you want to suspend <1>{{user}}</1> from the role of <3>{{userRole}}</3>?<4 />If you suspend them, they will no longer be able to operate on <6>{{productTitle}}</6>. <8 />You can re-enable them at any time.',
        },
        reactivate: {
          title: 'Re-enable role',
          message:
            'Do you want to re-enable <1>{{user}}</1> in the role of <3>{{userRole}}</3>?<4 />If you re-enable them, they will be able to operate on <6>{{productTitle}}</6> again.<8 /> You can suspend them again at any time.',
        },
        confirmButton: 'Confirm',
        closeButton: 'Cancel',
      },
      changeUserRoleSuccess: 'Role {{userStatus}} successfully',
      suspendRoleError: 'The role could not be suspended. Please try again.',
      reactivateRoleError: 'The role could not be re-enabled. Please try again.',
    },
    loadMore: 'Load more ',
    addButton: 'Add user',
    tabAll: 'All',
  },
  userDetail: {
    title: 'User Profile',
    name: 'Name',
    surname: 'Surname',
    fiscalCode: 'Fiscal Code',
    institutionalEmail: 'Institutional email',
    institution: 'ENTITY',
    editButton: 'Edit',
    deleteButton: 'Remove',
    backButton: 'Back',
    actions: {
      delete: {
        userRoleDelete: 'Role removed successfully',
        userDelete: 'User successfully removed',
        userDeleteError: 'Could not remove user. Please try again.',
      },
      modalDelete: {
        moreRolesOnProduct: {
          title: 'Remove Role',
          message:
            'Do you want to remove <1>{{user}}</1> from the role of <3>{{role}}</3>? <6 />You can reassign the role at any time.',
        },
        oneRoleOnProduct: {
          title: 'Delete User',
          message: 'You are about to delete <1>{{user}}</1>.<3 />Do you want to continue?',
        },
        haveMoreProducts:
          'You are about to remove <2>{{user}}</2> from the role of <4>{{productRole}}</4>. <5 />If you remove them, they will no longer be able to operate on <7>{{productTitle}}</7>. <9 />You can reassign the role at any time.',
        removeRoleButton: 'Remove',
        closeButton: 'Cancel',
      },
      changeUserStatusModal: {
        suspend: {
          title: 'Suspend role',
          messageWithOneRole:
            'Do you want to suspend <1>{{user}}</1> from the role of <3>{{productRole}}</3>?<4 />If you suspend them, they will no longer be able to operate on <6>{{productTitle}}</6>. <8 />You can re-enable them at any time.',
          messageWithMultipleRoles:
            'Do you want to suspend <1>{{user}}</1> from the role of <3>{{productRole}}</3>?<4 />You can re-enable them at any time.',
        },
        reactivate: {
          title: 'Re-enable role',
          messageWithOneRole:
            'Do you want to re-enable <1>{{user}}</1> in the role of <3>{{productRole}}</3>?<4 />If you re-enable them, they will be able to operate on <6>{{productTitle}}</6> again.<8 /> You can suspend them again at any time.',
          messageWithMultipleRoles:
            'Do you want to re-enable <1>{{user}}</1> in the role of <3>{{productRole}}</3>?<4 /> You can suspend them again at any time.',
        },
        confirmButton: 'Re-enable',
        confirmButtonSuspend: 'Suspend',
        closeButton: 'Cancel',
      },
      changeUserStatusSuccess: 'Role {{userStatus}} successfully',
      changeUserStatusSuspendError: 'The role could not be suspended. Please try again.',
      changeUserStatusRehabilitateError: 'The role could not be re-enabled. Please try again.',
      changeUserStatusRemoveError: 'The role could not be removed. Please try again.',
      suspendRole: 'Suspend',
      reactivateRole: 'Re-enable',
      deleteButton: 'Remove',
      successfulAddRole: 'Role assigned successfully',
      successfulAddUserToGroup: 'User assigned successfully',
      addRoleError: 'The role could not be assigned. Please try again.',
      newGroupAssign: 'Assign group',
      newGroupAssignModal: {
        title: 'Assign group',
        message:
          'Select the group you want to assign to <1>{{user}}</1> for product <3>{{productTitle}}</3>',
        groupPlaceholder: 'Select group',
        confirmButton: 'Assign group',
        closeButton: 'Cancel',
      },
      newRoleAssign: 'Assign another role',
      newRoleAssignModal: {
        title: 'Assign role',
        message:
          'Assign <1>{{user}}</1> another role <3>{{userRole}}</3> for the product <5>{{productTitle}}</5>',
        confirmButton: 'Assign',
        closeButton: 'Cancel',
      },
      deleteUserModal: {
        title: 'Remove role',
        message:
          "Do you want to remove <1>{{user}}</1> from the role of <3>{{role}}</3>? <5/> <6/> If you remove it from <8>{{product}}</8>, the user's profile will be deleted from the Area Riservata, as it is not present in other products. You will be able to add the user again, but you will have to enter their personal data again.",
        confirmButton: 'Remove',
        closeButton: 'Cancel',
      },
      deleteProductUserModal: {
        title: 'Remove role',
        message: 'You are about to delete <1>{{user}}</1>.<3 />Do you want to continue?',
        confirmButton: 'Remove',
        closeButton: 'Cancel',
      },
    },
    productSection: {
      title: 'Roles',
      addButton: 'Assign role',
    },
    pathDescription: 'Users',
    selfCareRole: 'ROLE ON SELF CARE',
    suspended: 'suspended',
    rehabilitated: 're-enabled',
    group: 'Groups',
    role: 'Role',
    statusLabel: 'Suspended',
    infoIcon: 'You do not have permissions to manage this product',
  },
  userEdit: {
    mismatchWithTaxCode: {
      name: 'Incorrect name or different from Fiscal Code',
      surname: 'Incorrect surname or different from the Fiscal Code',
    },
    addForm: {
      title: 'Add a new user',
      subTitle: "Enter the user's details, select a product and assign it a role.",
      userData: {
        label: 'User data',
      },
      fiscalCode: {
        label: 'Fiscal Code',
      },
      name: {
        label: 'Name',
      },
      surname: {
        label: 'Surname',
      },
      institutionalEmail: {
        label: 'Institutional email',
      },
      confirmInstitutionalEmail: {
        label: 'Confirm email',
      },
      product: {
        title: 'Select product',
      },
      role: {
        title: 'Select the role you want to assign to the user',
      },
      backButton: 'Back',
      continueButton: 'Continue',
      errors: {
        invalidFiscalCode: 'The Fiscal Code is not valid ',
        invalidEmail: 'The email address is not valid',
        mismatchEmail: 'The email addresses do not match',
      },
      saveUserSuccess: 'User added successfully',
      saveUserError: 'You have already added this user.',
      addMultiRoleModal: {
        title: 'Assign role',
        message:
          'You are about to assign <1>{{user}}</1> the roles <3>{{roles}}</3> for the product < 5 >{{productTitle}}</5>< 6 >< 7 ></7>< 8 ></8></6>Are you sure you want to continue?<9></9>',
        confirmButton: 'Assign',
        closeButton: 'Cancel',
      },
      addOneRoleModal: {
        title: 'Assign role',
        message:
          'Do you want to assign <1>{{user}}</1> the role of <3>{{role}}</3> for <5>{{productTitle}}</5>?<7><8></8><9></9></7>',
        confirmButton: 'Assign',
        closeButton: 'Cancel',
      },
    },
    editRegistryForm: {
      title: 'Edit user profile',
      fiscalCode: {
        label: 'Fiscal Code',
      },
      name: {
        label: 'Name',
      },
      surname: {
        label: 'Surname',
      },
      institutionalEmail: {
        label: 'Institutional email',
      },
      confirmInstitutionalEmail: {
        label: 'Confirm email',
      },
      backButton: 'Back',
      confirmButton: 'Confirm',
      errors: {
        userNotFind: 'Unable to locate the desired user',
        invalidEmail: 'The email address is not valid',
        mismatchEmail: 'The email addresses do not match',
      },
      editUserSuccess: 'Profile modified correctly',
      editUserError: 'An error occurred while editing the profile. Please try again.',
    },
    addProduct: {
      navigation: 'Assign role',
      title: 'Assign a new role',
      subTitle: 'Select the product and role you want to assign to the user.',
      name: 'Name',
      surname: 'Surname',
      fiscalCode: 'Fiscal code',
    },
  },
  usersPage: {
    title: 'Users',
    generic: {
      subTitle:
        'View and manage the roles assigned to users for the products to which the organisation has joined.',
    },
    pnpg: {
      subTitle: 'Manage users who can read notifications from{{ businessName}}.',
    },
  },
};
