export function converToCode(text) {
  let textNoSpaces = text.toLowerCase().replace(/ /g, "-");

  // Reemplazar "ñ" por "n"
  let sinEnie = textNoSpaces.replace(/ñ/g, "n");

  // Reemplazar vocales tildadas sin tilde
  let sinTilde = sinEnie.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Reemplazar caracteres especiales
  let newText = sinTilde.replace(/[^\w-]/g, '');

  return newText;
}

export const calcularPorcentaje = (precio, descuento) => {
  const price = parseFloat(precio);
  const discount = parseFloat(descuento);
  let porcentaje = price - (discount / 100) * price;
  return porcentaje.toFixed(2);
};