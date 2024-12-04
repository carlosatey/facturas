import { Formik } from 'formik';
import { Flex, useToast, Box,Input, Checkbox} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { postFactura } from '../api/apiFacturas';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate  } from 'react-router-dom';
import * as Yup from 'yup';

const FacturasForm = () => {
    const toast = useToast()
    const navigate = useNavigate();

    const addFacturaMutation= useMutation({
        mutationFn: postFactura 
    })

    const validationSchema = Yup.object({
        number: Yup.number()
          .required('Required')
          .positive('Must be a positive number')
          .integer('Must be an integer'),
        paymentDate: Yup.date().required('Required'),
        paid: Yup.boolean(),
        client: Yup.string().required('Required'),
        createdAt: Yup.date().required('Required'),
    });


    return(
        <Flex display='flex' alignItems='center' justifyContent='center'  width='600px'>
            <Box flex='1' bg='white' >
                <h1 className='mb-4 text-3xl font-bold'>Formulario</h1>
                <Button colorScheme='gray' className='mb-4'>
                    <Link to="/">Ir a Home</Link>
                </Button>
                <Formik
                    initialValues={{ number: 0, paymentDate: '',paid: false, client: '',createdAt: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        toast({
                            position: 'bottom-left',
                            render: () => (
                              <Box color='white' p={3} bg='blue.500'>
                                {JSON.stringify(values)}
                              </Box>
                            ),
                          })
                        setSubmitting(false);
                      }, 400);
                      const objectFacture = { ...values, id: uuidv4() };
                      addFacturaMutation.mutate(objectFacture);
                      navigate('/')
                    }}
                >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="number">Number:</label>
                    <Input 
                    id='number'
                    placeholder='Number' 
                    type='number' name='number' 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    />
                    {errors.number && touched.number && errors.number}
                    <label htmlFor="paymentDate">Pyment Date:</label>
                    <Input
                    id='paymentDate'
                    type="date"
                    name="paymentDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.paymentDate}
                    />
                    {errors.paymentDate && touched.paymentDate && errors.paymentDate}
                    <Box flex='1' bg='white' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                        <label htmlFor="paymentDate">Paid:</label>
                        <Checkbox
                        name="paid"
                        onChange={(e) => handleChange({ target: { name: e.target.name, value: e.target.checked } })}
                        onBlur={handleBlur}
                        checked={values.paid}
                        >
                        Paid
                        </Checkbox>
                    </Box>
                    {errors.paid && touched.paid && errors.paid}
                    <label htmlFor="client">Client:</label>
                    <Input
                    id='client'
                    type="string"
                    name="client"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.client}
                    />
                    {errors.client && touched.client && errors.client}
                    <label htmlFor="createdAt">Fecha de Creado:</label>
                    <Input
                    id='createdAt'
                    type="date"
                    name="createdAt"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.createdAt}
                    />
                    {errors.createdAt && touched.createdAt && errors.createdAt}
                    <Button type="submit" disabled={isSubmitting} colorScheme='green' className='mt-8'>
                        Enviar
                    </Button>
                  </form>
                )}
                </Formik>
            </Box>
        </Flex>
    )
}

export {FacturasForm}