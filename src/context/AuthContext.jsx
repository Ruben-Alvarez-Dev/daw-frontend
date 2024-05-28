import { auth }from '../firebase/firebase.config';
import { createContext, useContext } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailndPassword, 
    GoogleAuthProvier, 
    signInWithPopup
} from 'firebase/auth';

export cnst authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    
    const register = async (email, password) => {
        const response = await createUserWithEmailAndPassword( auth, email, password );
        console.log(response);       
    };
    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword( auth, email, password );
        console.log(response);
    }; 
    const loginWithGoogle = async () => {
        console.log('Login with Google');
    };
     
    return ( 
        <authContext.Provider value={{ register, login }}>
            {children}
        </authContext.Provider>
    );
}