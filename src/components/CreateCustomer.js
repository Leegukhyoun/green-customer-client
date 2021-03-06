import React, {useState} from 'react';
import {Table, TableBody, TableCell, TableRow} from '@mui/material';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
    const navigate = useNavigate();
    //우편번호 관리하기
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            c_add : data.address
        })
    }
    
    //팝업창 상태 관리
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    
    //팝업창 상태 true(열기)
    const openPostCode = () => {
        setIsPopupOpen(true);
    }
    //팝업창 상태 false(닫기)
    const closePostCode = () => {
        setIsPopupOpen(false);
    }
    

    const [ formData, setFormData ] = useState({
        c_name: "",
        c_phone: "",
        c_birth: "",
        c_gender: "",
        c_add1: "",
        c_add2: "",
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    function insertCustomer(){
        axios.post(`http://localhost:3001/write`, formData)
        .then((result)=>{
            console.log(result);
            navigate("/");
        })
        .catch(e=>console.log(e))
    }

    //폼 submit 이벤트 
    const onSubmit = (e) => {
        //form에 원래 연결된 이벤트 제거
        e.preventDefault();
        //input에 값이 있는지 체크하고 입력이 되어있으면 post전송
        insertCustomer();
    }





    return (
        <div>
            <h2>신규 고객 등록하기</h2>
            <form onSubmit={onSubmit}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input name="c_name" type="text" value={formData.c_name} onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name="c_phone" type="text" value={formData.c_phone} onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input name="c_birth" type="date" value={formData.c_birth} onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                여성 <input name="c_gender" type="radio" value="여성" onChange={onChange}/>
                                남성 <input name="c_gender" type="radio" value="남성" onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input name="c_add1" type="text" value={formData.c_add1} onChange={onChange}/>
                                <input name="c_add2" type="text" value={formData.c_add2} onChange={onChange}/>
                                <button type='button' onClick={openPostCode}>우편번호 검색</button>
                                <div id="popupDom">
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <PopupPostCode onClose={closePostCode} onAddData={onAddData}/>
                                        </PopupDom>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type="submit">등록</button>
                                <button tpye="reset">취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
};

export default CreateCustomer;