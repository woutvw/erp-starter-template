import Supplier from "../types/supplier";

interface SupplierCardProps{
    supplier?: Supplier
}

export default function SupplierCard({ supplier }: SupplierCardProps){
    if(supplier) return (
        <div className="card w-full bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{supplier.name}</h2>
            </div>
        </div>
    )

    return (
        <div className="card w-full bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title skeleton rounded-full h-6 w-50 mb-0.5"></h2>
            </div>
        </div>
    )
}