const PATH = "http://localhost:8090";

export async function getAllAds() {
  const response = await fetch(`${PATH}/ads?sorting=new`, {
    method: "GET",
  });
  const responseData = await response.json();
  return responseData;
}
