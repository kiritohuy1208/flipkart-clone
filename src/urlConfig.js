// export const api = "http://localhost:8080/api";
// export const generatePublicUrl = (filename) => {
//   return `http://localhost:8080/public/${filename}`;
// };
const baseUrl = "https://flipkart-rest-backend.herokuapp.com";

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};
