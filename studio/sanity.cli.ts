import { defineCliConfig } from 'sanity/cli'
import { apiDataset, apiProjectId } from './project'

export default defineCliConfig({
  api: {
    projectId: apiProjectId,
    dataset: apiDataset,
  },
})
