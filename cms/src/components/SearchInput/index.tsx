import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@heroui/react";
import { useCallback } from "react";

export function SearchForm({
  valueInput,
  onChangeInput,
  onSearch,
  placeholder = "Nhập từ khóa tìm kiếm",
}: {
  valueInput: string;
  onChangeInput: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}) {
  const onSubmitSearch = useCallback(
    (event: any) => {
      onSearch();
      event.preventDefault();
    },
    [valueInput]
  );

  return (
    <form onSubmit={onSubmitSearch}>
      <div className="m-4 bg-white p-4 rounded-xl flex gap-4">
        <Input
          size="md"
          placeholder={placeholder}
          value={valueInput}
          onChange={(e) => onChangeInput(e.target.value)}
        />
        <Button
          type={"submit"}
          startContent={<MagnifyingGlassIcon className="size-6" />}
        >
          Tìm kiếm
        </Button>
      </div>
    </form>
  );
}
