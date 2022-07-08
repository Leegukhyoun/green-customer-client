import React,{useState, useEffect} from 'react';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@mui/material'
import Customer from './Customer';
import axios from 'axios';



const CustomerList = () => {
    const [custo, setCusto] = useState(null);
    const [error, setError] = useState(null);
    const fetch = async () => {
        try{
            setCusto(null);
            const customerList = await axios.get(`http://localhost:3001/customers`);
            setCusto(customerList.data);
            console.log(customerList.data);
        }
        catch(e){
            setError(e);
        }
    }
    useEffect(()=>{
        fetch();
    },[]);
    if(error) return <div>에러나는중</div>
    if(!custo) return null;
    return (
        <div>
            <h2>고객리스트</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>연락처</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>주소</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {custo.map(custo=>(
                        <Customer key={custo.no} customer={custo}/>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerList;