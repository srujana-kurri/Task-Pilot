import React ,{useState,useEffect} from "react";
import { Chart } from "react-google-charts";
import { useDispatch,useSelector} from "react-redux";
function Charts() {
    const [completed,setCompleted] = useState(0);
    const [uncompleted,setUncompleted] = useState(0);
    const user = useSelector((state) => {return state.app.user});
    const data = [
        ["Task", "how many"],
        ["Completed",completed],
        ["Uncompleted",uncompleted] 
    ];
    useEffect(() => {
      if (user && user.tasks) {
        const tasks = user.tasks;
             let completedCount = 0;
             let uncompletedCount = 0;
             tasks.map((e)=>{
              if(e.status){
                  completedCount++;
              }
              else{
                  uncompletedCount++;
              }})  
              setCompleted(completedCount);
              setUncompleted(uncompletedCount);
      }
    }, [user]);
   
    const options = {
      backgroundColor: "#F8E8EE",
      legend: { position: "bottom" },
      chartArea: {
        left: "10%",
        top: "10%",
        width: "80%",
        height: "80%",
      },
      pieSliceText: "value",
      colors: ["#6EC8E5", "#FFA07A"],
    };
    if(completed === 0 && uncompleted === 0){
        return(<div>Oops no data to show now</div>)
    }
    return (  
      <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"250px"}
      />
      );
    }
      export default Charts;
