import ListItem from "./ListItem";
import axios from "axios";
import { PURCHASE_INVOICES } from "../../misc/constants";
import { useEffect, useState } from "react";

const List = () => {
    const [items, setItems] = useState([])

    const getAllInvoices = async () => {
        axios.get('/purchase-invoices').then(response => {
            setItems(response.data)
        })
    }

    useEffect(() => {
        getAllInvoices()
    }, [])

    return (
        <div className="List p-6">
            <h2 className="text-xl font-bold mb-4 text-left">Nove kalkulacije</h2>

            <div className="grid grid-cols-3 gap-4 mb-4">
                {items.map((item, index) => (
                    <ListItem key={index} item={item} className={index >= 3 && 'hidden'}/>
                ))}
            </div>

            <div className="underline text-base cursor-pointer text-right w-full">Vidi vise</div>
        </div>
    );
  }
  
  export default List;