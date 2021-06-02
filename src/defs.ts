import { GraphQLScalarType } from "graphql";

/**
 * This interface shall be used to extend the context
 */
export interface IGraphQLContext {}

export type InputType<T> = {
  input: T;
};

export type OneOrMore<T> = T | T[];
export type Constructor<T> = { new (...args: any[]): T };

export type SubscriptionResolver = {
  subscribe: GraphQLResolverFunction | GraphQLResolverFunction[];
  resolve?: (payload: any) => any;
};

export type GraphQLResolverFunction = (
  root: any,
  args: any,
  context: IGraphQLContext,
  info: any
) => any;

export interface IFunctionMapSimple {
  [key: string]: GraphQLResolverFunction;
}

export interface IFunctionMap {
  [key: string]: OneOrMore<GraphQLResolverFunction>;
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
  [key: string]: OneOrMore<SubscriptionResolver>;
}

export type IContextReducer = (context: any) => any;

/**
 * The resolver map contains chaining at resolver level, but you can also add previous and after chains by specifying them as arrays
 */
export interface IResolverMap {
  Query?:
    | IFunctionMap
    | [GraphQLResolverFunction[], IFunctionMap, GraphQLResolverFunction[]?];
  Mutation?:
    | IFunctionMap
    | [GraphQLResolverFunction[], IFunctionMap, GraphQLResolverFunction[]?];
  Subscription?: ISubscriptionFunctionMap;
  [key: string]:
    | IFunctionMap
    | ISubscriptionFunctionMap
    | GraphQLScalarType
    | any;
}

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
