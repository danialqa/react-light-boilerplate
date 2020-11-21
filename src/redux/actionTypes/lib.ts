export function flattener(constants: any): any {
  return constants.flat().reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function single(type = ""): string {
  return type.toUpperCase();
}

export function promise(type = "", action?: string): Array<string> {
  const str = type.toUpperCase();

  if (action) {
    const request = action.toUpperCase();

    const create =
      request.indexOf("C") !== -1
        ? [
            `CREATE_${str}`,
            `CREATE_${str}_REQUESTING`,
            `CREATE_${str}_SUCCESS`,
            `CREATE_${str}_FAILURE`,
          ]
        : [];

    const load =
      request.indexOf("L") !== -1
        ? [
            `LOAD_${str}`,
            `LOAD_${str}_REQUESTING`,
            `LOAD_${str}_SUCCESS`,
            `LOAD_${str}_FAILURE`,
          ]
        : [];

    const update =
      request.indexOf("U") !== -1
        ? [
            `UPDATE_${str}`,
            `UPDATE_${str}_REQUESTING`,
            `UPDATE_${str}_SUCCESS`,
            `UPDATE_${str}_FAILURE`,
          ]
        : [];

    const del =
      request.indexOf("D") !== -1
        ? [
            `DELETE_${str}`,
            `DELETE_${str}_REQUESTING`,
            `DELETE_${str}_SUCCESS`,
            `DELETE_${str}_FAILURE`,
          ]
        : [];

    const loadAll =
      request.indexOf("A") !== -1
        ? [
            `LOAD_ALL_${str}`,
            `LOAD_ALL_${str}_REQUESTING`,
            `LOAD_ALL_${str}_SUCCESS`,
            `LOAD_ALL_${str}_FAILURE`,
          ]
        : [];

    return [...create, ...load, ...update, ...del, ...loadAll];
  }

  return [`${str}`, `${str}_REQUESTING`, `${str}_SUCCESS`, `${str}_FAILURE`];
}
