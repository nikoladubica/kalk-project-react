const ListItem = (props) => {
    const createDate = (date) => {
        const dateObj = new Date(date)
        return `${dateObj.getDate()}.${dateObj.getMonth()}.${dateObj.getFullYear()}.`
    }

    const issueDate = createDate(props.item.issue_date)
    const dueDate = createDate(props.item.due_date)
    const deliveryDate = createDate(props.item.delivery_date)

    return (
        <div className={`ListItem flex flex-col items-center justify-center gap-2 p-4 rounded-md shadow-md cursor-pointer 
        bg-blue-900 hover:bg-blue-800 active:bg-blue-700 transition-colors ${props.className}`}>
            <div className="h-8 w-8 rounded-sm border-2 border-blue-400"></div>
            
            <span className="text-base font-bold mb-2">{props.item.supplier_name}</span>
            
            <span className="text-xs">
                <span className="font-bold">Izdato: </span>
                {issueDate}
            </span>

            <span className="text-xs">
                <span className="font-bold">Rok placanja: </span>
                {dueDate}
            </span>

            <span className="text-xs">
                <span className="font-bold">Dostavljeno: </span>
                {deliveryDate}
            </span>

            <span className="text-xl font-bold mt-4 text-red-300">
                {props.item.cost_total} RSD
            </span>
        </div>
    );
  }
  
  export default ListItem;