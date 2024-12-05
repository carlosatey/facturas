import * as React from "react"

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react"

interface BasicUsageProps {
  isOpen?: boolean
  icon?: any
  handleClick?: () => void;
}

const Modal = (props: BasicUsageProps) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen || false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const cancelRef = React.useRef<HTMLButtonElement>(null)
  

  return (
    <>
      <button type="button" onClick={onOpen}>
        {props.icon ? props.icon: 'OpenModal'}
      </button>
      
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Borrar Factura</AlertDialogHeader>
            <AlertDialogBody>
              Estas seguro que deseas eliminar esta factura
            </AlertDialogBody>
            <AlertDialogFooter>
              <button type="button" ref={cancelRef} onClick={onClose} className="mr-5">
                No
              </button>
              <button type="button" onClick={props.handleClick}>Yes, delete</button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export {Modal}