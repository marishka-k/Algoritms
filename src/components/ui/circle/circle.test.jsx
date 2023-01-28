import renderer from "react-test-renderer";
import { Circle } from "./circle";

describe("Точный рендер", () => {
  it("Рендер пустой", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с буквами", () => {
    const tree = renderer.create(<Circle letter="abcde" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с head", () => {
    const tree = renderer.create(<Circle head="10" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с react-элементом в head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с tail", () => {
    const tree = renderer.create(<Circle tail="20" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с react-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с index", () => {
    const tree = renderer.create(<Circle index="2" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с пропсом isSmall === true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с состоянием default", () => {
    const tree = renderer.create(<Circle state={"default"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с состоянием changing", () => {
    const tree = renderer.create(<Circle state={"changing"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с состоянием modified", () => {
    const tree = renderer.create(<Circle state={"modified"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
