import axios from "axios";
import { useState, useEffect } from "react";
import CalculationPrint from "./CalculationPrint";

const Calculation = (props) => {
    const [items, setItems] = useState([])
    const [calculations, setCalculations] = useState([])
    const [showPrint, setShowPrint] = useState(false)

    const closeModalHandler = () => {
        props.setOpenModal(false)
    }

    const setCalculationHandler = (e) => {
        if (!isNaN(e.target.value)) {
            const id = parseInt(e.target.dataset.id)
            const itemObj = JSON.parse(e.target.dataset.item)
    
            const item = {
                id: id,
                name: itemObj.name,
                unit: 'kom',
                initialPrice: itemObj.price_amount,
                profitMargin: itemObj.price_amount,
                sellingPriceNoVAT: itemObj.price_amount,
                tariffVAT: 'A',
                vat: itemObj.price_amount,
                sellingPrice: parseFloat(e.target.value),
                quantity: itemObj.quantity,
            }
    
            let helpArray = []
    
            calculations.forEach(calc => {
                if (calc.id !== id) {
                    helpArray.push(calc)
                }
            })
    
            setCalculations([...helpArray, item])
            e.target.style.border = '1px solid transparent'
        } else {
            e.target.style.border = '1px solid red'
        }        
    }

    const getData = (id) => {
        const params = {
            purchase_invoice_id: id
        }

        axios.get('/invoice-lines', { params }).then(response => {
            setItems(response.data)
        })
    }

    const showPrintHandler = () => {
        setShowPrint(true)
    }

    const handlePrint = () => {
        window.print()
    }

    useEffect(() => {
        getData(props.id)
    }, [])

    useEffect(() => {
        console.log("calculations: ", calculations)
    }, [calculations])

    return (
        <div className="Calculation fixed top-[76px] left-0 h-[calc(100vh-76px)] w-screen bg-slate-200 z-[100]">
            <div className="relative h-full w-full flex flex-col items-center justify-start p-6 overflow-y-scroll">
                <table className="print:hidden table-auto text-sm text-left text-gray-800">
                    <thead className="text-xs text-gray-700 uppercase bg-slate-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3 text-center">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-center">Price</th>
                            <th scope="col" className="px-6 py-3 text-center">Price + VAT + Discount</th>
                            <th scope="col" className="px-6 py-3 text-center">Your Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b border-b-slate-300">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                    <div title={item.name} className="whitespace-nowrap max-w-[400px] w-[400px] overflow-hidden text-ellipsis">
                                        {item.name}
                                    </div>
                                </th>
                                <td className="px-6 py-4 text-center">
                                    <span>
                                        {item.quantity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span>
                                        {item.price_amount}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span>
                                        {item.price_vat_discount}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span>
                                        <input onChange={setCalculationHandler} data-id={item.id} data-item={JSON.stringify(item)} type="text" className="bg-slate-300 border border-transparent py-2 px-4 rounded-full focus:ring-0 focus:border-none focus:outline-none" />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="print:hidden w-full mt-4 mb-16 flex justify-end items-center">
                    <button onClick={showPrintHandler} className="py-2 px-8 rounded-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-colors duration-300 text-white text-lg font-bold">Napravi fakturu</button>
                </div>

                {showPrint && <CalculationPrint items={calculations} />}
                {showPrint && <div className="print:hidden w-full mt-4 flex justify-end items-center">
                    <button onClick={handlePrint} className="py-2 px-8 rounded-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-colors duration-300 text-white text-lg font-bold">Stampaj</button>
                </div>}

                <div className="print:hidden absolute top-2 right-2 text-2xl text-black h-12 w-12 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-300 bg-slate-200 hover:bg-slate-300" onClick={closeModalHandler}>
                    ✕
                </div>
            </div>
        </div>
    );
  }
  
  export default Calculation;