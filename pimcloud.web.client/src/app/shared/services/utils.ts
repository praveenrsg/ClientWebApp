export const apiErrorHandler = (statusCode: number) => {
  switch (statusCode) {
    case 500:
      console.log("Internal server error!");
      break;
    case 401:
      console.log("Unauthorized");
      break;
    default:
      console.log("default error handler");
  }
};