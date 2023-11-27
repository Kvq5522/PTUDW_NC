import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const SearchWithEmail = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddEmail = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Thêm email vào mảng users khi nhấn Enter
      setUsers([...users, inputValue]);
      // Xóa giá trị của input
      setInputValue("");
    }
  };

  return (
    <div className="invite-area">
      <div className="inv-items">
        {users.map((user, index) => (
          <div className="custom-item" key={index}>
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {user}
          </div>
        ))}
        <input
          className="search-email w-full mt-1 p-1"
          type="text"
          placeholder="Type a name or email address"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleAddEmail}
        />
      </div>
    </div>
  );
};

export default SearchWithEmail;
