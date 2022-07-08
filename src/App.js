import './App.css';
import CustomerList from './components/CustomerList';
import DetailCustomer from './components/DetailCustomer';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom'
import CreateCustomer from './components/CreateCustomer';



const customers = [
  {
    no : 1,
    name : "박성수",
    phone : "010-1234-1234",
    birth : "19870308",
    gender : "여성",
    add : "수원시 인계동"
  },
  {
    no : 2,
    name : "오영택",
    phone : "010-4567-1234",
    birth : "19880724",
    gender : "남성",
    add : "인천광역시"
  },
  {
    no : 3,
    name : "피콜로",
    phone : "010-1234-9874",
    birth : "20190918",
    gender : "남성",
    add : "나메크성 인근"
  },
  
];

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path="/" element={<CustomerList customers={customers}/>}/>
          <Route path="/detailview/:no" element={<DetailCustomer/>}/>
          <Route path="/write" element={<CreateCustomer/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
