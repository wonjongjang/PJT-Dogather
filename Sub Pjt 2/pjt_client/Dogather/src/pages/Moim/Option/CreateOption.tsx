import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { OptionsAtom } from "../../../atoms/Options";

interface IOptionForm {
  option_name: string;
  option_price: number;
}

function CreateOption() {
  const [options, setOptions] = useRecoilState(OptionsAtom);

  const { register, handleSubmit, setValue } = useForm<IOptionForm>();

  const onValid = ({ option_name, option_price }: IOptionForm) => {
    console.log(option_name, option_price);
    setOptions((prev) => [
      ...prev,
      { id: Date.now(), option_name: option_name, option_price: option_price },
    ]);
    setValue("option_name", "");
    setValue("option_price", +"");
    console.log(options);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("option_name", { required: "필수 정보입니다." })}
        placeholder="옵션별 조합 작성   ex) 블랙 / 260 / 기타"
      />
      <input
        {...register("option_price", { required: "필수 정보입니다." })}
        type="number"
        placeholder="해당 옵션 선택 시 추가 가격"
      />
      <button>옵션 추가</button>
    </form>
  );
}

export default CreateOption;
