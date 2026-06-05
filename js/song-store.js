/* ===== SongStore — cloud-synced song suggestions ===== */
/* Uses JSONBin.io as a free JSON database (no backend).  */
/*                                                        */
/* SETUP (one-time, ~1 minute):                           */
/*  1. Go to https://jsonbin.io  →  Sign Up (free)        */
/*  2. Go to API Keys  →  copy your X-Master-Key          */
/*  3. Click "+ Create a Bin"  →  paste:  []  →  Create   */
/*  4. Copy the Bin ID from the URL bar                   */
/*  5. Paste both values into BIN_ID and API_KEY below    */
/* ======================================================= */
(function () {
  'use strict';

  // ▼▼▼  PASTE YOUR VALUES HERE  ▼▼▼
  var BIN_ID  = '6a22683ef5f4af5e29bc2f93';
  var API_KEY = '$2a$10$4U8/Z7USeaRmbKHhxi1xqO4oZbTltqvigh4KrOZssAC6oytW8ADbG';
  // ▲▲▲  PASTE YOUR VALUES HERE  ▲▲▲

  var BASE_URL = 'https://api.jsonbin.io/v3/b/' + BIN_ID;

  function headers() {
    return {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    };
  }

  /** Fetch all songs from the cloud */
  function list() {
    return fetch(BASE_URL + '/latest', {
      method: 'GET',
      headers: headers()
    })
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load songs (' + res.status + ')');
      return res.json();
    })
    .then(function (data) {
      var record = data && data.record;
      return Array.isArray(record) ? record : [];
    });
  }

  /** Add a single song entry { song, timestamp } */
  function add(entry) {
    return list().then(function (songs) {
      songs.push(entry);
      return fetch(BASE_URL, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(songs.length ? songs : { empty: true })
      }).then(function (res) {
        if (!res.ok) throw new Error('Failed to save song (' + res.status + ')');
      });
    });
  }

  /** Remove the song at the given index */
  function remove(index) {
    return list().then(function (songs) {
      if (index >= 0 && index < songs.length) {
        songs.splice(index, 1);
        return fetch(BASE_URL, {
          method: 'PUT',
          headers: headers(),
          body: JSON.stringify(songs.length ? songs : { empty: true })
        }).then(function (res) {
          if (!res.ok) throw new Error('Failed to remove song (' + res.status + ')');
        });
      }
    });
  }

  /** Clear all songs */
  function clear() {
    return fetch(BASE_URL, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ empty: true })
    }).then(function (res) {
      if (!res.ok) throw new Error('Failed to clear songs (' + res.status + ')');
    });
  }

  window.SongStore = {
    list: list,
    add: add,
    remove: remove,
    clear: clear
  };
})();
