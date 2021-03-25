export function coincidenciasLista(listaBase,busqueda) {
  let listaCoincidencias = [...listaBase];

  if (busqueda.length > 0) {
    if (listaBase.length != 0) {
      listaCoincidencias = [];
      listaBase.forEach((elemento, indice) => {
        let paciente = elemento;
        if (paciente.patient != undefined) {
          paciente = paciente.patient;
        }
        let nombre: String =
          paciente.name +
          " " +
          paciente.lastName +
          " " +
          paciente.lastNameSecond;
        nombre = nombre.toLowerCase();

        if (nombre.includes(busqueda)) {
          listaCoincidencias.push(elemento);
        }
      });
    }
  }
  return listaCoincidencias;
}
