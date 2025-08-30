import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="w-1/2 bg-base-300"></div>
            <div className="w-full lg:w-1/2 grow flex justify-center items-center">
                <Outlet/>
            </div>
        </div>
    )
}