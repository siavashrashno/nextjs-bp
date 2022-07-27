export function isServer() {
  return typeof window === "undefined";
}

export function clip(a: number, min: number, max: number) {
  return Math.min(Math.max(a, min), max);
}
export function getBasePath(locales: string[]) {
  if (!isServer()) {
    const { pathname } = window.location;
    const split = pathname.split("/");
    const base = window.location.protocol + "//" + window.location.host;
    if (split.length > 1 && locales.findIndex((f) => f === split[1]) >= 0) {
      return base + "/" + split[1];
    } else return base;
  }
}

export function dataURItoBlob(dataURI: string | null) {
  if (!dataURI) return null;
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

export function commafy(number: string, delimiterChar = ",") {
  if (!number) {
    return number;
  }
  const str = number.split(delimiterChar).join("").split(".");

  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1" + delimiterChar);
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}
