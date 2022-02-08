import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { FAQsAtom } from "../../../../atoms/FAQs";

interface IFAQForm {
  faqQuestion: string;
  faqAnswer: string;
}

function CreateFAQ() {
  const [FAQs, setFAQs] = useRecoilState(FAQsAtom);

  const { register, handleSubmit, setValue } = useForm<IFAQForm>();

  const onValid = ({ faqQuestion, faqAnswer }: IFAQForm) => {
    // console.log(option_name, option_price);
    setFAQs((prev) => [
      ...prev,
      { id: Date.now(), faqQuestion: faqQuestion, faqAnswer: faqAnswer },
    ]);
    setValue("faqQuestion", "");
    setValue("faqAnswer", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("faqQuestion", { required: "필수 정보입니다." })}
        placeholder="질문"
      />
      <input
        {...register("faqAnswer", { required: "필수 정보입니다." })}
        placeholder="답변"
      />
      <button>FAQ 추가</button>
    </form>
  );
}

export default CreateFAQ;
