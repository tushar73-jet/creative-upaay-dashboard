function Topbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h1>Mobile App</h1>

      <div>
        <button>Filter</button>
        <button style={{ marginLeft: "10px" }}>Share</button>
      </div>
    </div>
  );
}

export default Topbar