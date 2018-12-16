import fetch from "node-fetch";

class Spotify {
  constructor(access_token) {
    this.access_token = access_token;
  }

  fetchUserID() {
   return fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this.access_token}
    })
    .then(res => res.json())
    .then(data => {
      return data.id;
    });
  };

  fetchCollabPlaylists() {
    return fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this.access_token}
    })
    .then(res => res.json())
    .then(data => {
      let collabPlaylists = [];
      for (let i = 0; i < data.playlists.length; i++)
        data.playlists[i].collaborative ? collabPlaylists.push(data.playlists[i]) : '';
      return collabPlaylists;
    });
  }

}
export default Spotify;