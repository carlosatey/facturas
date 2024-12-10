import { Spinner as LoadingSpinner } from '@chakra-ui/react';

const Spinner = () => {
    return (
        <LoadingSpinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
    )
}

export {Spinner}