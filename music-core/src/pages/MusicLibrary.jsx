import React, { useState, useMemo } from 'react';
import { useAuth } from '../auth/AuthContext';
import Logout from '../auth/Logout';
import './libraryStyles.css';

const mockSongs = [
  { id: 1, title: 'Song A', artist: 'Artist X', album: 'Album 1' },
  { id: 2, title: 'Song B', artist: 'Artist Y', album: 'Album 2' },
  { id: 3, title: 'Song C', artist: 'Artist X', album: 'Album 1' },
];

const MusicLibrary = () => {
  const { user } = useAuth();
  const [songs, setSongs] = useState(mockSongs);
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState('title');

  const filteredSongs = useMemo(() => {
    return songs
      .filter(song => song.title.includes(filter) || song.artist.includes(filter) || song.album.includes(filter))
      .sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }, [songs, filter, sortKey]);

  const handleAddSong = () => {
    const newSong = { id: Date.now(), title: 'New Song', artist: 'New Artist', album: 'New Album' };
    setSongs(prev => [...prev, newSong]);
  };

  const handleRemoveSong = id => {
    setSongs(prev => prev.filter(song => song.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2>🎵 Music Library</h2>

        <input
          style={styles.input}
          placeholder="Filter by title, artist, album"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />

        <select style={styles.select} value={sortKey} onChange={e => setSortKey(e.target.value)}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>

        {user?.role === 'admin' && <button style={styles.button} onClick={handleAddSong}>Add Song</button>}

        <ul style={styles.list}>
          {filteredSongs.map(song => (
            <li key={song.id} style={styles.listItem}>
              {song.title} - {song.artist} ({song.album})
              {user?.role === 'admin' && (
                <button style={styles.removeButton} onClick={() => handleRemoveSong(song.id)}>Remove</button>
              )}
            </li>
          ))}
        </ul>
        <Logout/>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
    boxSizing: 'border-box',
    alignItems: "center",   
    width: "100vw"
  },
  wrapper: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '0.5rem 0',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: '1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.3rem 0.7rem',
    cursor: 'pointer',
  },
};

export default MusicLibrary;