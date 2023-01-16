import { pushToast } from "$lib/components/layouts/toast";

export function copy(toCopy: string) {
  if (!navigator.clipboard) {
    pushToast("Your browser does not support the clipboard API", "warning");
    return false;
  }

  if (typeof toCopy !== "string"){
    pushToast("The link is not a string", "warning");
    return false;
  }
  
  if (toCopy == "" || toCopy == " ") {
    pushToast("The link provided is empty, please try again", "warning");
    return false;
  }

  navigator.clipboard.writeText(toCopy);
  pushToast("The link has been copied to your clipboard", "success");
  return true;
}