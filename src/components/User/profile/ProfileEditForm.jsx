import { useState } from "react";

function ProfileEditForm({ user, onUpdate }) {
  const [name, setName] = useState(user.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button>Update</button>
    </form>
  );
}