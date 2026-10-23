import { useState, useEffect } from 'react';
import { AppUser } from '../types';

const PLAYER_NAME_STORAGE_KEY = 'mythweaver_standalone_player_name';

export function useUserStore() {
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem(PLAYER_NAME_STORAGE_KEY) || 'Aventurero';
  });

  useEffect(() => {
    localStorage.setItem(PLAYER_NAME_STORAGE_KEY, username);
  }, [username]);

  const currentUser: AppUser = {
    id: 'local-player',
    username,
    password: '',
    role: 'player',
    assignedCharacterIds: [],
    createdAt: new Date().toISOString(),
  };

  return {
    currentUser,
    users: [currentUser],
    activeUserId: 'local-player',
    setUsername,
    isDm: false,
  };
}
