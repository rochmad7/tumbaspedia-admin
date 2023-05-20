import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { getCountTransactions, getTotalTransactions } from "../../../../functions/dashboard";
import ContentLoader from "react-content-loader";
import MyLoader from "../loader/Loader";

const TotalSales = () => {
  const [totalData, setTotalData] = useState([]);
  const [countData, setCountData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const getTotalTransaction = async (date) => {
    const transactionResponse = await getTotalTransactions(date);
    return transactionResponse.data.data;
  };

  const getCountTransaction = async (date) => {
    const transactionCountResponse = await getCountTransactions(date);
    return transactionCountResponse.data.data;
  };

  useEffect(() => {
    let totalData;
    let countData;

    const fetchData = async () => {
      setLoading(true);

      totalData = await getTotalTransaction(selectedDate);
      countData = await getCountTransaction(selectedDate);

      setLoading(false);
    };

    fetchData().then(() => {
      setTotalData(totalData);
      setCountData(countData);
    });
  }, [selectedDate]);

  return (
    <Card className="is-dark h-100">
      <div className="nk-ecwg nk-ecwg1">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Total
                Penjualan {selectedDate.toLocaleString("id-ID", { month: "long" })} {selectedDate.getFullYear()}</h6>
            </div>
          </div>
          <div className="card-tools mt-2">
            <button className="btn btn-sm btn-primary"
                    onClick={() => setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}>
              Bulan Sebelumnya
            </button>
            <button className="btn btn-sm btn-info ml-2" hidden={selectedDate.getMonth() === new Date().getMonth()}
                    onClick={() => setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}>
              Bulan Berikutnya
            </button>
          </div>
          {/*<div className="data">*/}
          {/*  <div className="amount">Rp. {parseInt(totalData.monthly_transactions).toLocaleString("id-ID")}</div>*/}
          {/*</div>*/}
          {loading ? <MyLoader /> : (
            <div className="data">
              <div className="amount">Rp. {parseInt(totalData.monthly_transactions).toLocaleString("id-ID")}</div>
            </div>)}
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Jumlah Transaksi
                Bulan {selectedDate.toLocaleString("id-ID", { month: "long" })} {selectedDate.getFullYear()}</h6>
            </div>
          </div>
          <div className="data">
            <div className="data">
              <div className="data-group">
                {loading ? <MyLoader /> : (
                  <div className="amount">{countData.monthly_transactions}</div>
                )}
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
          <div className="card-title-group">
            <h6 className="sub-title">Total Transaksi Seminggu Terakhir</h6>
          </div>
          <div className="data">
            {loading ? <MyLoader /> : (
              <div className="data-group">
                <div className="amount">Rp. {parseInt(totalData.weekly_transactions).toLocaleString("id-ID")}</div>
              </div>
            )}
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

