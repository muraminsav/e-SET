const url = 'http://localhost:3001/';

export const registerUser = async (register, setError, setRedirect) => {
  return await fetch(url + 'register', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(register),
  });
};

export const loginUser = async (login, setError, setRedirect) => {
  return await fetch(url + 'login', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(login),
  });
};

export const getUser = async () => {
  return await fetch(url + 'me', {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((data) => data.json())
    .then((user) => console.log(user))
    .catch((err) => console.log(err));
};

export const logoutUser = async (tokenName) => {
  removeToken(tokenName);
  await fetch(url + 'logout', {
    method: 'POST',
    mode: 'cors',
    header: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenName}`,
    },
    credential: 'include',
  }).then((res) => console.log(res));
};
