import axios from "axios";
import { useRef, useState } from "react";

const Hero = () => {
    const loading = useRef();
    const button = useRef();
    const [disabled, setDisabled] = useState(false);

    const clickHandler = () => {
        loading.current.classList.remove('hidden')
        button.current.classList.add('cursor-not-allowed', 'select-none')
        setDisabled(true)

        axios.post('/api/fetch-external?dateFrom=2023-10-01&dateTo=2023-10-10').then(response => {
            console.log(response)
            loading.current.classList.add('hidden')
            button.current.classList.remove('cursor-not-allowed', 'select-none')
            setDisabled(false)
        })
    }

    return (
        <div className="Hero flex items-center justify-center p-12">
            {/* <h1 className="text-5xl font-bold border-b border-b-blue-500">
                Program za <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-main to-orange-main">kalkulacije</span>
            </h1> */}
            <button ref={button} disabled={disabled} className="p-4 px-8 rounded-xl bg-blue-600 shadow-md cursor-pointer flex items-center justify-center text-white font-bold" onClick={clickHandler}>
                <svg ref={loading} className="hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>   
                <span>Fetch external</span>
            </button>
        </div>
    );
  }
  
  export default Hero;