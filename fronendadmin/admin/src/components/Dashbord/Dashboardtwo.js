
import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from "../adminnavbar/Navbar";
import Navigation from "../verticalNavigation/Navigation";
import axios from "axios";
import { useState,useEffect } from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";
import "@progress/kendo-theme-default/dist/all.css";

function Dashboardtwo() {
     const [data, setdata] = useState();
    const [orderprice, setorderprice] = useState(0);
    const [count, setordercount] = useState();
    const [lastorder, setlastorder] = useState([])
    

    const orderdata = () => {
        axios.get("http://127.0.0.1:8000/order/ordersum/").then((Response) => {
            setorderprice(Response.data.price)
            console.log(Response.data.price ,"total pirce " )
        })
        
       
    };

    const lastfivedata = () => {
      axios.get("http://127.0.0.1:8000/order/lastorder/").then((Response) => {
          setlastorder(Response.data);
          console.log(Response .data)
        
      });
    };

    const ordercount = () => {
      axios.get("http://127.0.0.1:8000/order/nooforder/").then((Response) => {
        setordercount(Response.data.count);
       
      });
    };



    const revenue=orderprice-(orderprice*40/100)
    
    
        
     useEffect(() => {
       orderdata();
         ordercount()
         lastfivedata()
       axios.get("http://127.0.0.1:8000/user/dashboard").then((Response) => {
         setdata(Response.data.user);
         console.log(Response.data.user);
       });
     }, []);

    
  const datam = [0, 1, 1, 2, 4, count];
  const ChartContainer = () => (
    <Chart className="bg-slate-700">
      <ChartSeries>
        <ChartSeriesItem data={datam} name="SALES RATE" />
      </ChartSeries>
    </Chart>
  );
    
    
    const categories = ["jan", "feb", "march", "april"];
const seriesData = [0, 0, 0, 0, 0,data];
const valueAxisLabels = {
  padding: 3,
  font: "bold 16px Arial, sans-serif",
};

const Chartgraph = () => (
  <Chart>
    <ChartCategoryAxis>
      <ChartCategoryAxisItem
        categories={categories}
        labels={{
          color: "#0a0",
        }}
      />
    </ChartCategoryAxis>
    <ChartValueAxis>
      <ChartValueAxisItem labels={valueAxisLabels} />
    </ChartValueAxis>
    <ChartSeries>
      <ChartSeriesItem type="line" data={seriesData} />
    </ChartSeries>
  </Chart>)
    
    

  return (
    <div>
      <Navbar />
      <h1 className=" ml-[50rem] text-2xl text-gray-900">DASHBOARD</h1>
      <div className="w-4/5">
        <Navigation />
        <div className="pt-7 grid lg:grid-cols-3 mt-[-300px] md:grid-cols-2 justify-center items-center xl:gap-y-16 gap-y-20 gap-x-16 lg:gap-x-20 xl:gap-x-0 lg:px-10 xl:px-0">
          <div className="ml-[18rem] pt-56  mt-[-700px]   py-20 w-">
            <div className="cursor-pointer hover:shadow bg-gray-900 py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div className="mb-6">
                {/* <svg
                  className
                  width={32}
                  height={32}
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 13.3333H32L28 8L24 13.3333ZM24 18.6667H32L28 24L24 18.6667Z"
                    fill="#C7D2FE"
                  />
                  <path
                    d="M1.33333 0H9.33333V32H1.33333C0.979711 32 0.640572 31.8595 0.390523 31.6095C0.140475 31.3594 0 31.0203 0 30.6667V1.33333C0 0.979711 0.140475 0.640572 0.390523 0.390523C0.640572 0.140475 0.979711 0 1.33333 0Z"
                    fill="#818CF8"
                  />
                  <path
                    d="M12 0H20C20.3536 0 20.6928 0.140475 20.9428 0.390523C21.1929 0.640572 21.3333 0.979711 21.3333 1.33333V30.6667C21.3333 31.0203 21.1929 31.3594 20.9428 31.6095C20.6928 31.8595 20.3536 32 20 32H12V0Z"
                    fill="#6366F1"
                  />
                </svg> */}
              </div>
              <div className="text-sky-300 dark:text-white text-2xl font-semibold text-center">
                <h2>Revenue</h2>
              </div>
              <div className="text-sky-500 dark:text-gray-300 mt-2 text-lg text-center ">
                <p>Total revenue of luxe shopping cart</p>
              </div>
              <div className="text-amber-300 dark:text-white text-2xl font-semibold text-center">
                {revenue && <h2>₹ {revenue}</h2>}
              </div>
            </div>
          </div>
          <div className="ml-[18rem] pt-56  mt-[-700px]   py-20 w-">
            <div className="cursor-pointer hover:shadow bg-gray-900 py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div className="mb-6">
                {/* <svg
                  className
                  width={32}
                  height={32}
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 13.3333H32L28 8L24 13.3333ZM24 18.6667H32L28 24L24 18.6667Z"
                    fill="#C7D2FE"
                  />
                  <path
                    d="M1.33333 0H9.33333V32H1.33333C0.979711 32 0.640572 31.8595 0.390523 31.6095C0.140475 31.3594 0 31.0203 0 30.6667V1.33333C0 0.979711 0.140475 0.640572 0.390523 0.390523C0.640572 0.140475 0.979711 0 1.33333 0Z"
                    fill="#818CF8"
                  />
                  <path
                    d="M12 0H20C20.3536 0 20.6928 0.140475 20.9428 0.390523C21.1929 0.640572 21.3333 0.979711 21.3333 1.33333V30.6667C21.3333 31.0203 21.1929 31.3594 20.9428 31.6095C20.6928 31.8595 20.3536 32 20 32H12V0Z"
                    fill="#6366F1"
                  />
                </svg> */}
              </div>
              <div className="text-sky-300 dark:text-white text-2xl font-semibold text-center">
                <h2>Income</h2>
              </div>
              <div className="text-sky-500 dark:text-gray-300 mt-2 text-lg text-center ">
                <p>Total income of luxe shopping cart</p>
              </div>
              <div className="text-amber-300 dark:text-white text-2xl font-semibold text-center">
                {orderprice && <h2>₹ {orderprice}</h2>}
              </div>
            </div>
          </div>
          <div className="ml-[18rem] pt-56  mt-[-700px]   py-20 w-">
            <div className="cursor-pointer hover:shadow bg-gray-900 py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col">
              <div className="mb-6">
                {/* <svg
                  className
                  width={32}
                  height={32}
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 13.3333H32L28 8L24 13.3333ZM24 18.6667H32L28 24L24 18.6667Z"
                    fill="#C7D2FE"
                  />
                  <path
                    d="M1.33333 0H9.33333V32H1.33333C0.979711 32 0.640572 31.8595 0.390523 31.6095C0.140475 31.3594 0 31.0203 0 30.6667V1.33333C0 0.979711 0.140475 0.640572 0.390523 0.390523C0.640572 0.140475 0.979711 0 1.33333 0Z"
                    fill="#818CF8"
                  />
                  <path
                    d="M12 0H20C20.3536 0 20.6928 0.140475 20.9428 0.390523C21.1929 0.640572 21.3333 0.979711 21.3333 1.33333V30.6667C21.3333 31.0203 21.1929 31.3594 20.9428 31.6095C20.6928 31.8595 20.3536 32 20 32H12V0Z"
                    fill="#6366F1"
                  />
                </svg> */}
              </div>
              <div className="text-sky-300 dark:text-white text-2xl font-semibold text-center">
                <h2>Orders</h2>
              </div>
              <div className="text-sky-600 dark:text-gray-300 mt-2 text-lg text-center ">
                <p>Total order of the luxe shopping cart</p>
              </div>
              <div className="text-amber-200 dark:text-white text-2xl font-semibold text-center">
                {count && <h2>{count}</h2>}
              </div>
            </div>
          </div>
        </div>
        <h5 className=" ml-[18rem]  text-2xl text-red-900">SALES GRAPH</h5>
        <div className="ml-[18rem] mt-7">{ChartContainer()}</div>
        <h5 className=" ml-[18rem] mt-8 text-2xl text-red-900">LATEST ORDER PRODUCTS</h5>
        <div className="w-full ml-[18rem] mt-5 overflow-x-scroll xl:overflow-x-hidden">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  <div className="text-gray-600 dark:text-gray-400 opacity-0 cursor-default relative w-10"></div>
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  <h1 className="text-cyan-800">ID</h1>
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  <h1 className="text-cyan-800">Product name</h1>
                </th>

                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  <h1 className="text-cyan-800">price</h1>
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  <h1 className="text-cyan-800">Useremail</h1>
                </th>

                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  <div className="opacity-0 w-2 h-2 rounded-full bg-indigo-400" />
                </th>
                {/* <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">More</td> */}
              </tr>
            </thead>
            <tbody>
              {lastorder.map((obj, index) => {
                return (
                  <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      <div className="relative w-10">
                        <div className="text-gray-600 dark:text-gray-400"></div>
                      </div>
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      {obj.id}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      {obj.products}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      ₹{obj.price}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      {obj.username}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboardtwo