import assert from "node:assert/strict";
import test from "node:test";
import { hrefWithoutCategory } from "./books-query";

test("clearing category preserves and correctly encodes the search query", () => {
  assert.equal(
    hrefWithoutCategory({ category: "Science", search: "Harry Potter" }),
    "/books?search=Harry+Potter",
  );
});

test("clearing category preserves other query parameters and repeated values", () => {
  assert.equal(
    hrefWithoutCategory({ category: "Science", search: "magic", page: "2", tag: ["new", "popular"] }),
    "/books?search=magic&page=2&tag=new&tag=popular",
  );
});

test("clearing the only filter returns the unfiltered books URL", () => {
  assert.equal(hrefWithoutCategory({ category: "Science" }), "/books");
});
