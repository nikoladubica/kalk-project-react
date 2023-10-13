import Calculation from "../Calculation/Calculation"
import { useState } from "react"

const ListItem = (props) => {
    const [openModal, setOpenModal] = useState(false)

    const openModalHandler = () => {
        setOpenModal(true)
    }

    const createDate = (date) => {
        const dateObj = new Date(date)
        const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
        const month = dateObj.getMonth() < 10 ? `0${dateObj.getMonth()}` : dateObj.getMonth()
        return `${day}.${month}.${dateObj.getFullYear()}.`
    }

    const issueDate = createDate(props.item.issueDate)
    const dueDate = createDate(props.item.dueDate)
    const deliveryDate = createDate(props.item.deliveryDate)

    return (
        <>
            <div className={`ListItem relative flex flex-col items-center justify-center gap-2 p-4 rounded-md shadow-md cursor-pointer 
            bg-blue-900 hover:bg-blue-800 active:bg-blue-700 transition-colors ${props.className}`} onClick={openModalHandler}>
                <div className="relative h-8 w-8 rounded-sm border-2 border-blue-400 flex items-center justify-center flex-col gap-1">
                    <div className="w-[70%] border-t-2 border-t-blue-400"></div>
                    <div className="w-[70%] border-t-2 border-t-blue-400"></div>
                    <div className="w-[70%] border-t-2 border-t-blue-400"></div>
                </div>
                
                <span className="text-base font-bold mb-2">{props.item.supplierName}</span>
                
                <span className="text-xs">
                    <span className="font-bold">Issue date: </span>
                    {issueDate}
                </span>

                <span className="text-xs">
                    <span className="font-bold">Due date: </span>
                    {dueDate}
                </span>

                <span className="text-xs">
                    <span className="font-bold">Delivery date: </span>
                    {deliveryDate}
                </span>

                <span className="text-xl font-bold mt-4 text-red-300">
                    {props.item.totalCost} RSD
                </span>
            </div>

            {openModal && <Calculation id={props.item.id} setOpenModal={setOpenModal} />}
        </>
    );
  }
  
  export default ListItem;