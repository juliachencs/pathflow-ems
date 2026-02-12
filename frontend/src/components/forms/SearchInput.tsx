import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

type SearchInputProps = {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onChange,
}: SearchInputProps) => {
  // TODO Debounce here?
  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      onChange={onChange}
    ></Input>
  );
};

export default SearchInput;
