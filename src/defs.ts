import { ResolversDefinition } from "@graphql-toolkit/schema-merging";

export type OneOrMore<T> = T | T[];
export type Constructor<T> = { new (...args: any[]): T };

export interface FunctionMap<ArgsType = any, ContextType = any> {
  [key: string]: (
    root: any,
    args: ArgsType,
    context: ContextType,
    info: any
  ) => any;
}

export type SchemaDirectiveType = {
  [key: string]: any;
};

export interface LoadOptions {
  typeDefs?: OneOrMore<string>;
  resolvers?: OneOrMore<ResolverMap>;
  schemaDirectives?: SchemaDirectiveType;
  contextReducers?: OneOrMore<ContextReducer>;
}

export interface SubscriptionFunctionMap {
  [key: string]: FunctionMap;
}

export type ContextReducer = (context: any) => any;

export interface ResolverMap {
  Query?: FunctionMap;
  Mutation?: FunctionMap;
  Subscription?: SubscriptionFunctionMap;
}

export interface GraphQLModule {
  typeDefs?: string | string[];
  resolvers?: ResolversDefinition<any> | ResolversDefinition<any>[];
  schemaDirectives?: SchemaDirectiveType;
  contextReducers: ContextReducer[];
}

export interface IType<ContextType = any> {
  name?: string;
  resolvers?: FunctionMap<any, ContextType>;
  typeDefs?: string;
}
