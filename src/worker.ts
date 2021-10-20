import { expose } from "comlink";
import { runTask } from "./utils";

const worker = {
  runTask,
};

export type RunTaskWorker = typeof worker;

expose(worker);
