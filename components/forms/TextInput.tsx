const TextInputForm = (props: any) => {
  return (
    <div className="mt-4 flex  flex-col">
      {<div className="text-lg text-dark-0"> {props.label}</div>}
      <input
        className=" mt-auto w-full appearance-none border-b bg-transparent py-2 px-2 leading-tight focus:outline-none"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={true}
        disabled={props.disabled}
      />
    </div>
  );
};

export default TextInputForm;
