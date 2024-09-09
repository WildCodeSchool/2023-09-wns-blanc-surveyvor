import Swal from "sweetalert2";

export function toast(icon: "success" | "error", title: string) {
  Swal.fire({
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
}

