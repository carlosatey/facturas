import * as React from "react"

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react"

interface ModalProps {
  isOpen?: boolean
  icon?: any
  tittleModal?: string
  textModal?: string
  loadingButton: boolean
  handleClick?: () => void;
}

const Modal = (props: ModalProps) => {
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
            <AlertDialogHeader>{props.tittleModal}</AlertDialogHeader>
            <AlertDialogBody>
              {props.textModal}
            </AlertDialogBody>
            <AlertDialogFooter>
            <Button
              isLoading={props.loadingButton}
              loadingText='Eliminando'
              colorScheme='teal'
              variant='outline'
              onClick={props.handleClick}
            >
              Si
            </Button>
              <Button 
                ref={cancelRef} 
                onClick={onClose}
                colorScheme='teal'
                variant='outline' 
                className="ml-5"
              >
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export {Modal}