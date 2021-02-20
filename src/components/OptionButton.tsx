export interface OptionButtonProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = (
  props: OptionButtonProps
) => {
  return (
    <div
      onClick={props.onClick}
      className={
        props.selected ? "optionButtonSelected" : "optionButton"
      }
    >
      <span
        className={"smallFont disableTextSelection"}
      >
        {props.title}
      </span>
    </div>
  );
};

export { OptionButton };
