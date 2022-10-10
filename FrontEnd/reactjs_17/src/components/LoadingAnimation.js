import swal from "sweetalert2";

export default function LoadingAnimation() {

    swal.fire({
      width:'fit-content',
      background:'none',
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick:false,
      allowEnterKey:false,
      allowEscapeKey:false,
      didOpen: () => {
        swal.showLoading()
      },
    }).then(() => {
  
    })
}