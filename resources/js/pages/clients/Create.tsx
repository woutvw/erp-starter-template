import { Link } from "react-router-dom";

export default function ClientCreate(){
    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li>Create</li>
                </ul>
            </div>
        </>
    )
}