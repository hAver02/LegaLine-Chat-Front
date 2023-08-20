export function formatDateToYYYYMMDD(backendDate) {
    const dateObj = new Date(backendDate);
  
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }



  export function isValidDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!regex.test(dateString)) {
      return false; // El formato no es 'YYYY-MM-DD'
    }
  
    // Extraer los componentes de la fecha
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(5, 7), 10);
    const day = parseInt(dateString.slice(8, 10), 10);
  
    // Validar que el año, el mes y el día estén dentro de los rangos válidos
    if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }
  
    return true;
  }
  