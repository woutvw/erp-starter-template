import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import ApiErrors from "../../types/apiErrors";
import Category from "../../types/category";

interface CategoryFormProps {
    category?: Category
    errors: ApiErrors
    onSave: (category: Omit<Category, 'id'>) => void
}

export default function CategoryFrom({ category, errors, onSave }: CategoryFormProps){
    const [name, setName] = useState('');

    const {t} = useTranslation();

    useEffect(() => {
        if(category){
            setName(category.name);
        }
    }, [category])

    function submit(e: React.FormEvent){
        e.preventDefault();

        onSave({
            name: name
        })
    }

    return (
        <form className="card bg-base-100 p-4" onSubmit={submit}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Name')}*</legend>
                <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
                { errors.name ? <p className="label text-error">{errors.name[0]}</p> : <></>}
            </fieldset>
            <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">{t('Save')}</button>
            </div>
        </form>
    )
}