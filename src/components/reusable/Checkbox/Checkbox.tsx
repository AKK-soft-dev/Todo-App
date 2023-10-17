export interface CheckboxProps {
  disabled?: boolean;
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = (props: CheckboxProps) => (
  <div className="flex gap-2">
    <input
      className="
          peer relative cursor-pointer appearance-none shrink-0 w-5 h-5 border-2 border-black/20 rounded-sm mt-1 bg-white
          focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-black/10
          checked:bg-black checked:border-0
          disabled:border-steel-400 disabled:bg-steel-400
        "
      type="checkbox"
      {...props}
    />
    <svg
      className="absolute w-5 h-5 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <label htmlFor={props.id}>{props.label}</label>
  </div>
);

export default Checkbox;
