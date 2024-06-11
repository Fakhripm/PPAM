import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error fetching user:', userError);
          return;
        }

        if (!userData || !userData.user) {
          console.error('No user data returned:', userData);
          return;
        }

        const user = userData.user;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error('Unexpected error fetching profile:', error);
      }
    }

    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
