import Bin from "./icons/Bin";
import ClientsIcon from "./icons/Clients";
import Dollar from "./icons/Dollar";
import HomeIcon from "./icons/Home";
import PencilIcon from "./icons/Pencil";
import ReceiptIcon from "./icons/Receipt";
import SearchIcon from "./icons/Search";
import TrendDown from "./icons/TrendDown";
import TrendUp from "./icons/TrendUp";
import Warehouse from "./icons/Warehouse";

export default function Icon({name, className = ''}: {name: string, className?: string}){
    // icons: https://www.svgrepo.com/collection/dazzle-line-icons
    switch(name){
        case 'home': return <div className={className}><HomeIcon/></div>;
        case 'warehouse': return <div className={className}><Warehouse/></div>;
        case 'bin': return <div className={className}><Bin/></div>;
        case 'search': return <div className={className}><SearchIcon/></div>;
        case 'clients': return <div className={className}><ClientsIcon/></div>;
        case 'receipt': return <div className={className}><ReceiptIcon/></div>;
        case 'pencil': return <div className={className}><PencilIcon/></div>;
        case 'trend-up': return <div className={className}><TrendUp/></div>;
        case 'trend-down': return <div className={className}><TrendDown/></div>;
        case 'dollar': return <div className={className}><Dollar/></div>;
    }
    return <></>
}