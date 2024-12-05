import { Flex } from "@chakra-ui/react"
import { FacturasForm } from "../components/FacturasForms"
import {Button} from "@chakra-ui/react"
import { Link } from "react-router-dom"


const New = () => {
    return (
        <Flex display='flex' align='center' justifyContent='center' flexDirection='column'>
            <Button colorScheme='gray' className='mb-4'>
                <Link to="/">Ir a Home</Link>
            </Button>
            <FacturasForm/>
        </Flex>
    )
}

export {New}