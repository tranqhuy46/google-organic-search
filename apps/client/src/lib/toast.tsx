import { toast } from "react-toastify";
import Toast from "react-bootstrap/Toast";

function success(msg?: string) {
  toast(msg, {
    type: "success",
  });
}

function error(msg?: string) {
  toast(msg, {
    type: "error",
  });
}

export default { success, error } as const;
