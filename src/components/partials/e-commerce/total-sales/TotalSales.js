import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../Component";
import { TotalSalesChart } from "../../charts/e-commerce/EcomCharts";
import { getAllTransactions } from "../../../../functions/transaction";
import { getTotalTransactions } from "../../../../functions/dashboard";

const TotalSales = () => {
  const [data, setData] = useState([]);

  const getData = async (date) => {
    const transactionResponse = await getTotalTransactions(date);
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
    <Card className="is-dark h-100">
      <div className="nk-ecwg nk-ecwg1">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Total Penjualan</h6>
            </div>
            {/*<div className="card-tools">*/}
            {/*  <a href="#report" onClick={(ev) => ev.preventDefault()} className="link">*/}
            {/*    View Report*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>
          <div className="data">
            <div className="amount">Rp. {parseInt(data.monthly_transactions).toLocaleString('id-ID')}</div>
            {/*<div className="info">*/}
            {/*  <strong>$7,395.37</strong> in last month*/}
            {/*</div>*/}
          </div>
          <div className="data">
            <h6 className="sub-title">Total Transaksi Seminggu Terakhir</h6>
            <div className="data-group">
              <div className="amount">Rp. {parseInt(data.weekly_transactions).toLocaleString('id-ID')}</div>
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
        {/*<div className="nk-ecwg1-ck">*/}
        {/*  <TotalSalesChart />*/}
        {/*</div>*/}
      </div>
    </Card>
  );
};

export default TotalSales;
