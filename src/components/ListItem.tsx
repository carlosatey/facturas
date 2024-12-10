import { ListItem as Item, ListIcon} from '@chakra-ui/react'

interface ListItemProps {
    icon?: any,
    text: string
}

function capitalizeFirstLetter(text: string) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const ListItem = ({text,icon}:ListItemProps) => {
    return (
        <Item>
            <ListIcon as={icon} color='green.500' />
                {capitalizeFirstLetter(text)}
        </Item>
    )
}

export {ListItem}