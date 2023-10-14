import axios from "axios";
import { useState, useEffect } from "react";
import CalculationPrint from "./CalculationPrint";
import Button from "../Button/Button";

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
                sellingPrice: (Math.round((parseFloat(e.target.value) + Number.EPSILON) * 100) / 100).toFixed(2),
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
        const items = [
            {
                id: 1,
                name: "Item 1",
                quantity: 5,
                price_amount: 10.99,
                price_vat_discount: 2.00,
            },
            {
                id: 2,
                name: "Item 2",
                quantity: 2,
                price_amount: 7.49,
                price_vat_discount: 1.50,
            },
            {
                id: 3,
                name: "Item 3",
                quantity: 3,
                price_amount: 15.99,
                price_vat_discount: 3.25,
            }
        ];
        // getData(props.id)
        setItems(items)
    }, [])

    useEffect(() => {
        console.log("calculations: ", calculations)
    }, [calculations])

    return (
        <div className="Calculation fixed top-0 left-0 h-screen w-screen z-[100] bg-blue-950">
            <div className="relative h-full w-full flex flex-col items-center justify-start p-6 overflow-y-scroll">
                <table className="print:hidden table-auto w-full text-sm text-left text-slate-200">
                    <thead className="text-xs text-slate-200 uppercase bg-blue-800">
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
                            <tr key={item.id} className="border-b border-b-blue-800">
                                <th scope="row" className="px-6 py-4 pl-0 font-medium whitespace-nowrap ">
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
                                <td className="px-6 py-4 pr-0 text-center">
                                    <span>
                                        <input onChange={setCalculationHandler} data-id={item.id} data-item={JSON.stringify(item)} type="text" className="bg-blue-900 border border-transparent py-2 px-4 rounded-xl focus:ring-0 focus:border-none focus:outline-none" />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="print:hidden w-full mt-4 mb-16 flex justify-end items-center">
                    <Button text={'Create Invoice'} functionality={showPrintHandler} />
                </div>

                {showPrint && <CalculationPrint items={calculations} />}
                {showPrint && <div className="print:hidden w-full mt-4 flex justify-end items-center">
                    <Button text={'Print'} functionality={handlePrint} />
                </div>}

                <div className="print:hidden absolute top-2 right-2 text-2xl text-black h-12 w-12 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-300 bg-slate-200 hover:bg-slate-300" onClick={closeModalHandler}>
                    ✕
                </div>
            </div>
        </div>
    );
  }
  
  export default Calculation;