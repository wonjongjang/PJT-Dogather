import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { OptionsAtom } from "../../../atoms/Options";

interface IOptionForm {
  optionName: string;
  optionPrice: number;
}

function CreateOption() {
  const [options, setOptions] = useRecoilState(OptionsAtom);

  const { register, handleSubmit, setValue } = useForm<IOptionForm>();

  const onValid = ({ optionName, optionPrice }: IOptionForm) => {
    // console.log(option_name, option_price);
    setOptions((prev) => [
      ...prev,
      { id: Date.now(), optionName: optionName, optionPrice: optionPrice },
    ]);
    setValue("optionName", "");
    setValue("optionPrice", +"");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("optionName", { required: "필수 정보입니다." })}
        placeholder="옵션별 조합 작성   ex) 블랙 / 260 / 기타"
      />
      <input
        {...register("optionPrice", { required: "필수 정보입니다." })}
        type="number"
        placeholder="해당 옵션 선택 시 추가 가격"
      />
      <button>옵션 추가</button>
    </form>
  );
}

export default CreateOption;
