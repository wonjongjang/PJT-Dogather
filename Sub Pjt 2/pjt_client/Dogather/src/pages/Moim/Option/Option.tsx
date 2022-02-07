import { IOption } from "../../../atoms/Options";

function Option({ id, option_name, option_price }: IOption) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(name);
  };

  return (
    <li>
      <span>{option_name} </span>
      <span>{option_price} </span>
      <button onClick={onClick}>삭제</button>
    </li>
  );
}

export default Option;
