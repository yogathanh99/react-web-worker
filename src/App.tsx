import { useState, ReactText } from "react";
import { wrap } from "comlink";
import { toast, ToastContainer } from "react-toastify";
import ReactLoading from "react-loading";
import { RunTaskWorker } from "./worker";
import { runTask } from "./utils";
import Header from "./components/header";
import Button from "./components/button";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState<string>("");

  const handleSyncOnMainThread = (): void => {
    setData("loading");
    setData(runTask(90000000));
  };

  const handleWebWorker = async (): Promise<void> => {
    setData("loading");
    const worker = new Worker("./worker.ts", {
      name: "RunTaskWorker",
      type: "module",
    });

    const { runTask } = wrap<RunTaskWorker>(worker);
    setData(await runTask(90000000));
  };

  const handleClickMe = (): ReactText => {
    return toast.success("Clicked", {
      autoClose: 1500,
      pauseOnHover: true,
      className: "toast-custom",
    });
  };
  return (
    <div className="wrapper">
      <Header />
      <div>
        <div
          className="left"
          style={{
            background: `${
              data === "loading"
                ? "lightsalmon"
                : data === "done"
                ? "lightgreen"
                : "#d6d4cd"
            }`,
          }}
        >
          {data === "loading" ? <ReactLoading type="bars" /> : <h1>{data}</h1>}
        </div>
        <div className="right">
          <Button onClick={handleClickMe}>Click Me!</Button>
          <Button onClick={handleWebWorker}>Web Worker Click</Button>
          <Button onClick={handleSyncOnMainThread}>Sync on Main Thread</Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
