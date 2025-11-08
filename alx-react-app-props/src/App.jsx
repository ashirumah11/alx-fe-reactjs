import ProfilePage from './components/ProfilePage';
import UserContext from './components/UserContext';
import UserProfile from './components/UserProfile';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <UserContext.Provider value={userData}>
        <ProfilePage />
      </UserContext.Provider>
      
      <UserContext.Provider value={userData}>
      <UserProfile />
    </UserContext.Provider>
  
    </div>
  );
}

export default App;
