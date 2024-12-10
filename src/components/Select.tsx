import { Select as InputSelect} from '@chakra-ui/react';

interface SelectProps {
    handleFilter: (param: boolean|string) => void
}

const Select = ({handleFilter}:SelectProps) => {

    return (
        <InputSelect placeholder='Todas las facturas' onChange={(e) => {
            const value = e.target.value;
            if (value === 'paid') {
                handleFilter(true);
            } else if (value === 'notPaid') {
                handleFilter(false);
            }else {
                handleFilter('')
            }
        }}>
            <option value='paid' >Pagada</option>
            <option value='notPaid'>No Pagada</option>
        </InputSelect>
    )
}

export {Select}