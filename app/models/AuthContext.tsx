import { createContext, useContext, useState, ReactNode } from "react"

// Define the shape of our context
interface AuthContextType {
  authToken: string | null
  login: (token: string) => void
  logout: () => void
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  authToken: null,
  login: () => {},
  logout: () => {},
})

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null)

  // login function sets the auth token
  const login = (token: string) => {
    setAuthToken(token)
  }

  // logout function clears the auth token
  const logout = () => {
    setAuthToken(null)
  }

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext)
