import { GraphQLScalarType } from "graphql";

export type OneOrMore<T> = T | T[];
export type Constructor<T> = { new (...args: any[]): T };

export interface IFunctionMap<ArgsType = any, ContextType = any> {
  [key: string]: (
    root: any,
    args: ArgsType,
    context: ContextType,
    info: any
  ) => any;
}

export interface ISchemaDirectiveMap {
  [key: string]: any;
}

export interface ILoadOptions {
  typeDefs?: OneOrMore<string>;
  resolvers?: OneOrMore<IResolverMap>;
  schemaDirectives?: ISchemaDirectiveMap;
  contextReducers?: OneOrMore<IContextReducer>;
}

export interface ISubscriptionFunctionMap {
  [key: string]: {
    subscribe: (root: any, args: any, context: any, info: any) => any;
    resolve?: (payload: any) => any;
  };
}

export type IContextReducer = (context: any) => any;

export interface IResolverMap {
  Query?: IFunctionMap;
  Mutation?: IFunctionMap;
  Subscription?: ISubscriptionFunctionMap;
  [key: string]:
    | IFunctionMap
    | ISubscriptionFunctionMap
    | GraphQLScalarType
    | any;
}

export interface IGraphQLContext {}

export interface IGraphQLModule {
  typeDefs?: string | string[];
  resolvers?: IResolverMap;
  schemaDirectives?: ISchemaDirectiveMap;
  contextReducers: IContextReducer[];
}

export interface ISchemaResult {
  typeDefs?: string;
  resolvers?: IResolverMap;
  schemaDirectives?: ISchemaDirectiveMap;
  contextReducers: IContextReducer[];
}

export interface IType<ContextType = any> {
  name?: string;
  resolvers?: IFunctionMap<any, ContextType>;
  typeDefs?: string;
}
