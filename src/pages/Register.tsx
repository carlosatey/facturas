import { Flex, Box, Text, Input, Button, Link, useToast } from "@chakra-ui/react"
import { Formik } from 'formik';
import {useNavigate} from "react-router-dom";
import { useLogin} from "../hooks/useLogin"
import { Link as RouterLink } from 'react-router-dom'
import * as Yup from 'yup';

const Register = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const {userRegister} = useLogin()

    const validationSchemaRegister = Yup.object({
        name: Yup.string()
          .required('El nombre es obligatorio')
          .min(2, 'El nombre debe tener al menos 2 caracteres'),
        lastName: Yup.string()
          .required('El apellido es obligatorio')
          .min(2, 'El apellido debe tener al menos 2 caracteres'),
        email: Yup.string()
          .required('El correo electrónico es obligatorio')
          .email('Debe ser un correo electrónico válido'),
        password: Yup.string()
          .required('La contraseña es obligatoria')
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
          .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
          .matches(/[0-9]/, 'La contraseña debe tener al menos un número'),
          confirmPassword: Yup.string()
          .required('Debe confirmar la contraseña')
          .test(
            'passwords-match',
            'Las contraseñas deben coincidir',
            function (value) {
              return value === this.parent.password;
            }
          ),
        phone: Yup.string()
          .required('El teléfono es obligatorio')
          .matches(/^[6789]\d{8}$/, 'El teléfono debe tener exactamente 9 dígitos y comenzar con 6, 7, 8 o 9'),
    });

    const onSubmit = async (
        values: {
            email: string;
            password: string;
            name: string;
            lastName: string;
            phone: number;
            confirmPassword?: string;
        }) => {
        const { confirmPassword, ...filteredValues } = values;

        const { data } = await userRegister({
            ...filteredValues,
            phone: String(filteredValues?.phone)
        })

        if (data && data?.email === filteredValues?.email) {
            navigate("/")

            return toast({
                title: `El registro de ${data?.name} fue exitoso.`,
                status: 'success',
            })
        }

        toast({
            title: `Error al registrar al usuario ${filteredValues?.email}, vuelva a intentarlo.`,
            status: 'error',
        })
    }

    return(
        <>
            <Flex flexDirection={'column'} alignItems={"center"} justifyContent={'center'} h={'100vh'}>
                <Text mb={5} fontSize={28}>Registro</Text>
                        <Formik
                           initialValues={{ name: '', lastName: '', email: '', password: '', confirmPassword: '', phone: 0 }}
                           validationSchema={validationSchemaRegister}
                           onSubmit={onSubmit}
                         >
                           {props => (
                             <form onSubmit={props.handleSubmit}>
                                <Input
                                placeholder="name"
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.name}
                                name="name"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.name ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.name}
                                </Text>

                                <Input
                                placeholder="lastName"
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.lastName}
                                name="lastName"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.lastName ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.lastName}
                                </Text>

                                <Input
                                placeholder="email"
                                type="email"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                                name="email"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.email ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.email}
                                </Text>

                                <Input
                                placeholder="password"
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                name="password"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.password ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.password}
                                </Text>

                                <Input
                                placeholder="confirm password"
                                type="password"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.confirmPassword}
                                name="confirmPassword"
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.confirmPassword ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.confirmPassword}
                                </Text>

                                <Input
                                placeholder="phone"
                                type="tel"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.phone}
                                name="phone"
                                maxLength={9}
                                >
                                </Input>
                                <Text
                                    opacity={props.errors.phone ? 1 : 0}
                                    color="red.500"
                                    fontSize="12px"
                                    mt="3px"
                                >
                                    {props.errors.phone}
                                </Text>

                                <Box display={'flex'} alignItems={'center'} flexDirection={'column'} gap={5} mt={5}>
                                    <Button type="submit" colorScheme="blue">Registrarse</Button>
                                    <Text fontSize={14}>
                                         Si ya tienes una cuenta  
                                         <Link as={RouterLink} _hover={{ textDecoration: "underline" }} to="/" color="blue.500"> Login</Link>
                                    </Text>
                                </Box>
                               
                             </form>
                           )}
                        </Formik>
                    </Flex>
           
                </>
            )
}

export {Register}