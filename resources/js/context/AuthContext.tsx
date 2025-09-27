import { createContext, ReactNode, useContext, useLayoutEffect, useState } from "react";
import api from "../api/axios";
import { InternalAxiosRequestConfig } from "axios";

// Define the shape of the auth context
interface AuthContextType {
    accessToken: string | null;
    login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
    register: (name: string, email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

const clientId = '01998bfd-7d4f-7341-bba7-bb614df91b97';
const clientSecret = '9G25b9BcZxCzzSwI1XBnKdMbxpsEDn8vyNiv0y2u';

export function AuthProvider({ children }: {children: ReactNode}){
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('access_token'));
    const [ refreshToken, setRefreshToken ] = useState(localStorage.getItem('refresh_token'));

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            config.headers.Authorization = accessToken && !config._retry ? `Bearer ${accessToken}` : config.headers.Authorization

            return config
        })

        return () => {
            api.interceptors.request.eject(authInterceptor)
        }
    }, [accessToken])

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;

            if(error.response.status === 401 && error.response.data.message === 'Unauthenticated.'){
                try{
                    const response = await api.post('/oauth/token',{
                            grant_type: 'refresh_token',
                            refresh_token: refreshToken,
                            client_id: clientId,
                            client_secret: clientSecret,
                            scope: ''
                        })

                    setAccessToken(response.data.access_token);
                    setRefreshToken(response.data.refresh_token);

                    localStorage.setItem('access_token',response.data.access_token)
                    localStorage.setItem('refresh_token',response.data.refresh_token)

                    originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
                    originalRequest._retry = true;

                    return api(originalRequest);
                }catch(e){
                    logout()
                }
            }
            if(error.response.status === 401 && error.config.url === '/oauth/token'){
                setAccessToken(null);
                setRefreshToken(null);

                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
            }

            return Promise.reject(error)
        })

        return () => {
            api.interceptors.response.eject(refreshInterceptor)
        }
    }, [refreshToken])

    function login(email: string, password: string, rememberMe: boolean){
        return new Promise(async (resolve, reject) => {
            try{
                const response = await api.post('/oauth/token',{
                        grant_type: 'password',
                        client_id: clientId,
                        client_secret: clientSecret,
                        username: email,
                        password: password,
                        scope: ''
                    })

                setAccessToken(response.data.access_token);
                setRefreshToken(response.data.refresh_token);

                localStorage.setItem('access_token',response.data.access_token)
                localStorage.setItem('refresh_token',response.data.refresh_token)

                return resolve(true);
            }catch(e){
                return reject(e);
            }
        })
    }

    function register(name: string, email: string, password: string){
        // TODO: login logic
    }

    function logout(){
        setAccessToken('');
        setRefreshToken('');

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }

    return (
        <AuthContext.Provider value={{ accessToken, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

