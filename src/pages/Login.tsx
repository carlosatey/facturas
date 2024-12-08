import { Formik } from 'formik';
import { useState } from 'react';
import { Input, Text, Flex, Box, Button, Link  } from '@chakra-ui/react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const [isLoading, setLoading] = useState(false)

    // Esquema de validación Login
    const validationSchemaLogin = Yup.object({
      email: Yup.string()
        .email('Debe ser un correo válido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    });

    return (
        <div>
            <Flex  alignItems={'center'} justifyContent={'center'} flexDirection={'column'} height={'100vh'}>
                <Text
                    fontSize={28}
                    mb={5}
                >
                    Inicio de Sesión
                </Text>
                <Formik
                  initialValues={{ email: '', password: ''}}
                  validationSchema={validationSchemaLogin}
                  onSubmit={(values, actions) => {
                    setLoading(true)
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                      setLoading(false)
                    }, 1000);
                  }}
                >
                  {props => (
                    <form onSubmit={props.handleSubmit}>
                        <Input 
                            placeholder='email'
                            id='email'
                            type="email" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                            name="email"
                        />
                        <Text
                             opacity={props.errors.email ? 1 : 0}
                             color="red.500"
                             fontSize="12px"
                             mt="3px"
                        >
                        {props.errors.email}
                        </Text>

                        <Input 
                            placeholder='password'
                            id='password'
                            type="password" 
                            onChange={props.handleChange}   
                            onBlur={props.handleBlur}
                            value={props.values.password}
                            name="password"
                        />

                        <Text
                             opacity={props.errors.password ? 1 : 0}
                             color="red.500"
                             fontSize="12px"
                             mt="3px"
                        >
                            {props.errors.password}
                        </Text>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mt={5} gap={3} flexDirection={'column'}>
                            <Button 
                                colorScheme='green' 
                                size='md' 
                                p={5} 
                                type="submit"
                                isLoading={isLoading}
                            >
                                Entrar
                            </Button>
                            <Text fontSize={14}>
                                Aún no tienes una cuenta{' '}
                                <Link as={RouterLink} to="/register" color="blue.500">
                                    Regístrate aquí
                                </Link>
                            </Text>
                        </Box>
                        
                    </form>
                  )}
                </Formik>
            </Flex>

            
        </div>
    )
}

export {Login}