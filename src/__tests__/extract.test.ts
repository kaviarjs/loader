import TestModule from "./extract-test";
import { extract } from "../extract";
import { Loader } from "..";
import { assert } from "chai";

describe("Extraction", () => {
  it("Should work", () => {
    const loader = new Loader();

    loader.load(TestModule);

    const schema = loader.getSchema();

    assert.isTrue(schema.resolvers.Mutation.test1);
    assert.isTrue(schema.resolvers.Mutation.test2);
    assert.isTrue(schema.resolvers.Mutation.test3);
    assert.isTrue(schema.resolvers.Mutation.test4);

    assert.include(schema.typeDefs, "somethingReallyGood");
    assert.include(schema.typeDefs, "somethingGood");
  });
});
