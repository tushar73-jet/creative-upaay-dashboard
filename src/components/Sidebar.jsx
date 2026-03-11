function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#ffffff",
        padding: "20px",
        borderRight: "1px solid #ddd"
      }}
    >
      <h2>Project M.</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Home</li>
        <li>Messages</li>
        <li>Tasks</li>
        <li>Members</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;