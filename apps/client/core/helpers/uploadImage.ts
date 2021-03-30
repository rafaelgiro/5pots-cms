import { UIReducerActionsI } from "../contexts/interfaces";
import api from "../services/api";

export function uploadImage(
  image: FileList,
  token: string,
  dispatch: React.Dispatch<UIReducerActionsI>,
  fileName: string | false,
  callback: (urls: string[]) => void
) {
  const files = Array.from(image);
  const formData = new FormData();

  files.forEach((file, i) => {
    formData.append(`image-${i}`, file);
  });
  fileName && formData.append("name", fileName);

  dispatch({ type: "OPEN_LOADING" });

  api
    .post("/assets/images/pbe", formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: token,
      },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      dispatch({
        type: "SHOW_SNACKBAR",
        snackbar: {
          msg: err.response.data.message || "Deu ruim mano.",
          variant: "error",
        },
      });
    })
    .finally(() => {
      dispatch({ type: "CLOSE_LOADING" });
    });
}
