import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SSelectedCard from "@/components/Card/SSelectedCard";

const SearchWithEmail = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddEmail = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue !== "") {
      // Thêm email vào mảng users khi nhấn Enter
      setUsers([...users, inputValue]);
      // Xóa giá trị của input
      setInputValue("");
    }
  };
  const handleRemove = (idx: number) => {
    const updatedItems = [...users.slice(0, idx), ...users.slice(idx + 1)];
    setUsers(updatedItems);
  };

  return (
    <div className="invite-area">
      <div className="invite-wrapper">
        <div>
          <div className="inv-items">
            {users.map((user, index) => (
              <>
                <SSelectedCard
                  index={index}
                  email={user}
                  onRemove={() => handleRemove(index)}
                />
              </>
            ))}
            <div className="search-bar">
              <input
                className="search-email w-full py-1"
                type="text"
                placeholder="Type a name or email address"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleAddEmail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWithEmail;
