export const printDuplicateTitle = (duplicate) => {

  if (duplicate.nin) return `NIN ${duplicate.nin}`;
  else
    return `${duplicate.nameAndDate?.firstName} ${
      duplicate.nameAndDate?.lastName
    } : born in ${
      duplicate.nameAndDate?.dateOfBirth
        ? new Date(duplicate.nameAndDate?.dateOfBirth).toLocaleDateString()
        : "unknown date"
    }`;
};
