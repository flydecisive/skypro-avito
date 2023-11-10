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
      name: firstname,
      surname: surname,
      city: city,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
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

  if (!response.ok && response.status === 401) {
    throw new Error("Ошибка авторизации");
  }

  const responseData = await response.json();
  return responseData;
}

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const { access_token } = JSON.parse(
    localStorage.getItem("tokenData") || "{}"
  );

  const response = await fetch(`${PATH}/user/password`, {
    method: "PUT",
    body: JSON.stringify({
      password_1: oldPassword,
      password_2: newPassword,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok && response.status === 400) {
    throw new Error("Ошибка валидации");
  }

  const responseData = await response.json();
  return responseData;
};
