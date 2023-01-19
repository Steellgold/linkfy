import { pushToast } from "$lib/components/layouts/toast";

export function copy(toCopy: string) {
  if (!navigator.clipboard) {
    pushToast("Your browser does not support the clipboard API", "warning");
    return false;
  }

  if (typeof toCopy !== "string") {
    pushToast("The text provided to copy is not a string", "warning");
    return false;
  }

  if (toCopy == "" || toCopy == " ") {
    pushToast("The text provided to copy is empty, please try again", "warning");
    return false;
  }

  navigator.clipboard.writeText(toCopy);
  pushToast("The text provided has been copied to your clipboard", "success");
  return true;
}

export function minimize(url: string, lengthMax = 21, end = "[...]") {
  if (url.length > lengthMax) return url.substring(0, lengthMax) + end;
  return url;
}