import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 bg-base-300"></div>
            <div className="w-1/2 flex justify-center items-center">
                <Outlet/>
            </div>
        </div>
    )
}