//@flow
export const host = "http://localhost:8000";

export function getErrorNotification(title: string, error: Object) {
  let message = "";

  if (error.response) {
    message = `Server responded with a status code ${error.response.status}`;

    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    message = "The request was made but no response was received";

    console.log(error.request);
  } else {
    message =
      "Something happened in setting up the request that triggered an Error";
    console.log("Error", error.message);
  }
  console.log(error.config);
  return {
    title,
    message,
    status: "error",
    dismissible: true,
    dismissAfter: 5000
  };
}
