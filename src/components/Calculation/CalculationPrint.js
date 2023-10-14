import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const CalculationPrint = (props) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    })

    return (
        <div className='w-full'>
            <table className="table-fixed w-[595px] text-sm text-left text-slate-200 print:text-black">
                <thead className="text-xs text-slate-200 bg-blue-800">
                    <tr>
                        <th scope="col" className=" p-1">Sifra artikla</th>
                        <th scope="col" className=" p-1">Naziv</th>
                        <th scope="col" className=" p-1 text-center">Jedinica mere</th>
                        <th scope="col" className=" p-1 text-center">Nabavna cena</th>
                        <th scope="col" className=" p-1 text-center">Marza</th>
                        <th scope="col" className=" p-1 text-center">Prodajna cena bez PDV</th>
                        <th scope="col" className=" p-1 text-center">Tarifa poreza</th>
                        <th scope="col" className=" p-1 text-center">PDV</th>
                        <th scope="col" className=" p-1 text-center">Prodajna cena sa PDV</th>
                        <th scope="col" className=" p-1 text-center">Kolicina</th>
                    </tr>
                </thead>

                <tbody>
                    {props.items.map((item, index) => (
                        <tr key={item.id} className="border-b border-b-slate-300">
                            <td className=" p-1">
                                {index}
                            </td>
                            <th scope="row" className=" p-1">
                                {item.name}
                            </th>
                            <td className=" p-1 text-center">
                                {item.unit}
                            </td>
                            <td className=" p-1 text-center">
                                {item.initialPrice}
                            </td>
                            <td className=" p-1 text-center">
                                {item.profitMargin}
                            </td>
                            <td className=" p-1 text-center">
                                {item.sellingPriceNoVAT}
                            </td>
                            <td className=" p-1 text-center">
                                {item.tariffVAT}
                            </td>
                            <td className=" p-1 text-center">
                                {item.vat}
                            </td>
                            <td className=" p-1 text-center">
                                {item.sellingPrice}
                            </td>
                            <td className=" p-1 text-center">
                                {item.quantity}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  }
  
  export default CalculationPrint;