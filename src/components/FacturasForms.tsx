import { Formik } from 'formik';
import { Flex, useToast, Box,Input, Checkbox, flexbox} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useFacturas } from '../api/useFacturas';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom"
import * as Yup from 'yup';

const FacturasForm = () => {
    const toast = useToast()
    const navigate = useNavigate();
    const {postFactura} = useFacturas(); 

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
        <Flex display='flex' alignItems='center' justifyContent='center'  width='50%'>
            <Box display='flex' bg='white' border="1px" borderColor="white" boxShadow="0 0 10px rgba(0, 110, 0, 0.4)"  borderRadius={10} p={8} flexDirection={'column'}>
                <h1 className='mb-8 text-3xl font-bold text-center'>Formulario Factura</h1>
                <Formik
                    initialValues={{ number: 0, paymentDate: '',paid: false, client: '',createdAt: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        toast({
                            position: 'bottom-left',
                            render: () => (
                              <Box color='white' p={3} bg='blue.500'>
                                {/* JSON.stringify(values) */}
                                <p>Factura agregada correctamente</p>
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
                    <label htmlFor="number" className='aling-text-left'>Number:</label>
                    <Input 
                    id='number'
                    placeholder='Number'
                    className='mb-4'
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
                    className='mb-4'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.paymentDate}
                    />
                    {errors.paymentDate && touched.paymentDate && errors.paymentDate}
                    <label htmlFor="paymentDate">Paid:</label>
                    <Checkbox
                    name="paid"
                    className='mb-4 ml-4'
                    onChange={(e) => handleChange({ target: { name: e.target.name, value: e.target.checked } })}
                    onBlur={handleBlur}
                    checked={values.paid}
                    >
                    Paid
                    </Checkbox>
                    {errors.paid && touched.paid && errors.paid}
                    <br />
                    <label htmlFor="client">Client:</label>
                    <Input
                    id='client'
                    type="string"
                    name="client"
                    className='mb-4'
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
                    className='mb-4'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.createdAt}
                    />
                    {errors.createdAt && touched.createdAt && errors.createdAt}
                    <Box display={'flex'} gap={5} alignItems={'center'} justifyContent={'center'} marginTop={8}>
                        <Button colorScheme='gray'>
                            <Link to="/">Cancelar</Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting} colorScheme='green'>
                            Enviar
                        </Button>
                    </Box>
                  </form>
                )}
                </Formik>
            </Box>
        </Flex>
    )
}

export {FacturasForm}