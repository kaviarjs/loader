import {
  IContextReducer,
  ILoadOptions,
  ISchemaDirectiveMap,
  IGraphQLModule,
  IResolverMap,
  ISchemaResult,
} from "./defs";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { OneOrMore } from "./defs";

export class Loader {
  protected typeDefs: string[] = [];
  protected resolvers: IResolverMap[] = [];
  protected schemas: any[] = [];
  protected schemaDirectives: ISchemaDirectiveMap[] = [];
  protected contextReducers: IContextReducer[] = [];

  /**
   * Loads GraphQL stuff
   * @param options
   */
  load(options: OneOrMore<ILoadOptions>): void {
    if (Array.isArray(options)) {
      return options.forEach((option) => this.load(option));
    }

    for (const key in options) {
      if (this[key]) {
        const value = this.getAsArray(options[key]);
        this[key].push(...value);
      }
    }
  }

  /**
   * Returns the loaded schema
   */
  getSchema(): ISchemaResult {
    return {
      typeDefs: mergeTypeDefs(this.typeDefs, {
        throwOnConflict: true,
        commentDescriptions: true,
        reverseDirectives: true,
      }),
      resolvers: mergeResolvers(this.resolvers as any) as IResolverMap,
      schemaDirectives: this.mergeSchemaDirectives(),
      contextReducers: this.contextReducers,
    };
  }

  /**
   * Goes one by one in the schema directives
   */
  protected mergeSchemaDirectives() {
    const final = {};
    this.schemaDirectives.forEach((directives) => {
      Object.assign(final, directives);
    });

    return final;
  }

  /**
   * If the object is not array it returns you the object as array
   * @param obj
   */
  protected getAsArray(obj) {
    if (!obj) {
      return [];
    }

    return Array.isArray(obj) ? obj : [obj];
  }
}
