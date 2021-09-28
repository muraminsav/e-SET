const url = 'http://localhost:3001/';

export const registerUser = async (register) => {
  return await fetch(url + 'register', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(register),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateUser = async (user, userId) => {
  return await fetch(url + 'updateUser/' + userId, {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const loginUser = async (login) => {
  return await fetch(url + 'login', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(login),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getUser = async (id) => {
  return await fetch(url + `me/${id}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const logoutUser = async () => {
  localStorage.removeItem('uId');
  return fetch(url + 'logout', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
export const deleteUser = async () => {
  const id = localStorage.uId;
  console.log('apiDel', id);
  return fetch(url + 'delete/' + id, {
    method: 'Delete',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then(() => {
      logoutUser();
    })
    .catch((err) => console.log(err));
};
