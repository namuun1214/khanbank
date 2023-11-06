import { mergeTypeDefs } from '@graphql-tools/merge'
import { mainSchema } from './main'

const typeDefs = mergeTypeDefs(mainSchema)

export default typeDefs;



