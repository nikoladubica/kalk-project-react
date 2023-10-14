import { useRef, useState } from "react";

const Button = (props) => {
    const syncRef = useRef();
    const buttonRef = useRef();
    const [disabled, setDisabled] = useState(false);

    const {
        // Props
        image,
        text,
        sync,
        disable,
        type,

        // Functions
        functionality
    } = props;

    const small = {
        button: 'p-2 px-4 gap-1 text-sm rounded-lg',
        image: 'w-3 h-3',
    }

    const big = {
        button: 'p-4 px-8 gap-2 text-base rounded-xl',
        image: 'w-5 h-5',
    }

    const style = type === 'small' ? small : big

    const loadHandler = () => {
        if (sync === true) syncRef.current.classList.add('animate-spin')
        buttonRef.current.classList.add('cursor-not-allowed', 'select-none')
        setDisabled(true)
        // if (functionality) {
        //     functionality().then(() => {
        //         if (sync === true) syncRef.current.classList.remove('animate-spin')
        //         buttonRef.current.classList.remove('cursor-not-allowed', 'select-none')
        //         setDisabled(false)
        //     }).catch(error => {
        //         console.warn(error)
        //     })
        // }
        setTimeout(() => {
            if (sync === true) syncRef.current.classList.remove('animate-spin')
            buttonRef.current.classList.remove('cursor-not-allowed', 'select-none')
            setDisabled(false)
        }, 2000)
    }

    const handler = () => {
        if (sync === true || disable === true) {
            loadHandler()
        } else {
            if (functionality) functionality()
        }
    }

    return (
        <button
            className={`Button bg-blue-600 shadow-md ${style.button} hover:bg-blue-700 active:bg-blue-800
            transition-colors duration-300 cursor-pointer flex items-center justify-center text-white font-bold`}
            ref={buttonRef}
            onClick={handler}
            disabled={disabled}
        >
            {image && <img ref={syncRef} className={style.image} src={image} height={20} width={20} alt="Icon" />}            
            <span>{text}</span>
        </button>
    );
  }
  
  export default Button;