const { getFile } = require("../index");

const arrayResult = [
  {
    FileList: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
  },
];

describe("getFile::", () => {
  it("should be a function", () => {
    expect(typeof getFile).toBe("function");
  });

  it("should return an array with results", async () => {
    const path = "../../files/text.md";
    const result = await getFile(path);

    expect(result).toEqual(arrayResult);
  });

  it('should return the message "there are no links"', async () => {
    const path = "../../files/text_without_links.md";
    const result = await getFile(path);

    expect(result).toEqual("there are no links");
  });
});
