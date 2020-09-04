import { IResolverMap, IFunctionMap } from "./defs";

export type ResolverFunction = (root, args, context, info) => any;

/**
 * This is the symbol in which we store the result that can be used by the next resolver plugin
 */
export const ResultSymbol = Symbol("GraphQLResolverResult");

/**
 * Get the value stored in an object
 */
export function getResult(object: any) {
  return object[ResultSymbol];
}

export function execute(map: IFunctionMap): IFunctionMap {
  const newMap = {};

  for (const key in map) {
    newMap[key] = craftFunction(map[key]);
  }

  return newMap;
}

export function group(
  before: ResolverFunction[] = [],
  map: IFunctionMap = {},
  after: ResolverFunction[] = []
): IResolverMap {
  const newMap = {};
  for (const key in map) {
    newMap[key] = craftFunction(map[key], before, after);
  }

  return newMap;
}

function craftFunction(
  definition: ResolverFunction | ResolverFunction[],
  before: ResolverFunction[] = [],
  after: ResolverFunction[] = []
) {
  if (!Array.isArray(definition)) {
    definition = [definition];
  }

  definition = [...before, ...definition, ...after];

  return async (...resolverArguments) => {
    let result;
    for (const i in definition) {
      result = await definition[i].call(null, ...resolverArguments);
      // Adapt the context and store the result inside ResultSymbol
      if (result) {
        resolverArguments[2] && (resolverArguments[2][ResultSymbol] = result);
      }
    }

    return result;
  };
}
