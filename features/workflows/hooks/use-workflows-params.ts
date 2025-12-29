
import { useQueryStates} from "nuqs"
import { WorkflowsParams } from "../params"

export const useWorkflowsParams = () => {
  return useQueryStates(WorkflowsParams)
}