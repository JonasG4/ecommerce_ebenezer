export function formatPhoneNumber(number) {
  let phoneNumberString = number;
  let newText = "";
  let cleaned = ("" + phoneNumberString).replace(/\D/g, "");

  for (let i = 0; i < cleaned.length; i++) {
    if (i == 4) {
      newText = newText + "-";
    }

    if (i < 8) {
      newText = newText + cleaned[i];
    }
  }
  return newText;
}

export function formatPrice(price) {
  
  const prices = (price).toString().split(".");
  let integer = parseInt(prices[0].replace(/\D/g, ""));
  let decimal = prices[1] ? prices[1].replace(/\D/g, "") : "";

  if (!isNaN(integer)) {
    integer = integer.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }

  if (prices.length >= 2) {
    decimal = decimal.slice(0, 2);
    return `${integer}.${decimal}`;
  }

  const newPrice = integer ? integer : "";
  return newPrice;
}

