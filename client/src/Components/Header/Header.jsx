import { Box, Button, ListItem, UnorderedList } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const Navigate = useNavigate();
  const LoginHandler = () => {
    console.log('Radhe Shayam');
    Navigate('/Login');
  };

  return (
    <Box
      minHeight={'50px'}
      background={'#4F46E5'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box
        margin={'5px 3rem'}
        fontSize={'24px'}
        fontWeight={'700'}
        color={'white'}
      >
        Expensify
      </Box>

      <UnorderedList
        margin={'5px 3rem'}
        display={'flex'}
        alignItems={'center'}
        listStyleType={'none'}
      >
        <ListItem
          margin={'5px 1rem'}
          color={'white'}
          fontSize={'18px'}
          fontWeight={600}
        >
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${isActive ? 'border-b-2' : 'border-none'}`
            }
          >
            Home
          </NavLink>{' '}
        </ListItem>

        <ListItem
          margin={'5px 1rem'}
          color={'white'}
          fontSize={'18px'}
          fontWeight={600}
        >
          <NavLink
            to='/about'
            className={({ isActive }) =>
              `${isActive ? 'border-b-2' : 'border-none'}`
            }
          >
            About
          </NavLink>{' '}
        </ListItem>
        <ListItem
          margin={'5px 1rem'}
          color={'white'}
          fontSize={'18px'}
          fontWeight={600}
        >
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              `${isActive ? 'border-b-2' : 'border-none'}`
            }
          >
            Contacts
          </NavLink>{' '}
        </ListItem>

        <Button marginLeft={'1rem'} height={'2rem'} onClick={LoginHandler}>
          Login
        </Button>
      </UnorderedList>
    </Box>
  );
};

export default Header;
