// import React, { useEffect, useState } from "react";
// import { Card } from "reactstrap";
// import { Icon } from "../../../Component";
// import { TotalOrderChart } from "../../charts/e-commerce/EcomCharts";
// import { getCountTransactions, getTotalTransactions } from "../../../../functions/dashboard";
//
// const Orders = () => {
//   const [data, setData] = useState([]);
//
//   const getData = async (date) => {
//     const transactionResponse = await getCountTransactions(date);
//     return transactionResponse.data.data;
//   };
//
//   const date = new Date();
//
//   useEffect(() => {
//     let newData;
//
//     const fetchData = async () => {
//       newData = await getData(date);
//     };
//
//     fetchData().then(() => {
//       setData(newData);
//     });
//   }, []);
//
//
//   return (
//     <Card>
//       <div className="nk-ecwg nk-ecwg3">
//         <div className="card-inner pb-0">
//           <div className="card-title-group">
//             <div className="card-title">
//               <h6 className="title">Jumlah Transaksi
//                 Bulan {date.toLocaleString("id-ID", { month: "long" })} {date.getFullYear()}</h6>
//             </div>
//           </div>
//           <div className="data">
//             <div className="data-group">
//               <div className="amount">{data.monthly_transactions}</div>
//               {/*<div className="info text-right">*/}
//               {/*  <span className="change up text-danger">*/}
//               {/*    <Icon name="arrow-long-up"></Icon>4.63%*/}
//               {/*  </span>*/}
//               {/*  <br />*/}
//               {/*  <span>vs. last week</span>*/}
//               {/*</div>*/}
//             </div>
//           </div>
//         </div>
//         {/*<div className="nk-ecwg3-ck">*/}
//         {/*  <TotalOrderChart />*/}
//         {/*</div>*/}
//       </div>
//     </Card>
//   );
// };
// export default Orders;
