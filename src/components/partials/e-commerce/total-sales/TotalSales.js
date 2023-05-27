import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { getTransactionsReport } from "../../../../functions/dashboard";
import MyLoader from "../loader/Loader";

const TotalSales = (props) => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);

  const selectedDate = props.selectedDate;

  const fetchTransactionsReport = async (date) => {
    const transactionsReportResponse = await getTransactionsReport(date);
    return transactionsReportResponse.data.data;
  };

  useEffect(() => {
    let reportData;

    const fetchData = async () => {
      setLoading(true);

      reportData = await fetchTransactionsReport(selectedDate);

      setLoading(false);
    };

    fetchData().then(() => {
      setReportData(reportData);
    });
  }, [selectedDate]);

  return (
    <Card className="is-dark h-100">
      <div className="nk-ecwg nk-ecwg3">
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Total Transaksi Tahun {selectedDate.getFullYear()}</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">Rp. {parseInt(reportData.yearly_total_transactions).toLocaleString("id-ID")}</div>
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
              <h6 className="title">Jumlah Transaksi Tahun {selectedDate.getFullYear()}</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
                <div className="amount">{reportData.yearly_count_transactions}</div>
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
              <h6 className="title">Total Transaksi
                Bulan {selectedDate.toLocaleString("id-ID", { month: "long" })} {selectedDate.getFullYear()}</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              {loading ? MyLoader() : (
                <div
                  className="amount">Rp. {parseInt(reportData.monthly_total_transactions).toLocaleString("id-ID")}</div>
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
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Jumlah Transaksi
                Bulan {selectedDate.toLocaleString("id-ID", { month: "long" })} {selectedDate.getFullYear()}</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              {loading ? MyLoader() : (

                <div className="amount">{reportData.monthly_count_transactions}</div>
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
        {/*<div className="nk-ecwg3-ck">*/}
        {/*  <TotalCustomerChart />*/}
        {/*</div>*/}
      </div>
    </Card>
  );
};

export default TotalSales;

