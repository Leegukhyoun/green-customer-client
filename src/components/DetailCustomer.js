import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableRow} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailCustomer = () => {
    const [custo, setCusto] = useState(null);
    const {no} = useParams();
    const fetch = async () => {
        try{
            setCusto(null);
            const customerList = await axios.get(`http://localhost:3001/customers/${no}`);
            setCusto(customerList.data[0]);
        }
        catch(e){
        }
    }
    useEffect(()=>{
        fetch();
    },[]);
    if(!custo) return null;
    return (
        <div>
            <h2>고객 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>고객명</TableCell>
                        <TableCell>{custo.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{custo.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{custo.birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{custo.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{custo.add1} {custo.add2}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailCustomer;