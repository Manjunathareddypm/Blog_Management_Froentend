import { toast } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';


const style = {

    position: "top-right",

    autoClose: 1500,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    draggable: true,

    progress: undefined,

    theme: "light",

}




export const toaster = (type, message) => {
    switch (type) {
        case "info":
            toast.info(message, style)
            break;
        case "error":
            toast.error(message, style)
            break;
        default:
            toast.info(message, style)
    }

}