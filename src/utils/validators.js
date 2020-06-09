function stateCodeValidator() {
  return function stateCode(value) {
    return (
      (value
        && !!value.match(
          /^(A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/i,
        ))
      || 'Please enter a valid state code'
    );
  };
}

function requiredValidator() {
  return function required(value) {
    return (
      (value !== undefined && value !== null && value !== '')
      || 'This field is required'
    );
  };
}

function districtValidator() {
  return function district(value) {
    return (
      (value !== undefined && value !== null && parseInt(value, 10) >= 0)
      || 'Please enter a valid district'
    );
  };
}

export { stateCodeValidator, requiredValidator, districtValidator };
