import { ReactNode, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
import api from "../api/axios";
import useDebounce from "../hooks/useDebounce";

interface DataTableProps {
    children: ReactNode
    uri: string
    createLink?: string
    createText?: string
    onDataUpdate:(data: any) => void
}

export default function DataTable({ children, uri, createLink, createText, onDataUpdate }: DataTableProps){
    const [ search, setSearch ] = useState('');
    const debouncedSearch = useDebounce(search, 400);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const {t} = useTranslation();

    useEffect(() => {
        fetchData(1);
    }, [debouncedSearch])

    function fetchData(page: number){
        api.get(uri, {
                params: {
                    search: debouncedSearch,
                    page: page
                }
            })
            .then(response => {
                const data = response.data.data;
                onDataUpdate(data);

                const meta = response.data.meta;
                setCurrentPage(meta.current_page);
                setLastPage(meta.last_page);
            })
    }

    return (
        <>
            <div className="mb-2 flex justify-between">
                <input className="input focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('Search ...')}/>
                { (createLink && createText) && (
                    <Link to={createLink} className="btn btn-primary">{t(createText)}</Link>
                )}
            </div>
            <div className="rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {children}
                </table>
            </div>
            <div className="flex justify-end">
                <div className="join mt-2">
                    <button className="join-item btn" disabled={currentPage === 1} onClick={() => fetchData(currentPage - 1)}>«</button>
                    <button className="join-item btn">{t('Page')} {currentPage}</button>
                    <button className="join-item btn" disabled={currentPage === lastPage} onClick={() => fetchData(currentPage + 1)}>»</button>
                </div>
            </div>
        </>
    )
}