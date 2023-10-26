const PATH = "http://localhost:8090";

export async function registerUser(
  email: string,
  password: string,
  firstname: string,
  surname: string,
  city: string
) {
  const response = await fetch(`${PATH}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      firstname: firstname,
      surname: surname,
      city: city,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${PATH}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
