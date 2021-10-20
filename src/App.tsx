import { useState } from "react";
import { wrap } from "comlink";
import { RunTaskWorker } from "./worker";
import { runTask } from "./utils";

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
  return (
    <div style={{ background: `${data === "loading" ? "orange" : "blue"}` }}>
      <button onClick={() => console.log("Click!!")}>Click</button>
      <button onClick={handleWebWorker}>Web Worker Click</button>
      <button onClick={handleSyncOnMainThread}>Sync on Main Thread</button>
      <span>{data}</span>
    </div>
  );
}

export default App;
