import renderer from "react-test-renderer";

import { Button } from "./button";

describe("Тестирование компонента Button", () => {
  it("Рендер кнопки c текстом без ошибок", () => {
    const snap = renderer.create(<Button text="Тестовый текст" />).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it("Рендер кнопки без текста без ошибок", () => {
    const snap = renderer.create(<Button />).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it("Рендер заблокированной кнопки без ошибок", () => {
    const snap = renderer.create(<Button disabled />).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it("Рендер кнопка c индикацией загрузки без ошибок", () => {
    const snap = renderer.create(<Button isLoader={true} />).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
