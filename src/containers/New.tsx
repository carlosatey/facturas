import { Flex } from "@chakra-ui/react"
import { FacturasForm } from "../components/FacturasForms"


const New = () => {
    return (
        <Flex display='flex' align='center' justifyContent='center'  height="100vh" >
            <FacturasForm/>
        </Flex>
    )
}

export {New}