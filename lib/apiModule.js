import fetch from 'node-fetch';

const baseUrl = 'https://qualityshepherd.com';


/**
 * make a get api request
 * @param  {string} url - the api url
 * @return {obj} - the response
 */
async function get(url) {
  return await fetch(`${baseUrl}${url}`, { method: 'GET'})
    .then(res => res.json())
    .catch(error => console.error(error));
}


export function getPosts() {
  return get(`/wp-json/wp/v2/posts`);
}
