import {Table} from "../components/Table";
import Axios from "../axios/axios"
import { useEffect } from "react";

const Home = () => {
    const { Facturas } = Axios();

    useEffect(() => {
    console.log('Holaaaaa '+Facturas)   
    }, [Facturas]);

    return (
        <>
            <h1>Home Facturas</h1>
            <Table facturas={Facturas}/>
        </>
    )
}

export {Home}