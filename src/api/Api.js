const url = 'http://localhost:3001/';

export const registerUser = async (register, setError, setRedirect) => {
  return await fetch(url + 'register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(register),
  });
};

export const loginUser = async (login, setError, setRedirect) => {
  return await fetch(url + 'login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(login),
  });
};
