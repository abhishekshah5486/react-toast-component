import React, {useState, useRef, useEffect} from 'react';
import './ToastContainer.scss';

function ToastContainer() {
    const [allToasts, setAllToasts] = useState([]);
    const allTimeoutRefs = useRef({});

    useEffect(() => 
    {
        for (let toastId in allTimeoutRefs.current)
        {
            clearInterval(allTimeoutRefs.current[toastId]);
            delete allTimeoutRefs.current[toastId];
        }
    }, [])
    const handleClose = (toastId) => 
    {
        setAllToasts((prevToasts) => (
            prevToasts.filter((toast) => {
                return toast.toastId !== toastId;
            })
        ));
        // clearInterval
        clearInterval(allTimeoutRefs.current[toastId]);
        delete allTimeoutRefs.current[toastId];
    }
    const handleAdd = (message, type) => 
    {
        const toastId = new Date().getTime();
        setAllToasts(prev => [
            ...prev,
            {
                toastId: toastId,
                message: message, 
                type: type,
            }
        ]);
        const timeoutRef = setTimeout(() => 
        {
            handleClose(toastId);
        }, 3000);
        allTimeoutRefs.current[toastId] = timeoutRef;
    }
    return (
        <div className='container'>
            <div className='btn-container'>
                <button 
                className='success toast-btn'
                onClick={() => handleAdd('Success Alert', 'success')}
                >Success Toast</button>
                <button 
                className='info toast-btn'
                onClick={() => handleAdd('Info Alert', 'info')}
                >Info Toast</button>
                <button 
                className='warning toast-btn'
                onClick={() => handleAdd('Warning Alert', 'warning')}
                >Warning Toast</button>
                <button 
                className='error toast-btn'
                onClick={() => handleAdd('Error Alert', 'error')}
                >Error Toast</button>
            </div>
            <div className='toast-container'>
                {
                    allToasts.map((toast) => 
                    {
                        return (
                            <div 
                            className={`toast ${toast.type}`}
                            key={toast.toastId}
                            >
                                <p>{toast.message}</p>
                                <span onClick={() => handleClose(toast.toastId)}>X</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ToastContainer;
