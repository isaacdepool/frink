import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Modals } from '../General/Modals'

export const ModalHook = forwardRef((props, ref) => {

    //Variable de modales
    const [modal, setModal] = useState({
        show: false,
        title:'',
        subtitle:'',
        isSubtitle:false,
        isInfo:false,
        isSuccess:true,
        isCancel:false,
    })

    //Con esto volvemos los valores del modal por defecto
    const resetModal = () => {
        setModal({
            show: false,
            title:'',
            subtitle:'',
            isSubtitle:false,
            isInfo:false,
            isSuccess:true,
            isCancel:false,
        })
    }

    //Lanzamientos de mensajes del modal
    const showModalContent = {
        //Error, need more friends to play
        warningsFriends: (actionGoTo=null) => {
            setModal({
                title:'We need more friends!',
                subtitle:'Add 2 or more friends to play',
                isSubtitle:true,
                isInfo:true,
                isSuccess:false,
                isCancel:false,
                show: true,
            })
        }, 

        //Error, name is the same 
        errorName: (actionGoTo=null) => {
            setModal({
                title:'The name has been fixed!',
                subtitle:'Please add a different name.',
                isSubtitle:true,
                isInfo:true,
                isSuccess:false,
                isCancel:false,
                show: true,
            })
        }, 
    }

    //con esto redireccionamos todo
    useImperativeHandle(ref, () => ({
        //funciones que seran llamadas en el padre
        content: showModalContent,
        resetModal: resetModal,
    }));

    //Maneja los eventos del botón de confirmacion del modal
    const handleAcceptButton = () => {          
            props.acceptAction()
      };
  
      //Maneja los eventos del botón negacion del modal
      const handleCancelButton = () => {
            resetModal();
      };

  return (
    <>
        <Modals
        show={modal.show}
        title={modal.title}
        subtitle={modal.subtitle}
        isSubtitle={modal.isSubtitle}
        isInfo={modal.isInfo}
        isSuccess={modal.isSubtitle}
        isCancel={modal.isCancel}
        handleCancel={handleCancelButton}
        handleAccept={handleAcceptButton} 
        />
    </>
  )
})
