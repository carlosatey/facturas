import { Formik } from 'formik';
import { Flex, useToast, Box,Input, Checkbox} from '@chakra-ui/react';
import { Facturas } from '../interfaces/Facturas';
import { Button } from '@chakra-ui/react';
import { useFacturas } from '../hooks/useFacturas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom"
import * as Yup from 'yup';
import { format } from 'date-fns';


interface formFactura {
    factura?: Facturas
}

const FacturasForm = ({factura}:formFactura) => {
    const toast = useToast()
    const navigate = useNavigate();
    const {postFactura ,updateFactura} = useFacturas(); 
    const queryClient = useQueryClient();

    const addFactura = useMutation({
        mutationFn: postFactura,
        onSuccess: () => {
            queryClient.invalidateQueries()
        } 
    })

    const editFactura = useMutation({
        mutationFn: updateFactura, 
        onSuccess: () => {
            queryClient.invalidateQueries()
        }
    });
    
    const removeQueryFromCache = () => {
      queryClient.removeQueries({ queryKey: ['facturas_edit'], exact: true })
    };

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
                    initialValues={{ 
                        number: factura? factura.number: 0, 
                        paymentDate:  factura?  format(new Date(factura.paymentDate), 'yyyy-MM-dd'): "",
                        paid: factura ? factura.paid : false, 
                        client: factura? factura.client: "",
                        createdAt:  factura? format(new Date(factura.createdAt), 'yyyy-MM-dd'): "" 
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {

                        if(factura) {
                            setTimeout(() => {
                                toast({
                                    position: 'bottom-left',
                                    render: () => (
                                      <Box color='white' p={3} bg='blue.500'>
                                        {/* JSON.stringify(values) */}
                                        <p>Factura Editada Correctamente</p>
                                      </Box>
                                    ),
                                  })
                                setSubmitting(false);
                            }, 400);
                            const objectFactureUpdate = { ...values, id: factura.id };
                            editFactura.mutate(objectFactureUpdate)
                            removeQueryFromCache();
                        }else {
                            setTimeout(() => {
                                toast({
                                    position: 'bottom-left',
                                    render: () => (
                                      <Box color='white' p={3} bg='green.500'>
                                        {/* JSON.stringify(values) */}
                                        <p>Factura agregada correctamente</p>
                                      </Box>
                                    ),
                                  })
                                setSubmitting(false);
                              }, 400);
                              const objectFacture = { ...values, id: uuidv4() };
                              addFactura.mutate(objectFacture);
                        }
                        navigate('/home')
                        
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
                    type='number' 
                    name='number' 
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
                    isChecked={values.paid}
                    
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
                        <Button colorScheme='gray' onClick={() => removeQueryFromCache()}>
                            <Link to="/home">Cancelar</Link>
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