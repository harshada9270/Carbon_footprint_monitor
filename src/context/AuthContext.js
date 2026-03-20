import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('carbonFootprintUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('carbonFootprintUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('carbonFootprintUsers') || '[]');
    
    // Find user with matching credentials
    const user = storedUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Remove password from user object before storing in current user
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('carbonFootprintUser', JSON.stringify(userWithoutPassword));
      return { success: true, message: 'Login successful!' };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const register = (name, email, password, userType = 'individual') => {
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('carbonFootprintUsers') || '[]');
    
    // Check if user already exists
    const existingUser = storedUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'User with this email already exists' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      userType,
      createdAt: new Date().toISOString(),
      carbonFootprint: 0,
      goals: [],
      achievements: []
    };

    // Add to stored users
    storedUsers.push(newUser);
    localStorage.setItem('carbonFootprintUsers', JSON.stringify(storedUsers));

    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('carbonFootprintUser', JSON.stringify(userWithoutPassword));

    return { success: true, message: 'Registration successful!' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('carbonFootprintUser');
  };

  const updateUserProfile = (updates) => {
    if (!currentUser) return { success: false, message: 'No user logged in' };

    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('carbonFootprintUsers') || '[]');
    
    // Find and update user
    const userIndex = storedUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      storedUsers[userIndex] = { ...storedUsers[userIndex], ...updates };
      localStorage.setItem('carbonFootprintUsers', JSON.stringify(storedUsers));
      
      // Update current user
      const { password: _, ...userWithoutPassword } = storedUsers[userIndex];
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('carbonFootprintUser', JSON.stringify(userWithoutPassword));
      
      return { success: true, message: 'Profile updated successfully!' };
    }
    
    return { success: false, message: 'User not found' };
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
