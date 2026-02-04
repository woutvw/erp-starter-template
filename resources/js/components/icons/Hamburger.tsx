import { strokeIconStyle } from "./style";

export default function Hamburger(){
    return (
        <svg width="800px" height="800px" style={strokeIconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20"/>
        </svg>
    )
}