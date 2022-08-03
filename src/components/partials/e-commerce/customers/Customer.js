import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../Component";
import { TotalCustomerChart } from "../../charts/e-commerce/EcomCharts";
import { getCountUsers, getTotalTransactions } from "../../../../functions/dashboard";

const Customer = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const transactionResponse = await getCountUsers();
    return transactionResponse.data.data;
  };

  useEffect(() => {
    const date = new Date();

    let newData;

    const fetchData = async () => {
      newData = await getData(date);
    };

    fetchData().then(() => {
      setData(newData);
    });
  }, []);

  return (
    <Card>
      <div className="nk-ecwg nk-ecwg3">
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Jumlah Pengguna Umum</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">{data.buyers_count}</div>
              {/*<div className="info text-right">*/}
              {/*  <span className="change up text-danger">*/}
              {/*    <Icon name="arrow-long-up"></Icon>4.63%*/}
              {/*  </span>*/}
              {/*  <br />*/}
              {/*  <span>vs. last week</span>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Jumlah Penjual</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">{data.shops_count}</div>
              {/*<div className="info text-right">*/}
              {/*  <span className="change up text-danger">*/}
              {/*    <Icon name="arrow-long-up"></Icon>4.63%*/}
              {/*  </span>*/}
              {/*  <br />*/}
              {/*  <span>vs. last week</span>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        {/*<div className="nk-ecwg3-ck">*/}
        {/*  <TotalCustomerChart />*/}
        {/*</div>*/}
      </div>
    </Card>
  );
};
export default Customer;
