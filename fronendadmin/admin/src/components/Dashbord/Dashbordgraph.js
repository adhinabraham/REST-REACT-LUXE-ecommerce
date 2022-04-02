import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import Navbar from "../adminnavbar/Navbar";
import Navigation from "../verticalNavigation/Navigation";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, defaults } from "react-chartjs-2";
// import { Chart } from "react-chartjs-2";


function Dashbordgraph() {
  const [data, setdata] = useState();
  const [orderlist, setorderlist] = useState([]);

  const orderdata = async () => {
    try {
      const { data: Response } = await axios.get(
        "http://127.0.0.1:8000/order/orderplaced/"
      );
      console.log("this is then");
      console.log(Response.data);
      setorderlist(data.data);
    } catch (error) {
      console.log("this is catch");
      console.log(console.log(error.data));
    }
  };

  useEffect(() => {
    orderdata();
    axios.get("http://127.0.0.1:8000/user/dashboard").then((Response) => {
      setdata(Response.data.user);
      console.log(Response.data.user);
    });
  }, []);

  useEffect(() => {
    const a = data;
    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "16 Mar 2018",
            borderColor: "#4A5568",
            data: [0, 0, 0, 0, data],
            fill: false,
            pointBackgroundColor: "#4A5568",
            borderWidth: "3",
            pointBorderWidth: "4",
            pointHoverRadius: "6",
            pointHoverBorderWidth: "8",
            pointHoverBorderColor: "rgb(74,85,104,0.2)",
          },
        ],
      },
      options: {
        legend: {
          position: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              display: false,
            },
          ],
        },
      },
    });
  }, [data]);

  useEffect(() => {
    console.log(orderlist);
  }, [orderlist]);

  return (
    <>
      <Navbar />
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
        <script
          defer
          src="https://cdn.tuk.dev/dev/light-dark-switch.js"
        ></script>
      </Helmet>
      <div className="w-full">
        <Navigation className="w-20 mt-0  "></Navigation>
        <div className="ml-[18rem] pt-56  mt-[-491px] w-[970px]   py-20 w- ">
          <div className="">
            <div className="flex flex-col mt-[-225px] justify-between h-full">
              <div>
                <div className="lg:flex w-40 justify-between">
                  <h3 className="text-gray-600 dark:text-gray-400 leading-5 text-base md:text-xl font-bold">
                    Total user
                  </h3>
                  <div className="flex items-center justify-between lg:justify-start mt-2 md:mt-4 lg:mt-0">
                    {/* <div className="flex items-center">
                      <button className="py-2 px-4 bg-gray-100 dark:bg-gray-700 focus:outline-none ease-in duration-150 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200">
                        Dollars
                      </button>
                      <button className="py-2 px-4 bg-indigo-500 focus:outline-none text-white ease-in duration-150 text-xs hover:bg-indigo-600">
                        Tickets
                      </button>
                    </div> */}
                    <div className="lg:ml-14">
                      <div className="bg-gray-100 dark:bg-gray-700 ease-in duration-150 hover:bg-gray-200 pb-2 pt-1 px-3 rounded-sm">
                        <select className="text-xs text-gray-600 dark:text-gray-400 bg-transparent focus:outline-none">
                          <option className="leading-1">Year</option>
                          <option className="leading-1">2020</option>
                          <option className="leading-1">2019</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-end mt-6">
                  <div className="flex items-center md:ml-4 ml-1">
                    <p className="text-indigo-500 text-xs md:text-base">17%</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 2.5V9.5"
                        stroke="#4338CA"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 4.5L6 2.5"
                        stroke="#4338CA"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 4.5L6 2.5"
                        stroke="#4338CA"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {data && (
                <div className="mt-6">
                  <canvas id="myChart" width={1025} height={400} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="py-8 w-full">
          <div className="lg:flex items-center justify-center w-full">
            <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded"></div>
          </div>
          {orderlist && (
            <div className="lg:flex items-center justify-center w-full mt-7">
              <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
                <div className="flex items-center border-b border-gray-200 pb-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex flex-shrink-0" />
                  <div className="flex items-start justify-between w-full">
                    <div className="pl-3 w-full">
                      <p className="text-xl font-medium leading-5 text-gray-800"></p>
                      <p className="text-sm leaorderlist[0].usernameding-normal pt-2 text-gray-500">
                        4
                      </p>
                    </div>
                    <svg
                      width={28}
                      height={28}
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z"
                        stroke="#2C3E50"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-sm leading-5 py-4 text-gray-600">
                    A group of people interested in dogecoin, the currency and a
                    bit of side for the meme and dof that we all know and love.
                    These cases are perfectly simple and easy to distinguish.
                  </p>
                  <div className="flex">
                    <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                      #dogecoin
                    </div>
                    <div className="py-2 px-4 ml-3 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                      #crypto
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashbordgraph;
