import 'whatwg-fetch';

const API_URL = 'https://dog.ceo/api';

function apiCall(endpoint, method = 'GET', data = null) {

  const fullUrl = (endpoint.indexOf(API_URL) === -1) ? API_URL + endpoint : endpoint;
  const body = data ? JSON.stringify(data) : null;

  return fetch(fullUrl, {
      method: method,
      body: body
    })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {

      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => ({ response }),
      error => (Promise.reject(error))
    );
}

export const getAllDogs = () => apiCall('/breeds/list/all');
export const getDogImages = (name) => apiCall(`/breed/${name}/images`);


