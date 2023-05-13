import GenericProps from "../Generic/GenericProps";

export default interface AutocompleteProps extends GenericProps {
  options: any[];
  iconPath?: string;
  popperWidth?: string;
}
