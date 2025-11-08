import ProfilePage from './components/ProfilePage';
import UserContext from './components/UserContext';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <UserContext.Provider value={userData}>
        <ProfilePage />
      </UserContext.Provider>
      
  
  
    </div>
  );
}

export default App;
