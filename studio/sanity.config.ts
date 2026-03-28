import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiDataset, apiProjectId } from './project'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'autoxec',
  title: 'AutoXec',
  projectId: apiProjectId,
  dataset: apiDataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
