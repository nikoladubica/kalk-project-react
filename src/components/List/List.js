import ListItem from "./ListItem";
import axios from "axios";
import { PURCHASE_INVOICES } from "../../misc/constants";
import { useEffect, useState } from "react";

const List = () => {
    const [items, setItems] = useState([])
    const [more, setMore] = useState(false)

    const getAllInvoices = async () => {
        axios.get('/api/purchase-invoices').then(response => {
            setItems(response.data)
        })
    }

    const moreHandler = () => {
        setMore(!more)
    }

    useEffect(() => {
        getAllInvoices()
    }, [])

    return (
        <div className="List p-6">
            <h2 className="text-xl font-bold mb-4 text-left">New Calculations</h2>

            <div className="grid grid-cols-3 gap-4 mb-4">
                {items.map((item, index) => (
                    <ListItem key={index} item={item} className={!more && index >= 3 && 'hidden'}/>
                ))}
            </div>

            <div className="underline text-base cursor-pointer text-right w-full" onClick={moreHandler}>
                {more ? 'See less' : 'See more'}
            </div>
        </div>
    );
  }
  
  export default List;